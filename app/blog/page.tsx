import BlogListClient from './blog-list-client'
import JsonLd from '@/components/json-ld'
import { pageMetadata, absoluteUrl } from '@/lib/seo'
import { buildWebPageSchema } from '@/lib/seo-schemas'
import { getPublishedPosts } from '@/lib/blog-data'

const title = 'Blog'
const description =
  'Insights and updates from DBS Mintek on call center, BPO, and customer experience.'
const path = '/blog'

export const revalidate = 3600

export const metadata = pageMetadata({
  title,
  description,
  path,
  keywords: [
    'DBS Mintek blog',
    'call center insights',
    'BPO articles',
  ],
})

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  const itemListSchema =
    posts.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: posts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/blog/${post.slug}`),
            name: post.title,
          })),
        }
      : null

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            title,
            description,
            path,
            type: 'CollectionPage',
          }),
          itemListSchema,
        ]}
      />
      <BlogListClient initialPosts={posts} />
    </>
  )
}
