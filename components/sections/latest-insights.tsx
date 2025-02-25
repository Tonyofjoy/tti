"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, Download, FileText, Play, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"

const blogPosts = [
  {
    title: "The Future of AI in Enterprise Solutions",
    excerpt: "Explore how artificial intelligence is reshaping business operations and decision-making processes.",
    category: "Artificial Intelligence",
    readTime: "5 min read",
    date: "Feb 20, 2024",
    image: "/images/header.png", // Using header.png as placeholder
    featured: true,
  },
  {
    title: "Cloud Migration Best Practices",
    excerpt: "Essential strategies for a successful cloud migration journey.",
    category: "Cloud Computing",
    readTime: "4 min read",
    date: "Feb 18, 2024",
    image: "/images/header.png", // Using header.png as placeholder
  },
  {
    title: "Securing Your Digital Infrastructure",
    excerpt: "Key considerations for maintaining robust cybersecurity measures.",
    category: "Security",
    readTime: "6 min read",
    date: "Feb 15, 2024",
    image: "/images/header.png", // Using header.png as placeholder
  },
]

const resources = [
  {
    title: "2024 Technology Trends Report",
    description: "Comprehensive analysis of emerging technology trends and their business impact.",
    downloadSize: "2.5 MB",
    format: "PDF",
    image: "/images/header.png",
  },
  {
    title: "Digital Transformation Playbook",
    description: "Step-by-step guide to successful digital transformation initiatives.",
    downloadSize: "3.8 MB",
    format: "PDF",
    image: "/images/header.png",
  },
  {
    title: "AI Implementation Guide",
    description: "Best practices and strategies for implementing AI in your business.",
    downloadSize: "4.2 MB",
    format: "PDF",
    image: "/images/header.png",
  },
  {
    title: "Cloud Migration Handbook",
    description: "Complete guide to planning and executing cloud migration projects.",
    downloadSize: "3.5 MB",
    format: "PDF",
    image: "/images/header.png",
  },
]

const webinars = [
  {
    title: "AI Implementation Strategies",
    date: "March 5, 2024",
    time: "2:00 PM EST",
    speaker: "Dr. Sarah Johnson",
    role: "AI Research Director",
  },
  {
    title: "Cloud Security Best Practices",
    date: "March 12, 2024",
    time: "11:00 AM EST",
    speaker: "Michael Chen",
    role: "Security Architect",
  },
]

const LatestInsights = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Only render the form after client-side hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubscribed(true)
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Latest Insights
            </h2>
            <p className="text-lg text-white/70">Stay ahead with our latest thoughts on technology and innovation</p>
          </motion.div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-24">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn("group", post.featured && "lg:col-span-2 lg:row-span-2")}
            >
              <div
                className={cn(
                  "h-full rounded-xl border border-white/10",
                  "bg-white/5 backdrop-blur-sm overflow-hidden",
                  "transition-all duration-300 hover:border-[#00b8ff]/30",
                )}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "font-semibold mb-3 group-hover:text-[#00b8ff] transition-colors",
                      post.featured ? "text-2xl" : "text-xl",
                    )}
                  >
                    {post.title}
                  </h3>
                  <p className="text-white/60 mb-4">{post.excerpt}</p>
                  <Button variant="ghost" className="group/button px-0 hover:bg-transparent">
                    <span className="text-[#00b8ff] group-hover/button:mr-2 transition-all">Read More</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover/button:opacity-100 group-hover/button:ml-0 transition-all" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid gap-6 mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold mb-6">Free Resources</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {resources.map((resource) => (
                <div
                  key={resource.title}
                  className="flex flex-col p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#00b8ff]/30 transition-colors"
                >
                  <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-semibold mb-2">{resource.title}</h4>
                  <p className="text-sm text-white/60 mb-4 flex-grow">{resource.description}</p>
                  <div className="flex items-center justify-between text-sm text-white/40">
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {resource.format}
                    </span>
                    <Button variant="ghost" size="sm" className="text-[#00b8ff] hover:text-[#00b8ff]/80">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LatestInsights

