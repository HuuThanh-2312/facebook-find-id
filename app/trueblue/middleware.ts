import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Simple admin protection - you can customize this
  const adminToken = process.env.ADMIN_TOKEN
  const requestToken = request.nextUrl.searchParams.get('token')
  
  // If no admin token is set, allow access (for development)
  if (!adminToken) {
    return NextResponse.next()
  }
  
  // If admin token is set, require it for access
  if (requestToken !== adminToken) {
    return NextResponse.redirect(new URL('/?error=unauthorized', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/trueblue/:path*',
} 