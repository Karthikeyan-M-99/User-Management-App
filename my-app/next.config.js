/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/login'
      }
    ];
  },
  output: 'standalone',
  poweredByHeader: false,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/_next' : '',
  trailingSlash: false,
  experimental: {
    optimizeCss: true,
    optimizeImages: true
  },
  swcMinify: true
}

module.exports = nextConfig