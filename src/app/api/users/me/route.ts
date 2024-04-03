import connect from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import verifyTokenAndGetUserData from "@/helpers/verifyJwt";

connect();

export async function GET(request: NextRequest) {
    // Step 1 : we need to get the token from frontend if the user is logged in
    const jwtToken = request.cookies.get("token")?.value || '';

    if (!jwtToken) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized Request...",
            data: {},
            status: 400
        })
    }

    const user = await verifyTokenAndGetUserData(jwtToken)

    if (user === null) {
        return NextResponse.json({
            success: false,
            message: "No user found...",
            data: {},
            status: 400
        })
    }

    return NextResponse.json({
        success: true,
        message: "User information fetched successfully...",
        data: user,
        status: 200
    })

}