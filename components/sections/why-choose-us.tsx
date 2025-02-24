"use client"

import { useEffect, useRef, useState } from "react"
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

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 overflow-hidden">
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

        {/* Rest of the sections... */}
        {/* Add the differentiators, process steps, and team highlights sections here */}
      </div>
    </section>
  )
}

export default WhyChooseUs

