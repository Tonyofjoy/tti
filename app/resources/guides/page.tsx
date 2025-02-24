"use client"

import PageTemplate from "@/components/templates/page-template"
import { motion } from "framer-motion"
import { Code2, Database, Layout, Laptop, Layers, Palette, Server, Smartphone } from "lucide-react"

const techGuides = [
  {
    category: "Frontend Development",
    icon: Layout,
    technologies: [
      {
        name: "Next.js",
        description: "App Router architecture and server components",
        icon: Code2,
      },
      {
        name: "React & TypeScript",
        description: "Modern component patterns and type safety",
        icon: Code2,
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling and responsive design",
        icon: Palette,
      },
    ],
  },
  {
    category: "Backend Development",
    icon: Server,
    technologies: [
      {
        name: "Node.js & Express",
        description: "Scalable server-side applications",
        icon: Server,
      },
      {
        name: "Database Design",
        description: "SQL and NoSQL database architecture",
        icon: Database,
      },
      {
        name: "API Development",
        description: "RESTful and GraphQL API design",
        icon: Layers,
      },
    ],
  },
  {
    category: "Mobile Development",
    icon: Smartphone,
    technologies: [
      {
        name: "React Native",
        description: "Cross-platform mobile applications",
        icon: Smartphone,
      },
      {
        name: "Native Development",
        description: "iOS and Android platform specifics",
        icon: Laptop,
      },
      {
        name: "Mobile Architecture",
        description: "Best practices and performance optimization",
        icon: Layers,
      },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Server,
    technologies: [
      {
        name: "Cloud Services",
        description: "AWS, Azure, and GCP implementations",
        icon: Server,
      },
      {
        name: "CI/CD Pipelines",
        description: "Automated testing and deployment",
        icon: Layers,
      },
      {
        name: "Infrastructure",
        description: "Container orchestration and scaling",
        icon: Database,
      },
    ],
  },
]

export default function TechGuidesPage() {
  return (
    <PageTemplate 
      title="Technical Guides"
      subtitle="In-depth resources and best practices"
    >
      <div className="space-y-24">
        {techGuides.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7]">
                <category.icon className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">{category.category}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.technologies.map((tech, techIndex) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (techIndex * 0.1) }}
                >
                  <div className="h-full p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20 mb-4">
                      <tech.icon className="h-6 w-6 text-[#00b8ff]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{tech.name}</h3>
                    <p className="text-white/60">{tech.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Additional Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-12 border-t border-white/10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <Code2 className="h-5 w-5 text-[#00b8ff]" />
            <span className="text-sm">Updated with latest tech standards</span>
          </div>
        </motion.div>
      </div>
    </PageTemplate>
  )
}
