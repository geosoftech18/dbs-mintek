import ContactUs from "./contact-us"
import JsonLd from "@/components/json-ld"
import { pageMetadata } from "@/lib/seo"
import { buildWebPageSchema } from "@/lib/seo-schemas"

const title = "Contact Us"
const description =
  "Contact DBS Mintek for inbound, outbound, email, chat, and pension administration services."
const path = "/contact"

export const metadata = pageMetadata({
  title,
  description,
  path,
  keywords: [
    "contact DBS Mintek",
    "call center contact",
    "BPO inquiry",
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
          type: "ContactPage",
        })}
      />
      <ContactUs />
    </>
  )
}
