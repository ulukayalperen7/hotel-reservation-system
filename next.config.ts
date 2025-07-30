/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'erspublic.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'files.cdn.elektraweb.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;