import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL(`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/**`)],
    },
};

export default withNextVideo(nextConfig);