import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

// Middleware to secure routes
// TODO: Fix allowedPaths, currently causing cookie error.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of always allowed paths
  // const allowedPaths = ['/', '/register', '/login', '/about', '/ui/homepage', '/api/admins/stats'];

  // // Allow navigation to any of the allowed paths
  // if (allowedPaths.includes(pathname)) {
  //   return NextResponse.next();
  // }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}