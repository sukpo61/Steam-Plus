/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: [
            'firebasestorage.googleapis.com',
            'shared.akamai.steamstatic.com',
            'steamplus.s3.ap-northeast-2.amazonaws.com',
        ],
    },
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
