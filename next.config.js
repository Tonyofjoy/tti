/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ignore ESLint errors during build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Redirects for consolidated about pages
  async redirects() {
    return [
      {
        source: '/about/team',
        destination: '/about?section=team',
        permanent: true,
      },
      {
        source: '/about/mission',
        destination: '/about?section=mission',
        permanent: true,
      },
      {
        source: '/about/process',
        destination: '/about?section=process',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 