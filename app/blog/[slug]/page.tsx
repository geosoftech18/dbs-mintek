import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/site-config'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import {
  buildArticleSchema,
  buildWebPageSchema,
} from '@/lib/seo-schemas'
import JsonLd from '@/components/json-ld'
import { getPublishedPost, getRelatedPosts } from '@/lib/blog-data'
import BlogDetailClient from './blog-detail-client'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { ok, post } = await getPublishedPost(slug)

  if (!post) {
    return {
      title: ok ? 'Post Not Found' : 'Blog',
      description: ok
        ? 'The blog post you are looking for does not exist.'
        : 'Insights and updates from DBS Mintek.',
      // Only de-index when we know the post genuinely does not exist.
      ...(ok ? { robots: { index: false, follow: false } } : {}),
    }
  }

  const metaTitle = post.metaTitle?.trim() || post.title
  const metaDescription = post.metaDescription?.trim() || post.excerpt
  const pageUrl = absoluteUrl(`/blog/${slug}`)

  return {
    ...pageMetadata({
      title: metaTitle,
      description: metaDescription,
      path: `/blog/${slug}`,
      keywords: post.tags,
      type: 'article',
      image: post.featuredImage || undefined,
    }),
    openGraph: {
      type: 'article',
      locale: 'en_IN',
      url: pageUrl,
      siteName: SITE_NAME,
      title: metaTitle,
      description: metaDescription,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      ...(post.featuredImage
        ? {
            images: [
              {
                url: post.featuredImage,
                alt: metaTitle,
              },
            ],
          }
        : {}),
    },
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { post } = await getPublishedPost(slug)
  const relatedPosts = post ? await getRelatedPosts(slug, post.tags) : []

  const schemas = post
    ? [
        buildArticleSchema({
          title: post.metaTitle?.trim() || post.title,
          description: post.metaDescription?.trim() || post.excerpt,
          path: `/blog/${slug}`,
          image: post.featuredImage,
          datePublished: post.createdAt,
          dateModified: post.updatedAt,
          tags: post.tags,
        }),
        buildWebPageSchema({
          title: post.metaTitle?.trim() || post.title,
          description: post.metaDescription?.trim() || post.excerpt,
          path: `/blog/${slug}`,
        }),
      ]
    : null

  return (
    <>
      <JsonLd data={schemas} />
      <BlogDetailClient
        slug={slug}
        initialPost={post}
        relatedPosts={relatedPosts}
      />
    </>
  )
}
