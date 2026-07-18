import OutboundServices from "./outbound-services"
import JsonLd from "@/components/json-ld"
import { pageMetadata } from "@/lib/seo"
import {
  buildServiceSchema,
  buildWebPageSchema,
  getServiceByPath,
} from "@/lib/seo-schemas"

const service = getServiceByPath("/services/outbound")!

export const metadata = pageMetadata({
  title: service.name,
  description: service.description,
  path: service.path,
  keywords: service.keywords,
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildServiceSchema(service),
          buildWebPageSchema({
            title: service.name,
            description: service.description,
            path: service.path,
          }),
        ]}
      />
      <OutboundServices />
    </>
  )
}
