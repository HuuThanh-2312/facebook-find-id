import React from "react";
import { ApiStatus } from '@/components/api-status'

const CACHE_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 ngày

function formatCacheDuration(ms: number) {
  if (ms % (24 * 60 * 60 * 1000) === 0) {
    return `${ms / (24 * 60 * 60 * 1000)} days`;
  } else if (ms % (60 * 60 * 1000) === 0) {
    return `${ms / (60 * 60 * 1000)} hours`;
  } else if (ms % (60 * 1000) === 0) {
    return `${ms / (60 * 1000)} minutes`;
  } else {
    return `${ms / 1000} seconds`;
  }
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">API Management Dashboard</h1>
        <p className="text-gray-600">Monitor and manage API key rotation system</p>
      </div>
      <div className="grid gap-6">
        <ApiStatus />
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Environment:</span>
              <span className="ml-2 text-gray-600">{process.env.NODE_ENV}</span>
            </div>
            <div>
              <span className="font-medium">API Keys:</span>
              <span className="ml-2 text-gray-600">
                {process.env.RAPIDAPI_KEY_1 ? '1' : '0'} + 
                {process.env.RAPIDAPI_KEY_2 ? '1' : '0'} + 
                {process.env.RAPIDAPI_KEY_3 ? '1' : '0'}
              </span>
            </div>
            <div>
              <span className="font-medium">Cache Duration:</span>
              <span className="ml-2 text-gray-600">{formatCacheDuration(CACHE_DURATION)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 