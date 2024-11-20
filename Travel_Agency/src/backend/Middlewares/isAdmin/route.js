// src/backend/middleware/adminMiddleware.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function adminMiddleware(request) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json(
            { loginStatus: false },
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.isAdmin === true) {
            // Add admin info to request headers
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('user', JSON.stringify(decoded));

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } else {
            return NextResponse.json(
                { error: "Admin access required" },
                { status: 403 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { loginStatus: false },
            { status: 401 }
        );
    }
}