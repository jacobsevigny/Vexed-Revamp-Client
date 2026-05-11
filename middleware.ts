import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/profile", "/friends"];
const authPaths      = ["/login", "/register"];
const adminPaths     = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has("auth_session");
  const hasAdmin   = request.cookies.has("auth_admin");

  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  const isAdminPath = adminPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  const isAuthPage = authPaths.includes(pathname);

  // /profile, /friends — require login
  if (isProtected && !hasSession) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // /admin/* — require login AND admin cookie
  if (isAdminPath) {
    if (!hasSession) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (!hasAdmin) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // /login, /register — redirect already-logged-in users to home
  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/friends",
    "/friends/:path*",
    "/admin",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
