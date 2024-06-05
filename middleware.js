import { withAuth } from "next-auth/middleware";

export default withAuth({
    // Add your authentication logic here if needed
    pages: {
        signIn: "/auth/signin",
    },
});

export const config = {
    matcher: [`/`, `/profile`],
};
