import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: `credentials`,
            credentials: {},
            async authorize(request) {
                const { email, password } = request;
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
        strategy: `jwt`,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: `/app/auth/signin`,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.profilePhoto = user.profilePhoto; // Add profile photo to the token
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.image = token.profilePhoto;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
