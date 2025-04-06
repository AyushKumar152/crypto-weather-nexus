/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

const withNetlify = require('@netlify/next');

module.exports = withNetlify({
  reactStrictMode: true,
  // any other Next.js config you have
});
