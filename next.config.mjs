import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 强制使用 Pages Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    // 优化图片配置
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30天缓存
  },
  experimental: {
    serverActions: {},
  },
  webpack: (config) => {
    config.resolve.alias['@'] = resolve(__dirname);
    return config;
  },
  // 添加重定向规则修复博客跳转问题
  async redirects() {
    return [
      // 确保博客路由正确
      {
        source: '/blog',
        destination: '/blog',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;