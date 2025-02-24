"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight, Code2, Database, Brain, Cloud, Rocket } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ServiceCard {
  icon: React.ReactNode
  title: string
  description: string
  featured?: boolean
  gradient: {
    from: string
    to: string
  }
}

const services: ServiceCard[] = [
  {
    icon: <Rocket className="size-6" />,
    title: "Digital Transformation",
    description:
      "Navigate your organization's complete digital evolution with our comprehensive strategy and execution",
    featured: true,
    gradient: {
      from: "#00b8ff",
      to: "#0021a7",
    },
  },
  {
    icon: <Code2 className="size-6" />,
    title: "Application Development & Modernization",
    description:
      "Transform legacy systems and build cutting-edge applications using modern architectures and technologies",
    gradient: {
      from: "#00b8ff",
      to: "#0052cc",
    },
  },
  {
    icon: <Database className="size-6" />,
    title: "Data Services",
    description: "Unlock the power of your data with advanced analytics, visualization, and data engineering solutions",
    gradient: {
      from: "#00b8ff",
      to: "#00d5bd",
    },
  },
  {
    icon: <Brain className="size-6" />,
    title: "AI & Automation",
    description:
      "Leverage artificial intelligence and machine learning to automate processes and gain competitive advantages",
    gradient: {
      from: "#00b8ff",
      to: "#9400d3",
    },
  },
  {
    icon: <Cloud className="size-6" />,
    title: "Cloud Services",
    description: "Scale your infrastructure with secure, reliable, and cost-effective cloud solutions and migrations",
    gradient: {
      from: "#00b8ff",
      to: "#4169e1",
    },
  },
]

const ServiceCards = () => {
  return (
    <section className="w-full py-24">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.h2
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>
          <motion.p
            className="text-white/80 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Comprehensive technology solutions to drive your business forward
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "group relative h-full overflow-hidden rounded-xl border border-[#0021a7]/30 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:border-[#00b8ff] hover:-translate-y-1",
                  service.featured &&
                    "md:col-span-2 lg:col-span-1 border-[#00b8ff]/50 shadow-[0_0_15px_rgba(0,184,255,0.3)]",
                )}
              >
                <motion.div
                  className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    service.featured && "opacity-50",
                  )}
                  style={{
                    background: `linear-gradient(to bottom right, ${service.gradient.from}10, ${service.gradient.to}10)`,
                  }}
                  initial={false}
                />

                <div className="relative space-y-4 p-6 select-none">
                  {/* Icon with glow effect */}
                  <div className="relative inline-flex">
                    <div
                      className={cn(
                        "rounded-xl p-3 text-white transition-transform duration-300",
                        service.featured && "scale-110",
                        "group-hover:scale-110",
                      )}
                      style={{
                        background: `linear-gradient(to bottom right, ${service.gradient.from}, ${service.gradient.to})`,
                      }}
                    >
                      {service.icon}
                    </div>
                    <div
                      className={cn(
                        "absolute inset-0 rounded-xl opacity-50 blur-lg transition-all duration-300 group-hover:opacity-100",
                        service.featured && "opacity-75",
                      )}
                      style={{
                        background: `linear-gradient(to bottom right, ${service.gradient.from}, ${service.gradient.to})`,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="text-white/80">{service.description}</p>

                  {/* Learn More Link */}
                  <motion.div
                    className="inline-flex items-center gap-2 cursor-pointer"
                    style={{ color: service.gradient.from }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <span className="font-medium">Learn More</span>
                    <ArrowRight className="size-4" />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceCards

