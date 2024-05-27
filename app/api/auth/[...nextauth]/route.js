<<<<<<< HEAD
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
=======
>>>>>>> 7186097b3ab912dc39ea3c29536416358ccc2638
// use credentials provider so you can use your custom fields for authentication during login
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: `credentials`,
            // leave blank because we are using custom credentials from our login form
            credentials: {
                // google login, facebook login...etc (0Auth)
            },
            async authorize(request) {
                const { email, password } = request; //destructuring
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        return null;
                    }

                    const passwordsMatches = await bcrypt.compare(password, user.password);

                    if (!passwordsMatches) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    ],
    session: {
        strategy: `jwt`, //json web token
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: `/app/auth/signin`,
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
