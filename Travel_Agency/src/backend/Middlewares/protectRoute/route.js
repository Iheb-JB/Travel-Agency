// src/backend/middleware/authMiddleware.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function authMiddleware(request) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json(
            { error: "Please login first" },
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user info to request headers
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('user', JSON.stringify(decoded));

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid token" },
            { status: 401 }
        );
    }
}