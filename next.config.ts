import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Pin Turbopack to this app — a lockfile in C:\Users\hp was making
  // Next infer the wrong workspace root and drop nested routes.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  async redirects() {
    return [
      // Normalize common mistaken paths to canonical service URLs
      {
        source: '/services/email-support',
        destination: '/services/email',
        permanent: true,
      },
      {
        source: '/services/chat-support',
        destination: '/services/chat',
        permanent: true,
      },
      {
        source: '/mumbai',
        destination: '/city/mumbai',
        permanent: true,
      },
      {
        source: '/call-center-mumbai',
        destination: '/city/mumbai',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

export default nextConfig
