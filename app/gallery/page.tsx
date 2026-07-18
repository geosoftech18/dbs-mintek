import AdvancedGallery from "./advance-gellery"
import JsonLd from "@/components/json-ld"
import { pageMetadata } from "@/lib/seo"
import { buildWebPageSchema } from "@/lib/seo-schemas"

const title = "Gallery"
const description =
  "Explore the DBS Mintek gallery — our teams, offices, and workplace culture."
const path = "/gallery"

export const metadata = pageMetadata({
  title,
  description,
  path,
  keywords: ["DBS Mintek gallery", "office photos", "team"],
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          title,
          description,
          path,
          type: "CollectionPage",
        })}
      />
      <AdvancedGallery />
    </>
  )
}
