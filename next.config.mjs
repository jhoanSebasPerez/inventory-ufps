/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "divisist2.ufps.edu.co",
        pathname: "/assets/img/bg/**"
      }
    ]
  }
};

export default nextConfig;
