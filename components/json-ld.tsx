import type { JsonLd } from '@/lib/seo-schemas'

type JsonLdProps = {
  data: JsonLd | Array<JsonLd | null | undefined> | null | undefined
}

/** Renders one or more JSON-LD scripts. Safe for Server Components. */
export default function JsonLd({ data }: JsonLdProps) {
  if (!data) return null

  const items = (Array.isArray(data) ? data : [data]).filter(
    (item): item is JsonLd => Boolean(item)
  )

  if (!items.length) return null

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
