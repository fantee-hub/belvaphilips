import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

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
const AUTH_EXCLUDED_PATHS = ["/admin/login", "/signin", "/auth"];

// Add root route and other protected routes to check for Supabase auth
const SUPABASE_PROTECTED_ROUTES = ["/checkout", "/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`Middleware: Checking path ${pathname}`);

  // Skip middleware for excluded paths
  if (EXCLUDED_PATHS.some((path) => pathname.startsWith(path))) {
    console.log(`Middleware: Skipping excluded path ${pathname}`);
    return NextResponse.next();
  }

  // Skip authentication checks for auth-excluded paths
  if (AUTH_EXCLUDED_PATHS.includes(pathname)) {
    console.log(`Middleware: Skipping auth check for ${pathname}`);
    return NextResponse.next();
  }

  if (matchesRoute(pathname, SUPABASE_PROTECTED_ROUTES)) {
    console.log(`Middleware: Running Supabase auth check for ${pathname}`);
    const supabaseResponse = await updateSession(request);

    console.log(supabaseResponse);

    if (supabaseResponse.status === 307) {
      console.log(
        `Middleware: Supabase redirected to ${supabaseResponse.headers.get(
          "location"
        )}`
      );
      return supabaseResponse;
    }
    console.log(`Middleware: Supabase auth passed for ${pathname}`);
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
  matcher: [
    "/checkout",
    "/admin",
    "/admin/:path*",
    "/protected/:path*",
    "/dashboard",
  ],
};
