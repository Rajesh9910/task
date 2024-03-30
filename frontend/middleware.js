import { NextResponse } from "next/server"
import { clientRoutes } from "./lib/helpers"

export function middleware(request) {

    const local_path = "http://localhost:3000"

    const url = local_path

    const path = request.nextUrl.pathname
    const user = request.cookies.get("user")?.value


    const public_routes = [clientRoutes.login]
    const private_routes = [clientRoutes.home]

    const isPublic = public_routes.some((i) => i === path)
    const isPrivate = private_routes.some((i) => i === path)


    if (!user && isPrivate) {
        return NextResponse.redirect(url + clientRoutes.login)
    }

    if (user && isPublic) {
        return NextResponse.redirect(url + clientRoutes.home)
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}