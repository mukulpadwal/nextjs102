import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        // Step 1 : we need to get the token from frontend if the user is logged in
        const jwtToken = request.cookies.get("token");

        if (!jwtToken) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized Request...",
                data: {},
                status: 400
            })
        }

        const response = NextResponse.json({
            success: true,
            message: "User logged out successfully...",
            data: {},
            status: 200
        })

        response.cookies.delete("token");

        return response;

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
            data: {},
            status: 500
        })
    }
}