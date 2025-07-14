// API utilities for optimized RapidAPI calls with key rotation
import { NextResponse } from "next/server"
import fs from 'fs';
import path from 'path';

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
  limit: number
  resetTime: number
  lastUsed: number
  isActive: boolean
}

// API Keys configuration - Monthly quota (200 requests per month)
const API_KEYS: ApiKeyInfo[] = [
  {
    key: process.env.RAPIDAPI_KEY_1 || 'c920e5d0demsh98727e9df4e0e0fp1e7e04jsn96ea9ac03340',
    remaining: 0, // Will be updated from response headers
    limit: 200,
    resetTime: 0,
    lastUsed: 0,
    isActive: true
  },
  {
    key: process.env.RAPIDAPI_KEY_2 || '0bb981d8f9msh1e036e36ddd3357p152060jsn67d329eda94c',
    remaining: 0, // Will be updated from response headers
    limit: 200,
    resetTime: 0,
    lastUsed: 0,
    isActive: true
  },
  {
    key: process.env.RAPIDAPI_KEY_3 || '55db04b790msh510f2533ff159ecp192b82jsnacb1ccde8dbf',
    remaining: 0, // Will be updated from response headers
    limit: 200,
    resetTime: 0,
    lastUsed: 0,
    isActive: true
  }
].filter(keyInfo => keyInfo.key && keyInfo.key !== '')

// Session-based key rotation
const sessionKeys = new Map<string, number>()
let currentKeyIndex = 0

// Initialize quota from environment or set defaults
function initializeQuota() {
  // Set default quota for keys that haven't been used yet
  API_KEYS.forEach((key, index) => {
    if (key.remaining === 0) {
      // Set a reasonable default, will be updated on first API call
      key.remaining = key.limit
      console.log(`Initialized API Key ${index} with default quota: ${key.remaining}/${key.limit}`)
    }
  })
}

// Initialize quota on module load
initializeQuota()

function getNextAvailableKey(sessionId?: string): ApiKeyInfo | null {
  // If session has a key assigned, try to use it first
  if (sessionId && sessionKeys.has(sessionId)) {
    const sessionKeyIndex = sessionKeys.get(sessionId)!
    const sessionKey = API_KEYS[sessionKeyIndex]
    
    if (sessionKey && sessionKey.isActive && sessionKey.remaining > 0) {
      return sessionKey
    }
  }

  // Find the best available key
  let bestKey: ApiKeyInfo | null = null
  let maxRemaining = -1

  for (let i = 0; i < API_KEYS.length; i++) {
    const key = API_KEYS[i]
    if (key.isActive && key.remaining > 0) {
      if (key.remaining > maxRemaining) {
        maxRemaining = key.remaining
        bestKey = key
        currentKeyIndex = i
      }
    }
  }

  // If no key with remaining quota, try to find one that's reset
  if (!bestKey) {
    const now = Date.now()
    for (let i = 0; i < API_KEYS.length; i++) {
      const key = API_KEYS[i]
      if (key.isActive && now >= key.resetTime) {
        key.remaining = key.limit
        key.resetTime = 0
        bestKey = key
        currentKeyIndex = i
        break
      }
    }
  }

  // Assign key to session if found
  if (bestKey && sessionId) {
    sessionKeys.set(sessionId, currentKeyIndex)
  }

  return bestKey
}

function updateKeyQuota(keyIndex: number, remaining: number, limit: number, resetTime: number) {
  if (keyIndex >= 0 && keyIndex < API_KEYS.length) {
    API_KEYS[keyIndex].remaining = remaining
    API_KEYS[keyIndex].limit = limit
    API_KEYS[keyIndex].resetTime = resetTime
    API_KEYS[keyIndex].lastUsed = Date.now()
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

export function logApiCall(log: ApiCallLog) {
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

  // Get session ID for key rotation
  const sessionId = getSessionId(request)
  
  // Get available API key
  const keyInfo = getNextAvailableKey(sessionId)
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
    const limit = parseInt(response.headers.get('x-ratelimit-requests-limit') || '200')
    
    // Handle reset time (x-ratelimit-rapid-free-plans-hard-limit-reset)
    const resetHeader = response.headers.get('x-ratelimit-rapid-free-plans-hard-limit-reset')
    const resetTime = resetHeader ? parseInt(resetHeader) * 1000 : 0
    
    // Find the key index that was used
    const usedKeyIndex = API_KEYS.findIndex(k => k.key === keyInfo.key)
    if (usedKeyIndex >= 0) {
      updateKeyQuota(usedKeyIndex, remaining, limit, resetTime)
      // Log quota update for debugging
      console.log(`API Key ${usedKeyIndex}: Updated quota - ${remaining}/${limit}, Reset: ${new Date(resetTime).toLocaleString()}`)
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
    limit: key.limit,
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