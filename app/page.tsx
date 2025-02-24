import HeroSection from "@/components/sections/hero-section"
import ServiceCards from "@/components/sections/service-cards"
import CaseStudiesSection from "@/components/sections/case-studies-section"
import TechnologyStack from "@/components/sections/technology-stack"
import WhyChooseUs from "@/components/sections/why-choose-us"
import ClientsLogoCarousel from "@/components/sections/clients-logo-carousel"
import LatestInsights from "@/components/sections/latest-insights"
import SplineTestSection from "@/components/sections/spline-test-section"

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ServiceCards />
      <CaseStudiesSection />
      <TechnologyStack />
      <WhyChooseUs />
      <SplineTestSection />
      <ClientsLogoCarousel />
      <LatestInsights />
    </main>
  )
}

