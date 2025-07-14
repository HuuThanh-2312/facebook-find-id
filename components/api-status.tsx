'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface ApiKeyStatus {
  index: number
  remaining: number
  limit: number
  isActive: boolean
  lastUsed: number
  resetTime: number
}

interface ApiStatus {
  keys: ApiKeyStatus[]
  summary: {
    totalRemaining: number
    totalLimit: number
    activeKeys: number
    totalKeys: number
    usagePercentage: string
  }
  timestamp: string
}

export function ApiStatus() {
  const [status, setStatus] = useState<ApiStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStatus = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/status')
      if (!response.ok) {
        throw new Error('Failed to fetch API status')
      }
      const data = await response.json()
      setStatus(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    // Refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">Error: {error}</div>
        </CardContent>
      </Card>
    )
  }

  if (!status) {
    return null
  }

  const formatTime = (timestamp: number) => {
    if (timestamp === 0) return 'Never'
    return new Date(timestamp).toLocaleString()
  }

  const formatResetTime = (timestamp: number) => {
    if (timestamp === 0) return 'Unknown'
    const resetDate = new Date(timestamp)
    const now = new Date()
    const diffMs = resetDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays > 0) {
      return `${diffDays} days (${resetDate.toLocaleDateString()})`
    } else {
      return resetDate.toLocaleDateString()
    }
  }

  const getQuotaColor = (remaining: number, limit: number) => {
    const percentage = (remaining / limit) * 100
    if (percentage > 50) return 'text-green-600'
    if (percentage > 20) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          API Status
          <Badge variant={status.summary.activeKeys > 0 ? 'default' : 'destructive'}>
            {status.summary.activeKeys}/{status.summary.totalKeys} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Total Remaining</div>
            <div className="text-2xl font-bold text-green-600">
              {status.summary.totalRemaining}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Usage</div>
            <div className="text-2xl font-bold text-blue-600">
              {status.summary.usagePercentage}%
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Quota Usage</span>
            <span>{status.summary.totalRemaining}/{status.summary.totalLimit}</span>
          </div>
          <Progress 
            value={100 - (status.summary.totalRemaining / status.summary.totalLimit * 100)} 
            className="h-2"
          />
        </div>

        {/* Individual Keys */}
        <div className="space-y-2">
          <div className="text-sm font-medium">API Keys:</div>
          {status.keys.map((key) => (
            <div key={key.index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                <Badge variant={key.isActive ? 'default' : 'secondary'}>
                  Key {key.index + 1}
                </Badge>
                <span className={`text-sm ${getQuotaColor(key.remaining, key.limit)}`}>
                  {key.remaining}/{key.limit}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                <div>Last used: {formatTime(key.lastUsed)}</div>
                <div>Reset: {formatResetTime(key.resetTime)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-500 text-center space-y-1">
          <div>Last updated: {new Date(status.timestamp).toLocaleString()}</div>
          <div className="text-blue-600">Quota updated from API response headers</div>
        </div>
      </CardContent>
    </Card>
  )
} 