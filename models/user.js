import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePhoto: {
            type: String,
            default: "https://res.cloudinary.com/ceenobi/image/upload/v1709243852/icons/unnamed_fuwmdn.webp",
        },
        bio: {
            type: String,
            default: "Nothing to say yet",
            required: false,
        },
        location: {
            type: String,
            default: "Somewhere on Earth",
            required: false,
        },
        job: {
            type: String,
            default: "The things you do",
            required: false,
        },
        twitter: {
            type: String,
            required: false,
        },
        linkedIn: {
            type: String,
            required: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        age: {
            type: Number,
            required: false,
        },
        gender: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            default: "user",
            required: false,
        },
        followers: {
            type: [String],
            required: false,
        },
        following: {
            type: [String],
            required: false,
        },
        resetToken: {
            type: String,
            required: false,
        },
        resetTokenExpiry: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
