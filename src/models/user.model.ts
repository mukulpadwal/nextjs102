import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
        lowecase: true,
        index: true
    },
    email: {
        type: String,
        required: [true, 'Please provide a valid email'],
        unique: true,
        trim: true,
        lowecase: true,
        validate: () => true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        lowecase: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
}, { timestamps: true });

// export const User = mongoose.model("User", userSchema);

// NOTE : NextJs rus on edge environement.
// It does not know that if the connection with the database is being made firsttime or already made 
// So We need to handle a speial case for exporting the model here
// First we check for the reference of the database is exists
// If not found we create one

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;

// here we do not write User like we do in dedicated backend just to maintain the consistency of codebase.