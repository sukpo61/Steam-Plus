/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/api/steam/:path*',
                destination: 'https://store.steampowered.com/api/:path*',
            },
        ];
    },
};
export default nextConfig;
