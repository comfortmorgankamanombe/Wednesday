import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  // Skip middleware for non-admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Skip middleware for admin login and setup pages
  if (request.nextUrl.pathname === "/admin" || request.nextUrl.pathname === "/admin/setup") {
    return NextResponse.next()
  }

  // Create a Supabase client
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session, redirect to admin login
  if (!session) {
    const url = new URL("/admin", request.url)
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
