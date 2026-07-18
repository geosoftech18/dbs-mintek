import type { Metadata } from 'next'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { SITE_NAME } from '@/lib/site-config'
import { absoluteUrl } from '@/lib/seo'
import {
  buildArticleSchema,
  buildWebPageSchema,
} from '@/lib/seo-schemas'
import JsonLd from '@/components/json-ld'
import BlogDetailClient from './blog-detail-client'

type PageProps = {
  params: Promise<{ slug: string }>
}

async function getPublishedBlog(slug: string) {
  await connectDB()
  return Blog.findOne({ slug, status: 'published' }).lean()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const blog = await getPublishedBlog(slug)

    if (!blog) {
      return {
        title: 'Post Not Found',
        description: 'The blog post you are looking for does not exist.',
        robots: { index: false, follow: false },
      }
    }

    const metaTitle = blog.metaTitle?.trim() || blog.title
    const metaDescription = blog.metaDescription?.trim() || blog.excerpt
    const pageUrl = absoluteUrl(`/blog/${slug}`)

    return {
      title: metaTitle,
      description: metaDescription,
      ...(blog.tags?.length ? { keywords: blog.tags } : {}),
      openGraph: {
        type: 'article',
        locale: 'en_IN',
        url: pageUrl,
        siteName: SITE_NAME,
        title: metaTitle,
        description: metaDescription,
        publishedTime: blog.createdAt?.toISOString(),
        modifiedTime: blog.updatedAt?.toISOString(),
        tags: blog.tags,
        ...(blog.featuredImage
          ? {
              images: [
                {
                  url: blog.featuredImage,
                  alt: metaTitle,
                },
              ],
            }
          : {}),
      },
      twitter: {
        card: blog.featuredImage ? 'summary_large_image' : 'summary',
        title: metaTitle,
        description: metaDescription,
        ...(blog.featuredImage ? { images: [blog.featuredImage] } : {}),
      },
      alternates: {
        canonical: pageUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    console.error('Error generating blog metadata:', error)
    return {
      title: 'Blog',
    }
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params

  let schemas = null as ReturnType<typeof buildArticleSchema>[] | null

  try {
    const blog = await getPublishedBlog(slug)

    if (blog) {
      const title = blog.metaTitle?.trim() || blog.title
      const description = blog.metaDescription?.trim() || blog.excerpt
      const path = `/blog/${slug}`

      schemas = [
        buildArticleSchema({
          title,
          description,
          path,
          image: blog.featuredImage,
          datePublished: blog.createdAt,
          dateModified: blog.updatedAt,
          tags: blog.tags,
        }),
        buildWebPageSchema({
          title,
          description,
          path,
        }),
      ]
    }
  } catch (error) {
    console.error('Error building blog Article schema:', error)
  }

  return (
    <>
      {schemas ? <JsonLd data={schemas} /> : null}
      <BlogDetailClient slug={slug} />
    </>
  )
}
