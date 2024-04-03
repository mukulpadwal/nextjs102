import connect from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sendEmail from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        // Logic to register a user
        // STEP 1 : to get data from the frontend
        const userSignupData = await request.json();
        const { username, email, password } = userSignupData;

        // STEP 2 : validate the data
        if ([username, email, password].some((field) => !field || field?.trim().length === 0)) {
            return NextResponse.json({
                status: 400,
                success: false,
                message: "All the fields are required...",
                data: {}
            })
        }

        // Step 3 : to check if user does not exist with same email or username
        const userFound = await User.findOne({
            $or: [{ username }, { email }]
        })

        console.log(userFound);


        if (userFound !== null) {
            return NextResponse.json({
                status: 400,
                success: false,
                message: "A user with same username or email already exists...",
                data: {}
            })
        }

        // Step 4 : Hash the password
        var salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(password, salt);

        // Step 5 : Now let's create a user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        
        if (!user) {
            return NextResponse.json({
                status: 400,
                success: false,
                message: "Error while creating user. Please try again later...",
                data: {}
            })
        }

        // Step 6 : We need to send verification email using nodemailer
        const mailResponse = await sendEmail({ email, emailType: 'VERIFY', userId: user._id });

        // Step 7 
        return NextResponse.json({
            status: 201,
            success: true,
            message: "User successfully created...",
            data: user
        })


    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            success: false,
            message: error.message,
            data: {}
        })
    }
}