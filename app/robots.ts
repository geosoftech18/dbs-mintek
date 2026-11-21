import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/city/', '/services/', '/about', '/contact', '/gallery', '/blog'],
        // Blog HTML is server-rendered now — crawlers must not hit /api/*
        // (that was burning Fast Origin Transfer on Hobby).
        disallow: ['/blog/admin', '/blog/admin/', '/blog/create', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/blog/admin', '/blog/admin/', '/blog/create', '/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
