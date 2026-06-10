import type { Metadata } from 'next'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { SITE_NAME, SITE_URL } from '@/lib/site-config'
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
      }
    }

    const metaTitle = blog.metaTitle?.trim() || blog.title
    const metaDescription = blog.metaDescription?.trim() || blog.excerpt
    const pageUrl = `${SITE_URL}/blog/${slug}`

    return {
      title: metaTitle,
      description: metaDescription,
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
  return <BlogDetailClient slug={slug} />
}
