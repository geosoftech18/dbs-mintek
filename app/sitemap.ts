import type { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { SITE_URL } from '@/lib/site-config'
import { SERVICE_PAGES } from '@/lib/seo-schemas'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/city/mumbai`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...SERVICE_PAGES.map((service) => ({
      url: `${SITE_URL}${service.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]

  let blogRoutes: MetadataRoute.Sitemap = []

  try {
    await connectDB()
    const posts = await Blog.find({ status: 'published' })
      .select('slug updatedAt')
      .lean()

    blogRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Sitemap blog fetch failed:', error)
  }

  return [...staticRoutes, ...blogRoutes]
}
