import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
        username: {
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

        // confirm_password: {
        //     type: String,
        //     required: true,
        // },
    },
    { timestamps: true }
);

const User = models.Users || mongoose.model("Users", userSchema);
export default User;
