import { NextResponse } from "next/server"
import { getApiKeyStatus, getApiCallLogs } from "@/lib/api-utils"
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const status = getApiKeyStatus()
    
    const totalRemaining = status.reduce((sum, key) => sum + key.remaining, 0)
    const totalLimit = status.reduce((sum, key) => sum + key.limit, 0)
    const activeKeys = status.filter(key => key.isActive).length
    
    return NextResponse.json({
      keys: status,
      summary: {
        totalRemaining,
        totalLimit,
        activeKeys,
        totalKeys: status.length,
        usagePercentage: totalLimit > 0 ? ((totalLimit - totalRemaining) / totalLimit * 100).toFixed(2) : '0'
      },
      timestamp: new Date().toISOString(),
      logs: getApiCallLogs()
    })
  } catch (error: any) {
    // Nếu lỗi do file log không tồn tại, tự động tạo file log rỗng và thử lại 1 lần
    if (error.code === 'ENOENT') {
      try {
        const logPath = path.join(process.cwd(), 'lib', 'api-log.json');
        fs.writeFileSync(logPath, '[]', 'utf8');
        // Thử lại trả về status sau khi tạo file log
        const status = getApiKeyStatus()
        const totalRemaining = status.reduce((sum, key) => sum + key.remaining, 0)
        const totalLimit = status.reduce((sum, key) => sum + key.limit, 0)
        const activeKeys = status.filter(key => key.isActive).length
        return NextResponse.json({
          keys: status,
          summary: {
            totalRemaining,
            totalLimit,
            activeKeys,
            totalKeys: status.length,
            usagePercentage: totalLimit > 0 ? ((totalLimit - totalRemaining) / totalLimit * 100).toFixed(2) : '0'
          },
          timestamp: new Date().toISOString(),
          logs: []
        })
      } catch (e) {
        console.error("Error creating log file or retrying status:", e)
        return NextResponse.json({ error: "Failed to get API status (log file create retry)" }, { status: 500 })
      }
    }
    console.error("Error getting API status:", error)
    return NextResponse.json({ error: `Failed to get API status: ${error && error.message ? error.message : error}` }, { status: 500 })
  }
} 