// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { pages } from "next/dist/build/templates/app-page";

// const authOptions = {
//     providers: [
//         CredentialsProvider({
//             name: `credentials`,
//             // leave blank because we are using custom credentials from our login form
//             credentials: {},
//             async authorize(credentials) {
//                 const user = { id: `1` };
//                 return user;
//             },
//         }),
//     ],
//     session: {
//         strategy: `jwt`,
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: `/auth/signin`,
//     },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
