/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true, // Необходимо для статической генерации
  },
  output: 'export', // Вместо 'standalone'
  trailingSlash: true, // Важно для правильных ссылок в статическом режиме
  eslint: {
    // Отключаем проверку ESLint при сборке
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Отключаем проверку TypeScript при сборке
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
