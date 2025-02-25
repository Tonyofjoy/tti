import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Export as default function instead
export default function middleware(request: NextRequest) {
  // Only run on admin routes, excluding login
  if (!request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get('admin_token')

  // Redirect to login if no token
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    // For now, just check if token exists
    // We'll validate the token in the API routes
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

export const config = {
  matcher: '/admin/:path*'
} 