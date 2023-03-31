/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.entropiawiki.com',
        port: '',
        pathname: '/images/gallery/**',
      },
    ],
  },
};

module.exports = nextConfig;
