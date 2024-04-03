import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import connect from "@/db/dbConfig";

connect();

export async function POST(request: NextRequest) {
    try {
        // Step 1 : get token from the url
        const token = request.nextUrl.searchParams.get("token");

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "No token found...",
                data: {},
                status: 400
            })
        }

        // Step 2 : Now that we have the token we can verify it by compairing
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {
                $gt: Date.now()
            }
        })

        if (user === null) {
            return NextResponse.json({
                success: false,
                message: "Invalid Token or Token Expired...",
                data: {},
                status: 400
            })
        }

        // Now that we have the user we need to make its verified status to true and unset the verifiedToken values
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        const verifiedUser = await user.save();

        if (verifiedUser === null) {
            return NextResponse.json({
                success: false,
                message: "Something went wile verifying token. Please try creating account again...",
                data: {},
                status: 500
            })
        }

        return NextResponse.json({
            success: true,
            message: "User verified successfully...",
            data: verifiedUser,
            status: 200
        })



    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
            data: {},
            status: 500
        })
    }
}