// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["w2qce6ciji.ufs.sh"], // Add your UploadThing subdomain
    // OR (if you want to allow all UploadThing URLs)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ufs.sh",
      },
    ],
  },
};

module.exports = nextConfig;