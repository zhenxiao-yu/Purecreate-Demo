/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingExcludes: {
    '*': ['**/*'],
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    // Workaround for Windows EISDIR readlink errors during webpack snapshot resolution
    if (!dev) config.cache = false;
    return config;
  },
};

export default nextConfig;
