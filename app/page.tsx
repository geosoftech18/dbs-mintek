import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ClientsSection from "@/components/clients-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import FounderSection from "@/components/founder-section"
import MobileTestimonialsSection from "@/components/mobile-testimonials-section"
import JsonLd from "@/components/json-ld"
import { pageMetadata } from "@/lib/seo"
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-config"
import {
  buildWebPageSchema,
  SERVICE_PAGES,
  buildServiceSchema,
} from "@/lib/seo-schemas"

export const metadata = {
  ...pageMetadata({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    path: "/",
    keywords: [
      "DBS Mintek",
      "call center India",
      "BPO services",
      "inbound outbound call center",
      "pension administration",
    ],
  }),
  title: {
    absolute: SITE_NAME,
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={[
          buildWebPageSchema({
            title: SITE_NAME,
            description: SITE_DESCRIPTION,
            path: "/",
          }),
          ...SERVICE_PAGES.map((service) => buildServiceSchema(service)),
        ]}
      />
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ClientsSection />
      <WhyChooseUsSection />
      <FounderSection/>
      <TestimonialsSection />
      <MobileTestimonialsSection/>
      <ContactSection />
      <Footer />
    </div>
  )
}
