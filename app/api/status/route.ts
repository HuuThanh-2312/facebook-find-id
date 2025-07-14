import { NextResponse } from "next/server"
import { getApiKeyStatus, getApiCallLogs } from "@/lib/api-utils"

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
  } catch (error) {
    console.error("Error getting API status:", error)
    return NextResponse.json({ error: "Failed to get API status" }, { status: 500 })
  }
} 