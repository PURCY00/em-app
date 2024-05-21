import mongoose from "mongoose";
// this is the file that connect the database to your application
export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`conected to mongodb`);
    } catch (error) {
        console.log(`error connecting to mongo db`);
    }
};
