<<<<<<< HEAD
/** @type {import("next").NextConfig} */
=======
/** @type {import('next').NextConfig} */
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
<<<<<<< HEAD
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        appDir: false,
    },
=======
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
};

module.exports = nextConfig;
