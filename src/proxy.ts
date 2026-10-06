import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const { nextUrl } = request;
    const pathname = nextUrl.pathname;

    //Security Headers
    const response = NextResponse.next();
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    //Auth
    const session = await auth();
    const isLoggedIn = !!session?.user;

    //Redirect to Login if not loggedIn
    if (pathname.startsWith("/portal") && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    //Redirect to Portal if loggedIn
    if ((pathname === "/login" || pathname.startsWith("/register")) && isLoggedIn) {
        return NextResponse.redirect(new URL("/portal", nextUrl));
    }

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}