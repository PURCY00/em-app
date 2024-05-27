import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
// use credentials provider so you can use your custom fields for authentication during login
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: `credentials`,
            // leave blank because we are using custom credentials from our login form
            credentials: {},
            async authorize(request) {
                const {email, password } = request;
                try {
                    await connectMongoDB()
                    const user = await User.findOne({email});
                    if (!user) {
                        return null;
                    }

                    const passwordsMatches=await bcryt.compare(password,user.password);
                    if(!passwordsMatches)return null;
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
