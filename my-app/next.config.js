/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  output: 'standalone',
  poweredByHeader: false,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/_next' : '',
  trailingSlash: false
}

module.exports = nextConfig