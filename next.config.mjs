/** @type {import('next').NextConfig} */

const API_SERVER_BASE_URL = "https://api.umdoong.shop/api/v1";

const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return {
      fallback: [
        {
          source: "/api/v1/:path*",
          destination: `${API_SERVER_BASE_URL}/:path*/`,
        },
      ],
    };
  },
  images: {
    remotePatterns: [
      {
        hostname: "kr.object.ncloudstorage.com",
      }
    ]
  }
};

export default nextConfig;
