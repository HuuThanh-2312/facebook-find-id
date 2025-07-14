export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Facebook ID Extractor</h1>
              <p className="text-sm text-gray-600">Admin Dashboard</p>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
      
      <main>
        {children}
      </main>
      
      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-gray-600 text-center">
            Admin Dashboard - Facebook ID Extractor
          </p>
        </div>
      </footer>
    </div>
  )
} 