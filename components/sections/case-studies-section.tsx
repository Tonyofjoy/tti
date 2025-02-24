"use client"

import { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Case studies data
const caseStudies = [
  {
    id: 1,
    title: "Digital Transformation Journey",
    client: "Global Retail Corp",
    category: "Digital Transformation",
    description: "Complete digital overhaul leading to significant business growth",
    metrics: [
      { label: "Revenue Growth", value: "150%" },
      { label: "Customer Engagement", value: "3x" },
      { label: "Operational Efficiency", value: "60%" },
    ],
    image: "/images/header.png",
    link: "/work/case-studies/global-retail-corp",
  },
  {
    id: 2,
    title: "AI-Powered Customer Service",
    client: "TechServe Solutions",
    category: "AI & Automation",
    description: "Implementing conversational AI to revolutionize customer support",
    metrics: [
      { label: "Response Time", value: "-85%" },
      { label: "Customer Satisfaction", value: "95%" },
      { label: "Cost Reduction", value: "40%" },
    ],
    image: "/images/header.png",
    link: "/work/case-studies/techserve-solutions",
  },
  {
    id: 3,
    title: "Cloud Migration & Modernization",
    client: "FinanceHub",
    category: "Cloud Services",
    description: "Seamless transition to cloud infrastructure with zero downtime",
    metrics: [
      { label: "System Uptime", value: "99.99%" },
      { label: "Processing Speed", value: "5x" },
      { label: "Cost Savings", value: "45%" },
    ],
    image: "/images/header.png",
    link: "/work/case-studies/financehub",
  },
  {
    id: 4,
    title: "Enterprise Mobile Platform",
    client: "HealthTech Plus",
    category: "Application Development",
    description: "Cross-platform mobile solution for healthcare providers",
    metrics: [
      { label: "User Adoption", value: "92%" },
      { label: "Time Saved", value: "65%" },
      { label: "ROI", value: "280%" },
    ],
    image: "/images/header.png",
    link: "/work/case-studies/healthtech-plus",
  },
]

// Image component with error handling
const CaseStudyImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
    </div>
  )
}

const CaseStudiesSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Featured Work
            </h2>
            <p className="text-lg text-white/70">
              Discover how we've helped businesses transform and grow through innovative technology solutions.
            </p>
          </motion.div>

          {/* Carousel Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={scrollPrev}
              className={cn(
                "p-3 rounded-lg border border-white/10",
                "hover:bg-white/5 transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
              )}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className={cn(
                "p-3 rounded-lg border border-white/10",
                "hover:bg-white/5 transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
              )}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden -mx-4" ref={emblaRef}>
          <div className="flex">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-[0_0_100%] min-w-0 px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <Link href={study.link} className="block group">
                  <CaseStudyImage src={study.image} alt={study.title} />

                  <h3 className="text-xl font-semibold mb-2 mt-4 group-hover:text-[#00b8ff] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-white/70 mb-2">{study.client}</p>
                  <p className="text-white/50 text-sm mb-6">{study.description}</p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {study.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="text-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                      >
                        <div className="text-xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                          {metric.value}
                        </div>
                        <div className="text-sm text-white/50 mt-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/work/case-studies"
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
              "bg-white/5 hover:bg-white/10 border border-white/10",
              "transition-colors",
            )}
          >
            View All Case Studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CaseStudiesSection

