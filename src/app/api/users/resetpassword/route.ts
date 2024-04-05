import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";

export async function POST(request: NextRequest) {
    try {
        const token = request.nextUrl.searchParams.get("token");

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized token...",
                data: {},
                status: 500
            })
        }

        // Step 2 : Now that we have the token we can verify it by compairing
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: {
                $gt: Date.now()
            }
        })

    }
    catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
            data: {},
            status: 500
        })
    }
}