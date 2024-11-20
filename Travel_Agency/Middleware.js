import { NextResponse } from "next/server";
import { protectRoute} from "@/backend/Middlewares/protectRoute"
import { isAdmin } from "@/backend/Middlewares/isAdmin";

export const config = {
    matcher: [
        // Protected routes that require authentication
        '/api/user/:path*',
        '/api/booking/:path*',
        // Admin routes
        '/api/admin/:path*',
    ]
}

export async function middleware(request) {
    // Check if it's an admin route
    if (request.nextUrl.pathname.startsWith('/api/admin')) {
        return isAdmin(request);
    }
    
    // For other protected routes
    return protectRoute(request);
}