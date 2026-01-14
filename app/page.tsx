
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
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
