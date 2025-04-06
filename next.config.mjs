import pkg from '@netlify/next';
const { withNetlify } = pkg;

const nextConfig = {
  reactStrictMode: true,
};

export default withNetlify(nextConfig);
