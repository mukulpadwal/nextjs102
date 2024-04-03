import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import conf from "@/conf/conf";

export default async function verifyTokenAndGetUserData(token: string) {
    try {
        const decodedInformation: any = jwt.verify(token, conf.jwtTokenSecret);

        const user = await User.findById(decodedInformation.id).select("-password");

        return user;
    } catch (error: any) {
        console.log(`Error while retrieving user information : ${error.message}`);

    }
}