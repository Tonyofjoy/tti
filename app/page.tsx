import HeroSection from "@/components/sections/hero-section"
import ServiceCards from "@/components/sections/service-cards"
import CaseStudiesSection from "@/components/sections/case-studies-section"
import ClientsSection from "@/components/sections/clients-logo-carousel"
import LatestInsights from "@/components/sections/latest-insights"
import SplineTestSection from "@/components/sections/spline-test-section"
import ContactFormSection from "@/components/sections/contact-form-section"

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ServiceCards />
      <CaseStudiesSection />
      <SplineTestSection />
      <ClientsSection />
      <LatestInsights />
      <ContactFormSection />
    </main>
  )
}

