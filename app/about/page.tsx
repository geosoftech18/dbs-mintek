import AboutUs from "./about-us"
import JsonLd from "@/components/json-ld"
import { pageMetadata } from "@/lib/seo"
import { buildWebPageSchema } from "@/lib/seo-schemas"

const title = "About Us"
const description =
  "Learn about DBS Mintek — enterprise call center and BPO solutions since 2008."
const path = "/about"

export const metadata = pageMetadata({
  title,
  description,
  path,
  keywords: [
    "about DBS Mintek",
    "call center company India",
    "BPO company",
  ],
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          title,
          description,
          path,
          type: "AboutPage",
        })}
      />
      <AboutUs />
    </>
  )
}
