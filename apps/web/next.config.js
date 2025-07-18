/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@merajut-asa/ui'],
  experimental: {
    externalDir: true,
  },
}

module.exports = nextConfig
