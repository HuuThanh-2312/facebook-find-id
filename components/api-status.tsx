'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ChartContainer } from './ui/chart'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Button } from '@/components/ui/button'
import { CopyIcon, CheckIcon } from 'lucide-react'

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
  logs: ApiCallLog[]
}

interface ApiCallLog {
  timestamp: number;
  endpoint: string;
  link: string;
  status: number;
  latency: number;
}

export function ApiStatus() {
  const [status, setStatus] = useState<ApiStatus | null>(null)
  const [logs, setLogs] = useState<ApiCallLog[]>([])
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
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
      setLogs(data.logs || [])
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

  // Tính toán dữ liệu cho chart
  const chartData = React.useMemo(() => {
    // Gom nhóm theo ngày
    const byDay: Record<string, { count: number; error: number; latencySum: number; latencyCount: number }> = {}
    logs.forEach(log => {
      const d = new Date(log.timestamp)
      const day = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`
      if (!byDay[day]) byDay[day] = { count: 0, error: 0, latencySum: 0, latencyCount: 0 }
      byDay[day].count++
      if (log.status >= 400) byDay[day].error++
      if (typeof log.latency === 'number') {
        byDay[day].latencySum += log.latency
        byDay[day].latencyCount++
      }
    })
    return Object.entries(byDay).map(([day, v]) => ({
      day,
      count: v.count,
      error: v.error,
      avgLatency: v.latencyCount ? Math.round(v.latencySum/v.latencyCount) : 0,
      errorRate: v.count ? Math.round((v.error/v.count)*100) : 0
    }))
  }, [logs])

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
        {/* Chart section */}
        <div className="mb-8">
          <div className="text-sm font-semibold mb-2">API Call Performance (7 days)</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData} margin={{ top: 10, right: 60, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tickFormatter={v => v} />
              <YAxis yAxisId="left" label={{ value: 'Calls', angle: -90, position: 'insideLeft', offset: 20, dx: -10 }} tickFormatter={v => v.toLocaleString(undefined, { maximumFractionDigits: 2 })} width={60} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Latency (ms)', angle: 90, position: 'insideRight', offset: 20, dx: 40, style: { textAnchor: 'middle' } }} tickFormatter={v => v.toLocaleString(undefined, { maximumFractionDigits: 2 })} width={60} />
              <Tooltip formatter={(value) => typeof value === 'number' ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : value} />
              <Legend />
              <Bar yAxisId="left" dataKey="count" name="Calls" fill="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="avgLatency" name="Avg Latency (ms)" stroke="#82ca9d" />
              <Line yAxisId="left" type="monotone" dataKey="errorRate" name="Error Rate (%)" stroke="#ff4d4f" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
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

        {/* Log Table */}
        <div className="mt-8">
          <div className="text-sm font-semibold mb-2">API Call Log (7 days)</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 border">Time</th>
                  <th className="px-2 py-1 border">Endpoint</th>
                  <th className="px-2 py-1 border">Status</th>
                  <th className="px-2 py-1 border text-center">Latency (ms)</th>
                  <th className="px-2 py-1 border">Link</th>
                  <th className="px-2 py-1 border"></th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr><td colSpan={6} className="text-center text-gray-400 py-2">No log</td></tr>
                ) : (
                  logs.slice(-100).reverse().map((log, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="px-2 py-1 border whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="px-2 py-1 border">{log.endpoint}</td>
                      <td className="px-2 py-1 border text-center">{log.status}</td>
                      <td className="px-2 py-1 border text-center">{typeof log.latency === 'number' ? log.latency.toLocaleString(undefined, { maximumFractionDigits: 2 }) : ''}</td>
                      <td className="px-2 py-1 border max-w-xs truncate" title={log.link}>{log.link.length > 40 ? log.link.slice(0, 37) + '...' : log.link}</td>
                      <td className="px-2 py-1 border text-center">
                        <Button size="icon" variant="ghost" onClick={() => {
                          navigator.clipboard.writeText(log.link)
                          setCopiedIdx(i)
                          setTimeout(() => setCopiedIdx(null), 1500)
                        }} title="Copy link">
                          {copiedIdx === i ? <CheckIcon className="w-4 h-4 text-green-600" /> : <CopyIcon className="w-4 h-4" />}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center space-y-1">
          <div>Last updated: {new Date(status.timestamp).toLocaleString()}</div>
          <div className="text-blue-600">Quota updated from API response headers</div>
        </div>
      </CardContent>
    </Card>
  )
} 