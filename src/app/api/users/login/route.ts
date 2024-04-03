import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbConfig";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        // STEP 1 : Get the data from frontend
        const userLoginData = await request.json();
        const { email, password } = userLoginData;

        // STEP 2 : validate the data
        if ([email, password].some((field) => !field || field?.trim().length === 0)) {
            return NextResponse.json({
                success: false,
                message: "All fields are required...",
                data: {},
                status: 400
            })
        }

        // STEP 3 : Let's find the user and verify the password
        const user = await User.findOne({ email });

        if (user === null) {
            return NextResponse.json({
                success: false,
                message: "No user found...",
                data: {},
                status: 400
            })
        }

        // Step 4 : let's check if the user is verified or not
        if (!user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "Kindly verify your account first and then try logging in again...",
                data: {},
                status: 400
            })
        }

        // Step 5 : Now lets compare the passwords
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json({
                success: false,
                message: "Invalid Password...",
                data: {},
                status: 400
            })
        }

        return NextResponse.json({
            success: true,
            message: "User Logged In successfully...",
            data: user,
            status: 400
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