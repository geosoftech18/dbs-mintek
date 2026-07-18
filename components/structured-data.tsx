import JsonLd from '@/components/json-ld'
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
} from '@/lib/seo-schemas'

export default function StructuredData() {
  return (
    <JsonLd data={[buildOrganizationSchema(), buildWebsiteSchema()]} />
  )
}
