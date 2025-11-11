import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow password page, API routes, and static assets
  if (
    pathname === '/password' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/EVZAIN') ||
    pathname.startsWith('/Greek') ||
    pathname.startsWith('/athlete') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp)$/)
  ) {
    return NextResponse.next();
  }

  // Check for password cookie
  const passwordCookie = request.cookies.get('site-password');

  if (passwordCookie?.value === 'verified') {
    return NextResponse.next();
  }

  // Redirect to password page
  const passwordUrl = new URL('/password', request.url);
  return NextResponse.redirect(passwordUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
