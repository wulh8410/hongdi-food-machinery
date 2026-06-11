/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'hongdi-food-machinery';

const nextConfig = {
  output: 'export',
  ...(isGithubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`
      }
    : {}),
  images: {
    unoptimized: true
  },
  experimental: {
    cpus: 1
  },
  trailingSlash: true
};

module.exports = nextConfig;
