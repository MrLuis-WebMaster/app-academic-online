import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const PUBLIC_PATHS = ["/auth", "/api/public"]

const getJwtSecret = () =>
    new TextEncoder().encode(process.env.JWT_SECRET || "EDU_SECRET_DEV")

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    if (pathname === "/") {
        return NextResponse.next()
    }

    if (PUBLIC_PATHS.some((publicPath) => pathname.startsWith(publicPath))) {
        return NextResponse.next()
    }

    const cookieToken = req.cookies.get("authToken")?.value
    const bearerToken = req.headers.get("Authorization")?.replace("Bearer ", "")
    const token = cookieToken || bearerToken

    if (!token) {
        console.warn("Token no proporcionado")
        return handleUnauthorized(req)
    }

    try {
        await jwtVerify(token, getJwtSecret())
        return NextResponse.next()
    } catch (err) {
        console.error("Token inválido:", err)
        return handleUnauthorized(req)
    }
}

function handleUnauthorized(req: NextRequest) {
    const isApi = req.nextUrl.pathname.startsWith("/api/")
    return isApi
        ? NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
        : NextResponse.redirect(new URL("/auth/login", req.url))
}

export const config = {
    matcher: [
        "/api/assessment(.*)",
        "/academic(.*)",
      ],
}
