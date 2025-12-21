import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionByToken, getSessionCookieName } from '@/lib/auth-session-edge';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route requires authentication
  const isAdminRoute = pathname.startsWith('/admin');
  const isNewsletterAPI = pathname.startsWith('/api/newsletter');

  // For newsletter API, only protect GET and DELETE methods (POST is public)
  if (isNewsletterAPI) {
    const method = request.method;
    if (method !== 'GET' && method !== 'DELETE') {
      return NextResponse.next();
    }
  }

  // If route doesn't require auth, continue
  if (!isAdminRoute && !isNewsletterAPI) {
    return NextResponse.next();
  }

  // Get session token from cookie
  const sessionCookieName = getSessionCookieName();
  const sessionToken = request.cookies.get(sessionCookieName)?.value;

  // If no session token, deny access
  if (!sessionToken) {
    if (isNewsletterAPI) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    // For admin pages, redirect to the same page (layout will show login form)
    return NextResponse.next();
  }

  // Validate session
  const session = await getSessionByToken(sessionToken);

  if (!session) {
    // Invalid or expired session
    if (isNewsletterAPI) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    // For admin pages, clear the invalid cookie and continue (layout will show login form)
    const response = NextResponse.next();
    response.cookies.delete(sessionCookieName);
    return response;
  }

  // Valid session, allow request
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/newsletter'],
};
