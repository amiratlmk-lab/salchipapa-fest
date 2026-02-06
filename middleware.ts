import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 1. Define paths that are ALWAYS allowed (no redirect)
    // - /ganadores (The target page)
    // - /admin (The admin panel - MUST remain accessible)
    // - /api (Server actions/API)
    // - /_next (Next.js internal resources)
    // - Static files (images, etc. - usually have an extension like .png, .jpg, .css)
    if (
        pathname.startsWith('/ganadores') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.') // Heuristic for files (images, favicon, etc)
    ) {
        return NextResponse.next()
    }

    // 2. Redirect EVERYTHING else to /ganadores
    // This covers: /, /ranking, /votar, /unknown-pages
    return NextResponse.redirect(new URL('/ganadores', request.url))
}

export const config = {
    // Run on all paths
    matcher: '/:path*',
}
