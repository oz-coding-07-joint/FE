/** @type {import('next').NextConfig} */

const API_SERVER_BASE_URL = "http://211.188.59.23/api/v1";

const nextConfig = {
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
};

export default nextConfig;
