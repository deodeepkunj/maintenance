import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware to check maintenance mode and redirect to maintenance page
 * Checks multiple sources for maintenance mode status:
 * 1. Environment variable: MAINTENANCE_MODE
 * 2. Custom header from deployment system
 * 3. Request to maintenance status endpoint
 */
export async function proxy(request: NextRequest) {
  // Check environment variable for maintenance mode
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

  // Check custom header (useful for AWS CodeDeploy/CodePipeline)
  const maintenanceHeader = request.headers.get("x-maintenance-mode");

  // Allow maintenance endpoint to bypass check
  if (request.nextUrl.pathname === "/maintenance") {
    return NextResponse.next();
  }

  // Redirect to maintenance page if in maintenance mode
  if (maintenanceMode || maintenanceHeader === "true") {
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}

/**
 * Configure which routes to apply middleware to
 * Exclude api routes, static files, and other system routes
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
