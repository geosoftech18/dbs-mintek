import HeroSection from "@/components/city/HeroSection"
import WhyMumbaiSection from "@/components/city/WhyMumbaiSection"
import ServicesSection from "@/components/city/ServicesSection"
import WhyDBSMintek from "@/components/city/WhyDBSMintek"
import TechnologySection from "@/components/city/TechnologySection"
import IndustriesSection from "@/components/city/IndustriesSection"
import ProcessSection from "@/components/city/ProcessSection"
import FAQSection from "@/components/city/FAQSection"
import Header from "@/components/header"
import Footer from "@/components/footer"
import JsonLd from "@/components/json-ld"
import { pageMetadata } from "@/lib/seo"
import { mumbaiFaqs } from "@/lib/city/mumbai-faqs"
import {
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo-schemas"

const title = "Call Center Mumbai"
const description =
  "Top-rated inbound call center and BPO services in Mumbai from DBS Mintek."
const path = "/city/mumbai"

export const metadata = pageMetadata({
  title,
  description,
  path,
  keywords: [
    "inbound call center Mumbai",
    "BPO Mumbai",
    "customer support Mumbai",
    "call center outsourcing India",
  ],
})

export default function Home() {
  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema({ title, description, path }),
          buildLocalBusinessSchema({ name: title, description, path }),
          buildServiceSchema({
            name: "Inbound Call Center Services in Mumbai",
            description,
            path,
            serviceType: "Inbound Call Center",
            keywords: [
              "inbound call center Mumbai",
              "BPO Mumbai",
              "customer support",
            ],
          }),
          buildFaqSchema(
            mumbaiFaqs.map((f) => ({ question: f.q, answer: f.a }))
          ),
        ]}
      />
      <Header />
      <HeroSection />
      <WhyMumbaiSection />
      <ServicesSection />
      <WhyDBSMintek />
      <TechnologySection />
      <IndustriesSection />
      <ProcessSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
