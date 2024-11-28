import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/home', '/events', '/banner', '/faq', '/user', '/category', '/event-type']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const currentPath = request.nextUrl.pathname

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    currentPath.startsWith(route)
  )

  // Case 1: No token and trying to access protected route -> redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Case 2: Has token and trying to access login page -> redirect to home
  if (token && currentPath === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // Case 3: All other cases (including refreshes on protected routes with token)
  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/',
    '/home',
    '/events/:path*',
    '/banner/:path*',
    '/faq/:path*',
    '/user/:path*',
    '/category/:path*',
    '/event-type/:path*'
  ]
} 