import { NextResponse, type NextRequest } from 'next/server';
import { ROUTE_LOGIN, isPublicPath } from '@config/route';

const USER_TOKEN_KEY = process.env.NEXT_PUBLIC_USER_TOKEN_KEY ?? '';

/**
 * Route guard based on brain-user token cookie (set by BFF after login).
 * Full token validation happens in {@link ServerAuth} on API requests.
 */
export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;

  if (!USER_TOKEN_KEY) {
    return response;
  }

  const token = request.cookies.get(USER_TOKEN_KEY)?.value;
  const isLoggedIn = Boolean(token?.trim());

  if (!isLoggedIn && !isPublicPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTE_LOGIN;
    return NextResponse.redirect(url);
  }

  return response;
}
