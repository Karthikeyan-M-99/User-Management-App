const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  async rewrites() {
    return [];
  },
  output: 'standalone',
  poweredByHeader: false,
  trailingSlash: false,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    optimizeImages: true
  }
};

module.exports = nextConfig;
