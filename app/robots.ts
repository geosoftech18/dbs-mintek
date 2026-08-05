import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/city/',
          '/services/',
          '/about',
          '/contact',
          '/gallery',
          '/blog',
          // Read-only endpoint the blog UI falls back to when rendering client
          // side. Blocking it made Googlebot render empty blog pages.
          '/api/blog',
        ],
        disallow: [
          '/blog/admin',
          '/blog/admin/',
          '/blog/create',
          '/api/auth',
          '/api/blog/test-connection',
          '/api/send-email',
          '/api/inquiry-mail',
          '/api/callback-mail',
          '/api/consultation-mail',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/api/blog'],
        disallow: [
          '/blog/admin',
          '/blog/admin/',
          '/blog/create',
          '/api/auth',
          '/api/blog/test-connection',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
