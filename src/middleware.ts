import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Check at which path the user is currently
    const path = request.nextUrl.pathname;

    // Let's define our public routes which user can access freely
    const isPublicPath = path === "/" || path === "/login" || path === "signup" || path === "verifyemail";

    // Let's gather the token from to authenticate the user
    const token = request.cookies.get("token")?.value || "";

    // Let's handle some scenarios
    // 1) The user is already authenticated and they are trying to access public routes 
    // In such case we should redirect them to profile page
    if (token.trim().length > 0 && isPublicPath) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    // 2) The user is not authenticated and trying to access non public routes (private)
    // In such case we should redirect them to either homepage or login page
    if (token.trim().length === 0 && !isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/login", "/signup", "/profile", "/verifyemail"],
}