import { ApiStatus } from '@/components/api-status'

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
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Test API Endpoints</h3>
              <p className="text-sm text-gray-600 mb-3">Test the API rotation system</p>
              <div className="space-y-2">
                <a 
                  href="/api/extract/page?link=https://facebook.com/example" 
                  target="_blank"
                  className="block text-sm text-blue-600 hover:underline"
                >
                  Test Page ID Extraction
                </a>
                <a 
                  href="/api/extract/post?link=https://facebook.com/example/post" 
                  target="_blank"
                  className="block text-sm text-blue-600 hover:underline"
                >
                  Test Post ID Extraction
                </a>
                <a 
                  href="/api/extract/group?link=https://facebook.com/groups/example" 
                  target="_blank"
                  className="block text-sm text-blue-600 hover:underline"
                >
                  Test Group ID Extraction
                </a>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">API Status</h3>
              <p className="text-sm text-gray-600 mb-3">Check detailed API status</p>
              <a 
                href="/api/status" 
                target="_blank"
                className="block text-sm text-blue-600 hover:underline"
              >
                View Raw API Status
              </a>
            </div>
          </div>
        </div>
        
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
              <span className="ml-2 text-gray-600">5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 