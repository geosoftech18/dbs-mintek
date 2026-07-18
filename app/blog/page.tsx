import BlogListClient from './blog-list-client'
import JsonLd from '@/components/json-ld'
import { pageMetadata } from '@/lib/seo'
import { buildWebPageSchema } from '@/lib/seo-schemas'

const title = 'Blog'
const description =
  'Insights and updates from DBS Mintek on call center, BPO, and customer experience.'
const path = '/blog'

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

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          title,
          description,
          path,
          type: 'CollectionPage',
        })}
      />
      <BlogListClient />
    </>
  )
}
