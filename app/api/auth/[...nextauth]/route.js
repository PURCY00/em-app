// Import the function to connect to MongoDB
import { connectMongoDB } from "@/lib/mongodb";

// Import the User model
import User from "@/models/user";

// Import NextAuth for authentication
import NextAuth from "next-auth/next";

// Import CredentialsProvider for custom login
import CredentialsProvider from "next-auth/providers/credentials";

// Import bcrypt for password hashing
import bcrypt from "bcryptjs";

// Define authentication options
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: `credentials`,
            // Using custom credentials from our login form, so leaving this blank
            credentials: {
                // This is where credentials like email and password would be defined
            },
            // Custom authorize function to validate user credentials
            async authorize(request) {
                // Destructure email and password from request
                const { email, password } = request;
                try {
                    // Connect to MongoDB
                    await connectMongoDB();
                    // Find user by email
                    const user = await User.findOne({ email });
                    if (!user) {
                        return null; // If user not found, return null
                    }

                    // Compare provided password with stored password
                    const passwordsMatches = await bcrypt.compare(password, user.password);

                    if (!passwordsMatches) {
                        return null; // If password doesn't match, return null
                    }

                    // If user is found and password matches, return user object
                    return user;
                } catch (error) {
                    console.log(error); // Log any errors
                }
            },
        }),
    ],
    // Use JWT strategy for session handling
    session: {
        strategy: `jwt`,
    },
    // Secret key for NextAuth
    secret: process.env.NEXTAUTH_SECRET,
    // Custom sign-in page
    pages: {
        signIn: `/app/auth/signin`,
    },
};

// Create a handler for authentication routes using NextAuth and authOptions
const handler = NextAuth(authOptions);

// Export handler for GET and POST requests
export { handler as GET, handler as POST };
