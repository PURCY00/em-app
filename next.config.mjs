/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/api/post/postsById",
                destination: "/api/post/postsById",
                permanent: false,
            },
        ];
    },
    images: {
        domains: [`images.unsplash.com`, `res.cloudinary.com`],
        // remotePatterns: ['techstudio.nyc3.cdn.digitaloceanspaces.com'],clar
    },
};

export default nextConfig;
