import { NextResponse, NextRequest } from "next/server";

// List of protected admin routes
const ADMIN_PROTECTED_ROUTES = ["/admin", "/admin/:path*"];
// List of protected user routes
const USER_PROTECTED_ROUTES = ["/checkout"];
// Routes to exclude from middleware processing
const EXCLUDED_PATHS = [
  "/_next/static/",
  "/_next/image/",
  "/favicon.ico",
  "/assets/",
];
// Routes to exclude from authentication checks
const AUTH_EXCLUDED_PATHS = ["/admin/login", "/signin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`Middleware: Checking path ${pathname}`);

  // Skip middleware for excluded paths (static assets and all)
  if (EXCLUDED_PATHS.some((path) => pathname.startsWith(path))) {
    console.log(`Middleware: Skipping excluded path ${pathname}`);
    return NextResponse.next();
  }

  // Skip authentication checks for login page
  if (AUTH_EXCLUDED_PATHS.includes(pathname)) {
    console.log(`Middleware: Skipping auth check for ${pathname}`);
    return NextResponse.next();
  }

  // Check for admin protected routes
  if (matchesRoute(pathname, ADMIN_PROTECTED_ROUTES)) {
    const adminToken = request.cookies.get("admin_token")?.value;
    console.log(
      `Middleware: Admin token ${
        adminToken ? "found" : "not found"
      } for ${pathname}`
    );

    if (!adminToken) {
      const loginUrl = new URL("/admin/login", request.url);
      if (pathname !== "/admin/login") {
        loginUrl.searchParams.set("redirect", pathname);
      }
      console.log(`Middleware: Redirecting to ${loginUrl.toString()}`);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Check for user protected routes
  if (matchesRoute(pathname, USER_PROTECTED_ROUTES)) {
    const userToken = request.cookies.get("user_token")?.value;
    console.log(
      `Middleware: User token ${
        userToken ? "found" : "not found"
      } for ${pathname}`
    );

    if (!userToken) {
      const loginUrl = new URL("/signin", request.url);
      if (pathname !== "/signin") {
        loginUrl.searchParams.set("redirect", pathname);
      }
      console.log(`Middleware: Redirecting to ${loginUrl.toString()}`);
      return NextResponse.redirect(loginUrl);
    }
  }

  console.log(`Middleware: Allowing access to ${pathname}`);
  return NextResponse.next();
}

const matchesRoute = (path: string, routes: string[]) => {
  return routes.some((route) => {
    if (route.includes("/:path*")) {
      const baseRoute = route.replace("/:path*", "");
      return path === baseRoute || path.startsWith(baseRoute + "/");
    }
    return path === route;
  });
};

export const config = {
  matcher: ["/admin", "/admin/:path*", "/checkout"],
};
