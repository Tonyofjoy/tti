"use client"

import { motion } from "framer-motion"
import {
  Cloud,
  Database,
  Code2,
  Brain,
  Layers,
  Shield,
  Smartphone,
  Globe,
  Cpu,
  Box,
  BarChart,
  PenTool,
} from "lucide-react"
import { cn } from "@/lib/utils"

const technologies = [
  {
    category: "Cloud Platforms",
    icon: Cloud,
    description: "Enterprise-grade cloud infrastructure and services",
    items: [
      { name: "AWS", level: "Expert" },
      { name: "Azure", level: "Expert" },
      { name: "Google Cloud", level: "Advanced" },
      { name: "Digital Ocean", level: "Advanced" },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    description: "Modern database solutions for every use case",
    items: [
      { name: "PostgreSQL", level: "Expert" },
      { name: "MongoDB", level: "Expert" },
      { name: "Redis", level: "Advanced" },
      { name: "Elasticsearch", level: "Advanced" },
    ],
  },
  {
    category: "Frontend Development",
    icon: Code2,
    description: "Cutting-edge web technologies and frameworks",
    items: [
      { name: "React", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: Brain,
    description: "Advanced AI solutions and implementations",
    items: [
      { name: "TensorFlow", level: "Advanced" },
      { name: "PyTorch", level: "Advanced" },
      { name: "OpenAI", level: "Expert" },
      { name: "Langchain", level: "Advanced" },
    ],
  },
  {
    category: "Backend Development",
    icon: Layers,
    description: "Robust server-side technologies and frameworks",
    items: [
      { name: "Node.js", level: "Expert" },
      { name: "Python", level: "Expert" },
      { name: "Go", level: "Advanced" },
      { name: "Java", level: "Advanced" },
    ],
  },
  {
    category: "Security",
    icon: Shield,
    description: "Enterprise-grade security implementations",
    items: [
      { name: "OAuth 2.0", level: "Expert" },
      { name: "JWT", level: "Expert" },
      { name: "HTTPS/SSL", level: "Expert" },
      { name: "WAF", level: "Advanced" },
    ],
  },
  {
    category: "Mobile Development",
    icon: Smartphone,
    description: "Cross-platform mobile solutions",
    items: [
      { name: "React Native", level: "Expert" },
      { name: "Flutter", level: "Advanced" },
      { name: "iOS", level: "Advanced" },
      { name: "Android", level: "Advanced" },
    ],
  },
  {
    category: "DevOps",
    icon: Globe,
    description: "Modern deployment and automation tools",
    items: [
      { name: "Docker", level: "Expert" },
      { name: "Kubernetes", level: "Expert" },
      { name: "CI/CD", level: "Expert" },
      { name: "Terraform", level: "Advanced" },
    ],
  },
  {
    category: "API Development",
    icon: Cpu,
    description: "RESTful and GraphQL API implementations",
    items: [
      { name: "REST", level: "Expert" },
      { name: "GraphQL", level: "Expert" },
      { name: "WebSocket", level: "Advanced" },
      { name: "gRPC", level: "Advanced" },
    ],
  },
  {
    category: "Testing",
    icon: Box,
    description: "Comprehensive testing methodologies",
    items: [
      { name: "Jest", level: "Expert" },
      { name: "Cypress", level: "Expert" },
      { name: "Playwright", level: "Advanced" },
      { name: "Selenium", level: "Advanced" },
    ],
  },
  {
    category: "Analytics",
    icon: BarChart,
    description: "Data analytics and visualization tools",
    items: [
      { name: "Tableau", level: "Advanced" },
      { name: "Power BI", level: "Advanced" },
      { name: "Google Analytics", level: "Expert" },
      { name: "Mixpanel", level: "Advanced" },
    ],
  },
  {
    category: "Design Tools",
    icon: PenTool,
    description: "UI/UX design and prototyping tools",
    items: [
      { name: "Figma", level: "Expert" },
      { name: "Adobe XD", level: "Advanced" },
      { name: "Sketch", level: "Advanced" },
      { name: "Photoshop", level: "Advanced" },
    ],
  },
]

const TechnologyCard = ({ category, icon: Icon, description, items }: (typeof technologies)[0]) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <div
        className={cn(
          "h-full rounded-xl border border-white/10 bg-white/5",
          "p-6 backdrop-blur-sm transition-all duration-300",
          "hover:bg-white/10 hover:border-[#00b8ff]/30",
        )}
      >
        {/* Icon with gradient background */}
        <div className="mb-4 inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7]">
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="mb-2 text-lg font-semibold">{category}</h3>
        <p className="mb-4 text-sm text-white/60">{description}</p>

        {/* Technology Items */}
        <div className="grid grid-cols-2 gap-2">
          {items.map((item) => (
            <div
              key={item.name}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm",
                "border border-white/10 bg-white/5",
                "transition-colors duration-300",
                "group-hover:border-[#00b8ff]/20",
              )}
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-white/40">{item.level}</div>
            </div>
          ))}
        </div>

        {/* Hover Effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
            "bg-gradient-to-br from-[#00b8ff]/10 to-[#0021a7]/10",
            "group-hover:opacity-100",
          )}
        />
      </div>
    </motion.div>
  )
}

const TechnologyStack = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent"
          >
            Technology Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70"
          >
            Our expertise spans across modern technologies, enabling us to deliver cutting-edge solutions for any
            challenge.
          </motion.p>
        </div>

        {/* Technology Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {technologies.map((tech) => (
            <TechnologyCard key={tech.category} {...tech} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologyStack

