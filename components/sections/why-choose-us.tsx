"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { Award, Clock, Code2, HeartHandshake, LineChart, Rocket, Shield, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Animated counter component
const Counter = ({ value, title, description }: { value: number; title: string; description: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const count = useMotionValue(0)
  const rounded = useSpring(count, { stiffness: 200, damping: 20 })

  useEffect(() => {
    if (inView) {
      count.set(value)
    }
  }, [count, inView, value])

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString()
      }
    })
  }, [rounded])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="mb-2 text-4xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
        <span ref={ref}>{value}</span>
        <span className="text-2xl">+</span>
      </div>
      <div className="text-lg font-semibold mb-1">{title}</div>
      <p className="text-sm text-white/60">{description}</p>
    </motion.div>
  )
}

const processSteps = [
  {
    icon: HeartHandshake,
    title: "Discovery & Planning",
    description: "We begin with a deep dive into your business needs and objectives",
  },
  {
    icon: Code2,
    title: "Design & Development",
    description: "Our expert team crafts tailored solutions using cutting-edge technologies",
  },
  {
    icon: Shield,
    title: "Testing & Quality Assurance",
    description: "Rigorous testing ensures your solution meets the highest standards",
  },
  {
    icon: Rocket,
    title: "Deployment & Support",
    description: "Smooth deployment followed by dedicated ongoing support",
  },
]

const differentiators = [
  {
    icon: Clock,
    title: "Rapid Delivery",
    description: "We deliver solutions faster without compromising on quality",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Seasoned professionals with deep industry expertise",
  },
  {
    icon: LineChart,
    title: "Proven Results",
    description: "Track record of delivering exceptional business outcomes",
  },
  {
    icon: Zap,
    title: "Innovation Focus",
    description: "Always at the forefront of technological advancement",
  },
]

const teamHighlights = [
  {
    image: "/images/header.png",
    name: "John Smith",
    role: "Technical Director",
    expertise: ["Cloud Architecture", "System Design"],
  },
  {
    image: "/images/header.png",
    name: "Sarah Johnson",
    role: "AI Lead",
    expertise: ["Machine Learning", "Data Science"],
  },
  {
    image: "/images/header.png",
    name: "Michael Chen",
    role: "Solutions Architect",
    expertise: ["Enterprise Solutions", "Integration"],
  },
  {
    image: "/images/header.png",
    name: "Emma Williams",
    role: "Development Lead",
    expertise: ["Full Stack", "Mobile Development"],
  },
]

// Add reference blocks data
const referenceBlocks = [
  {
    title: "Enterprise Solutions",
    description: "Custom software solutions for large-scale businesses",
    stats: "50+ Enterprise Clients",
    image: "/images/enterprise.jpg"
  },
  {
    title: "Cloud Infrastructure",
    description: "Scalable and secure cloud architecture solutions",
    stats: "99.9% Uptime",
    image: "/images/cloud.jpg"
  },
  {
    title: "Digital Transformation",
    description: "End-to-end digital transformation services",
    stats: "200+ Projects",
    image: "/images/digital.jpg"
  },
  {
    title: "AI & Machine Learning",
    description: "Advanced AI solutions for business automation",
    stats: "30+ AI Models",
    image: "/images/ai.jpg"
  }
]

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 overflow-hidden pb-16">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-lg text-white/70">
              Experience excellence in technology solutions with a partner you can trust
            </p>
          </motion.div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          <Counter value={150} title="Projects Delivered" description="Successful implementations" />
          <Counter value={98} title="Client Satisfaction" description="Percentage of happy clients" />
          <Counter value={12} title="Years Experience" description="Industry expertise" />
          <Counter value={50} title="Team Members" description="Dedicated professionals" />
        </div>

        {/* Key Differentiators */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7] mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-center mb-12"
          >
            Our Process
          </motion.h3>
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

        {/* Awards and Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <Award className="h-5 w-5 text-[#00b8ff]" />
            <span className="text-sm">Recognized as Top Technology Innovator 2024</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs

