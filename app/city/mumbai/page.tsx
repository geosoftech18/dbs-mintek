import HeroSection from "@/components/city/HeroSection";
import WhyMumbaiSection from "@/components/city/WhyMumbaiSection";
import ServicesSection from "@/components/city/ServicesSection";
import WhyDBSMintek from "@/components/city/WhyDBSMintek";
import TechnologySection from "@/components/city/TechnologySection";
import IndustriesSection from "@/components/city/IndustriesSection";
import ProcessSection from "@/components/city/ProcessSection";
import FAQSection from "@/components/city/FAQSection";
import Header from "@/components/dropdown-header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
          <Header/>
      <HeroSection />
      <WhyMumbaiSection />
      <ServicesSection />
      <WhyDBSMintek />
      <TechnologySection />
      <IndustriesSection />
      <ProcessSection />
      <FAQSection />
      <Footer/>
    </main>
  );
}
