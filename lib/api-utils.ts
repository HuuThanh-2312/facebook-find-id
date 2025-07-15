// API utilities for optimized RapidAPI calls with key rotation
import { NextResponse } from "next/server"
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) : null;

const isServerless = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';

// Simple in-memory cache (for development - use Redis in production)
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 3 * 24 * 60 * 60 * 1000 // 3 ngày

interface ApiConfig {
  endpoint: string
  cacheKey: string
}

interface ApiKeyInfo {
  key: string
  remaining: number
  quota_limit: number
  resetTime: number
  lastUsed: number
  isActive: boolean
}

// API Keys configuration - Monthly quota (200 requests per month)
const API_KEYS: ApiKeyInfo[] = [
  {
    key: 'c920e5d0demsh98727e9df4e0e0fp1e7e04jsn96ea9ac03340',
    remaining: 0, // Will be updated from Supabase
    quota_limit: 200,
    resetTime: 0,
    lastUsed: 0,
    isActive: true
  },
  {
    key: 'f0da5a91b0msha42bb6cc03b3d9fp12e539jsn04b059f7f323',
    remaining: 0, // Will be updated from Supabase
    quota_limit: 200,
    resetTime: 0,
    lastUsed: 0,
    isActive: true
  }
].filter(keyInfo => keyInfo.key && keyInfo.key !== '')

// Thời gian đổi key (ms)
const KEY_ROTATION_INTERVAL = 5 * 60 * 1000; // 5 phút
let currentKeyIndex: number | null = null;
let lastKeyRotation = 0;

// Đọc trạng thái quota từ Supabase khi khởi động
async function syncQuotaFromSupabase() {
  if (!supabase) return;
  const { data, error } = await supabase.from('api_key_status').select('*');
  if (error) {
    console.error('Supabase quota fetch error:', error);
    return;
  }
  if (data && data.length > 0) {
    // Đồng bộ lại trạng thái quota cho từng key
    API_KEYS.forEach((key, idx) => {
      const found = data.find((row: any) => row.key === key.key);
      if (found) {
        key.remaining = found.remaining;
        key.quota_limit = found.quota_limit;
        key.resetTime = found.reset_time || 0;
        key.lastUsed = found.last_used || 0;
        key.isActive = found.is_active !== false;
      }
    });
  } else {
    // Nếu chưa có dữ liệu, insert các key mới
    for (const key of API_KEYS) {
      await supabase.from('api_key_status').insert([
        {
          key: key.key,
          remaining: key.remaining || key.quota_limit,
          quota_limit: key.quota_limit,
          reset_time: key.resetTime,
          last_used: key.lastUsed,
          is_active: key.isActive
        }
      ]);
    }
  }
}

// Gọi hàm sync khi khởi động
if (supabase) {
  syncQuotaFromSupabase();
}

// Initialize quota from Supabase or set defaults
function initializeQuota() {
  // Nếu không dùng Supabase thì fallback về RAM
  API_KEYS.forEach((key, index) => {
    if (key.remaining === 0) {
      key.remaining = key.quota_limit;
      console.log(`Initialized API Key ${index} with default quota: ${key.remaining}/${key.quota_limit}`)
    }
  })
}

// Initialize quota on module load
initializeQuota()

function getNextAvailableKey(): ApiKeyInfo | null {
  const now = Date.now();
  // Lọc ra các key còn quota
  const availableKeys = API_KEYS
    .map((key, idx) => ({ ...key, idx }))
    .filter(k => k.isActive && k.remaining > 0);

  if (availableKeys.length === 0) return null;

  // Nếu chưa chọn key hoặc đã quá 5 phút hoặc key hiện tại hết quota, chọn lại ngẫu nhiên
  if (
    currentKeyIndex === null ||
    now - lastKeyRotation > KEY_ROTATION_INTERVAL ||
    !API_KEYS[currentKeyIndex] ||
    !API_KEYS[currentKeyIndex].isActive ||
    API_KEYS[currentKeyIndex].remaining <= 0
  ) {
    const randomIdx = Math.floor(Math.random() * availableKeys.length);
    currentKeyIndex = availableKeys[randomIdx].idx;
    lastKeyRotation = now;
  }

  return API_KEYS[currentKeyIndex] || null;
}

function updateKeyQuota(keyIndex: number, remaining: number, quota_limit: number, resetTime: number) {
  if (keyIndex >= 0 && keyIndex < API_KEYS.length) {
    API_KEYS[keyIndex].remaining = remaining;
    API_KEYS[keyIndex].quota_limit = quota_limit;
    API_KEYS[keyIndex].resetTime = resetTime;
    API_KEYS[keyIndex].lastUsed = Date.now();
    // Đồng bộ lên Supabase
    if (supabase) {
      supabase.from('api_key_status').upsert({
        key: API_KEYS[keyIndex].key,
        remaining,
        quota_limit,
        reset_time: resetTime,
        last_used: API_KEYS[keyIndex].lastUsed,
        is_active: API_KEYS[keyIndex].isActive
      }, { onConflict: 'key' });
    }
  }
}

function getSessionId(request: Request): string {
  // Try to get session from cookie or create a new one
  const cookie = request.headers.get('cookie')
  if (cookie) {
    const sessionMatch = cookie.match(/session=([^;]+)/)
    if (sessionMatch) {
      return sessionMatch[1]
    }
  }
  
  // Generate a new session ID based on user agent and IP-like info
  const userAgent = request.headers.get('user-agent') || ''
  const forwardedFor = request.headers.get('x-forwarded-for') || ''
  const realIp = request.headers.get('x-real-ip') || ''
  
  return Buffer.from(`${userAgent}${forwardedFor}${realIp}`).toString('base64').slice(0, 16)
}

const LOG_FILE = path.join(process.cwd(), 'lib', 'api-log.json');
const LOG_RETENTION_DAYS = 14;
const LOG_KEEP_DAYS = 7;

interface ApiCallLog {
  timestamp: number;
  endpoint: string;
  link: string;
  status: number;
  latency: number;
}

function readApiCallLogs(): ApiCallLog[] {
  try {
    const raw = fs.readFileSync(LOG_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeApiCallLogs(logs: ApiCallLog[]) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8');
}

export async function logApiCall(log: ApiCallLog) {
  if (isServerless && supabase) {
    // Ghi log vào Supabase
    try {
      await supabase.from('api_logs').insert([
        {
          timestamp: new Date(log.timestamp).toISOString(),
          endpoint: log.endpoint,
          link: log.link,
          status: log.status,
          latency: log.latency
        }
      ]);
    } catch (e) {
      console.error('Supabase log error:', e);
    }
    return;
  }
  // Local/dev: ghi file như cũ
  const logs = readApiCallLogs();
  logs.push(log);
  // Xoá log quá 14 ngày
  const cutoff = Date.now() - LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000;
  const filtered = logs.filter(l => l.timestamp >= cutoff);
  writeApiCallLogs(filtered);
}

export function cleanupApiCallLogsIfNeeded() {
  // Chỉ cleanup khi là sáng thứ 2
  const now = new Date();
  if (now.getDay() === 1 && now.getHours() < 12) {
    const logs = readApiCallLogs();
    const cutoff = Date.now() - LOG_KEEP_DAYS * 24 * 60 * 60 * 1000;
    const filtered = logs.filter(l => l.timestamp >= cutoff);
    writeApiCallLogs(filtered);
  }
}

export function getApiCallLogs(): ApiCallLog[] {
  cleanupApiCallLogsIfNeeded();
  // Trả về 7 ngày gần nhất
  const cutoff = Date.now() - LOG_KEEP_DAYS * 24 * 60 * 60 * 1000;
  return readApiCallLogs().filter(l => l.timestamp >= cutoff);
}

export async function optimizedRapidApiCall(
  link: string,
  config: ApiConfig,
  request: Request
): Promise<NextResponse> {
  // Check cache first
  const cacheKey = `${config.cacheKey}_${link}`
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data, {
      headers: {
        'Cache-Control': 'public, max-age=300', // 5 minutes
        'X-Cache': 'HIT'
      }
    })
  }

  // Get available API key
  const keyInfo = getNextAvailableKey()
  if (!keyInfo) {
    console.error("No available API keys with remaining quota")
    return NextResponse.json({ 
      error: "Service temporarily unavailable - all API quotas exhausted",
      retryAfter: Math.max(...API_KEYS.map(k => k.resetTime - Date.now()).filter(t => t > 0)) / 1000
    }, { status: 503 })
  }

  const url = `https://facebook-scraper-api4.p.rapidapi.com/${config.endpoint}?link=${encodeURIComponent(link)}`
  
  // Optimized fetch options with timeout and keep-alive
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-host": "facebook-scraper-api4.p.rapidapi.com",
      "x-rapidapi-key": keyInfo.key,
      "Connection": "keep-alive",
    },
    signal: controller.signal,
  }

  const start = Date.now();
  try {
    const response = await fetch(url, options)
    clearTimeout(timeoutId)
    const latency = Date.now() - start;
    
    // Update quota information from response headers
    // Use the correct quota headers: x-ratelimit-requests-*
    const remaining = parseInt(response.headers.get('x-ratelimit-requests-remaining') || '0')
    const quota_limit = parseInt(response.headers.get('x-ratelimit-requests-limit') || '200')
    
    // Handle reset time (x-ratelimit-rapid-free-plans-hard-limit-reset)
    const resetHeader = response.headers.get('x-ratelimit-rapid-free-plans-hard-limit-reset')
    const resetTime = resetHeader ? parseInt(resetHeader) * 1000 : 0
    
    // Find the key index that was used
    const usedKeyIndex = API_KEYS.findIndex(k => k.key === keyInfo.key)
    if (usedKeyIndex >= 0) {
      updateKeyQuota(usedKeyIndex, remaining, quota_limit, resetTime)
      // Log quota update for debugging
      console.log(`API Key ${usedKeyIndex}: Updated quota - ${remaining}/${quota_limit}, Reset: ${new Date(resetTime).toLocaleString()}`)
    }
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error("RapidAPI error:", errorData)
      
      // If rate limited, try another key
      if (response.status === 429 && API_KEYS.length > 1) {
        console.log(`Rate limited on key ${usedKeyIndex}, trying another key...`)
        // Mark current key as inactive temporarily
        if (usedKeyIndex >= 0) {
          API_KEYS[usedKeyIndex].isActive = false
          setTimeout(() => {
            API_KEYS[usedKeyIndex].isActive = true
          }, 60000) // Reactivate after 1 minute
        }
        
        // Retry with different key
        return optimizedRapidApiCall(link, config, request)
      }
      
      return NextResponse.json(
        { error: `Failed to fetch data: ${response.statusText}`, details: errorData },
        { status: response.status },
      )
    }
    
    const data = await response.json()
    
    // Cache successful response
    cache.set(cacheKey, { data, timestamp: Date.now() })
    
    // Clean up old cache entries (keep only last 1000 entries)
    if (cache.size > 1000) {
      const entries = Array.from(cache.entries())
      entries.sort((a, b) => b[1].timestamp - a[1].timestamp)
      cache.clear()
      entries.slice(0, 1000).forEach(([key, value]) => cache.set(key, value))
    }
    
    logApiCall({
      timestamp: Date.now(),
      endpoint: config.endpoint,
      link,
      status: response.status,
      latency
    });
    
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'X-Api-Latency': latency.toString(),
        'X-Api-Status': response.status.toString(),
        'Cache-Control': 'public, max-age=300',
        'X-Cache': 'MISS'
      }
    })
  } catch (e) {
    clearTimeout(timeoutId)
    console.error("Error fetching data:", e)
    
    if (e instanceof Error && e.name === 'AbortError') {
      return NextResponse.json({ error: "Request timeout" }, { status: 408 })
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Utility function to get API key status (for monitoring)
export function getApiKeyStatus() {
  return API_KEYS.map((key, index) => ({
    index,
    remaining: key.remaining,
    limit: key.quota_limit,
    isActive: key.isActive,
    lastUsed: key.lastUsed,
    resetTime: key.resetTime
  }))
}

// Predefined configurations for each API type
export const API_CONFIGS = {
  page: { endpoint: 'get_facebook_page_id', cacheKey: 'page' },
  post: { endpoint: 'get_facebook_post_id', cacheKey: 'post' },
  group: { endpoint: 'get_facebook_group_id', cacheKey: 'group' },
} as const 