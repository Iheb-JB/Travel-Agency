// src/app/api/admin/test/route.js

import { NextResponse } from "next/server";

export async function GET(request) {
    // The request will only reach here if the adminMiddleware allows it
    try {
        const user = JSON.parse(request.headers.get('user'));
        
        return NextResponse.json({
            message: "Admin access granted",
            user: {
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}