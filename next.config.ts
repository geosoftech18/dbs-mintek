import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Absolute path — process.cwd() alone still lost nested routes when another
  // Next app held port 3000 / a parent lockfile confused Turbopack.
  turbopack: {
    root: path.resolve(__dirname),
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
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:path*(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
