/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'spot-the-scam.s3.amazonaws.com',
        },
        {
          protocol: 'https',
          hostname: 'play-lh.googleusercontent.com',
        },
      ],
    },
  };

export default nextConfig;

