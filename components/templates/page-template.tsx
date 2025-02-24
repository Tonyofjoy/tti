"use client"

import { motion } from "framer-motion"

interface PageTemplateProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function PageTemplate({ title, subtitle, children }: PageTemplateProps) {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-white/70">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </div>
  )
} 