import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'
import { SERVICE_PAGES } from '@/lib/seo-schemas'

/** Refresh sitemap often so Google sees fresh lastmod / blog posts. */
export const revalidate = 3600

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      (err) => {
        clearTimeout(timer)
        reject(err)
      }
    )
  })
}

async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const [{ default: connectDB }, { default: Blog }] = await Promise.all([
      import('@/lib/mongodb'),
      import('@/models/Blog'),
    ])

    await withTimeout(connectDB(), 4000)

    const posts = await withTimeout(
      Blog.find({ status: 'published' }).select('slug updatedAt').lean().exec(),
      4000
    )

    return posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Sitemap blog fetch skipped:', error)
    return []
  }
}

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
      changeFrequency: 'weekly',
      priority: 0.95,
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

  const blogRoutes = await getBlogSitemapEntries()

  return [...staticRoutes, ...blogRoutes]
}
