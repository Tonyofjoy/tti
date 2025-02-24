"use client"

import PageTemplate from "@/components/templates/page-template"
import { motion } from "framer-motion"
import { ArrowRight, Code2, Database, Globe, LineChart, Rocket, Server, Shield, Smartphone } from "lucide-react"
import Image from "next/image"

const caseStudies = [
  {
    title: "Enterprise Digital Transformation",
    description: "Complete digital overhaul for Fortune 500 company",
    image: "/images/header.png",
    category: "Enterprise Solutions",
    stats: {
      improvement: "200% Efficiency Increase",
      timeframe: "12 Months",
      impact: "$2M Cost Savings"
    },
    technologies: ["Cloud Architecture", "AI Integration", "Process Automation"],
    icon: Globe
  },
  {
    title: "AI-Powered Analytics Platform",
    description: "Machine learning solution for data-driven decisions",
    image: "/images/header.png",
    category: "AI & Analytics",
    stats: {
      improvement: "85% Faster Analysis",
      timeframe: "6 Months",
      impact: "3x ROI"
    },
    technologies: ["Machine Learning", "Big Data", "Real-time Analytics"],
    icon: LineChart
  },
  {
    title: "Secure Banking Infrastructure",
    description: "Modern banking platform with enhanced security",
    image: "/images/header.png",
    category: "FinTech",
    stats: {
      improvement: "99.99% Uptime",
      timeframe: "18 Months",
      impact: "Zero Security Breaches"
    },
    technologies: ["Blockchain", "Cloud Security", "API Integration"],
    icon: Shield
  },
  {
    title: "Mobile Commerce Platform",
    description: "Cross-platform retail solution with AR features",
    image: "/images/header.png",
    category: "Mobile Development",
    stats: {
      improvement: "150% User Engagement",
      timeframe: "9 Months",
      impact: "2M+ Downloads"
    },
    technologies: ["React Native", "AR Kit", "Payment Integration"],
    icon: Smartphone
  }
]

export default function CaseStudiesPage() {
  return (
    <PageTemplate 
      title="Case Studies"
      subtitle="Success stories and implementation details"
    >
      <div className="space-y-24">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Section */}
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="inline-flex rounded-lg p-2 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20">
                      <study.icon className="h-5 w-5 text-[#00b8ff]" />
                    </div>
                    <span className="text-sm text-[#00b8ff]">{study.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                  <p className="text-white/70">{study.description}</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(study.stats).map(([key, value]) => (
                    <div key={key} className="p-4 rounded-lg border border-white/10 bg-white/5">
                      <div className="text-lg font-semibold text-[#00b8ff]">{value}</div>
                      <div className="text-sm text-white/60">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Details Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-[#00b8ff] to-[#0021a7]"
                >
                  View Case Study
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-12 border-t border-white/10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <Rocket className="h-5 w-5 text-[#00b8ff]" />
            <span className="text-sm">More success stories coming soon</span>
          </div>
        </motion.div>
      </div>
    </PageTemplate>
  )
}
