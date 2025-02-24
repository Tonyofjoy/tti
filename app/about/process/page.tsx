"use client"

import PageTemplate from "@/components/templates/page-template"
import { motion } from "framer-motion"
import { HeartHandshake, Code2, Shield, Rocket } from "lucide-react"

const processSteps = [
  {
    icon: HeartHandshake,
    title: "Discovery & Planning",
    description: "We begin with a deep dive into your business needs and objectives",
    details: [
      "Requirements gathering and analysis",
      "Strategic planning and roadmap creation",
      "Technology stack evaluation",
      "Project scope definition"
    ]
  },
  {
    icon: Code2,
    title: "Design & Development",
    description: "Our expert team crafts tailored solutions using cutting-edge technologies",
    details: [
      "Architecture design and planning",
      "UI/UX design and prototyping",
      "Agile development methodology",
      "Regular progress updates"
    ]
  },
  {
    icon: Shield,
    title: "Testing & Quality Assurance",
    description: "Rigorous testing ensures your solution meets the highest standards",
    details: [
      "Comprehensive testing strategy",
      "Performance optimization",
      "Security testing and validation",
      "User acceptance testing"
    ]
  },
  {
    icon: Rocket,
    title: "Deployment & Support",
    description: "Smooth deployment followed by dedicated ongoing support",
    details: [
      "Deployment planning and execution",
      "Post-launch monitoring",
      "Continuous maintenance",
      "24/7 technical support"
    ]
  },
]

export default function ProcessPage() {
  return (
    <PageTemplate 
      title="Our Process"
      subtitle="How we deliver exceptional results"
    >
      {/* Process Steps Overview */}
      <div className="mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="h-full p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm relative z-10">
                <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7] mb-4">
                  <step.icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                <p className="text-white/60">{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#00b8ff] to-[#0021a7]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Process Steps */}
      <div className="space-y-12">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="grid md:grid-cols-2 gap-8 items-start"
          >
            <div>
              <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7] mb-4">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-white/70 mb-6">{step.description}</p>
            </div>
            <div className="space-y-4">
              {step.details.map((detail, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <p className="text-white/80">{detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </PageTemplate>
  )
}
