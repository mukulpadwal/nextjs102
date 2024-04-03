import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import conf from "@/conf/conf";

interface EmailData {
    email: string,
    emailType: string,
    userId: string
}

export default async function sendEmail({ email, emailType, userId }: EmailData) {
    try {

        // Let's create a token to send
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        const emailBody: string = `
            <h2>$Click on the link below to ${(emailType === 'VERIFY') ? 'verify your account.' : 'reset your password.'}</h2>
            <p>${(emailType === 'VERIFY') ? `<a href='${conf.domain}/verifyemail?token=${hashedToken}'>VERIFY ACCOUNT</a>` : `<a href='${conf.domain}/resetpassword?token=${hashedToken}'>RESET PASSWORD</a>`}<p>
            <hr>
            <p>If above button does not work paste the links directly into your browser ${(emailType === 'VERIFY') ? `${conf.domain}/verifyemail?token=${hashedToken}` : `${conf.domain}/resetpassword?token=${hashedToken}`}<p>
            <hr>
        `;

        // We need to check for the emailType and based on that we need to send verification tokens
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 86400000
                }
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 86400000
                }
            })
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: conf.mailtrapUsername,
                pass: conf.mailtrapPassword
            }
        });

        const emailOptions = {
            from: "mukulpadwal.me@gmail.com", // sender address
            to: email, // list of receivers
            subject: (emailType === 'VERIFY') ? "Verify your email address..." : "Reset your Password...", // Subject line
            html: emailBody, // html body
        }

        const mailResponse = await transporter.sendMail(emailOptions);

        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}