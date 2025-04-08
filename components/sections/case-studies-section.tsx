"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Globe, LineChart, Shield, Smartphone, Cloud, Monitor } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Case studies data - simplified version from the case studies page
const featuredCaseStudies = [
  {
    id: "enterprise-digital-transformation",
    title: "Enterprise Digital Transformation",
    description: "Complete digital overhaul for Fortune 500 company with cloud migration and process automation",
    image: "/Website_image/Website/Trang chủ/366x192/Enterprise.png",
    category: "Enterprise Solutions",
    technologies: ["Cloud Architecture", "Process Automation", "Microservices", "DevOps"],
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "ai-powered-analytics",
    title: "AI-Powered Analytics Platform",
    description: "Machine learning solution for data-driven decisions with real-time insights and predictive modeling",
    image: "/Website_image/Website/Trang chủ/366x192/AI-Powered.png",
    category: "AI & Analytics",
    technologies: ["Machine Learning", "Big Data", "Real-time Analytics", "TensorFlow"],
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "mobile-commerce-platform",
    title: "Mobile Commerce Platform",
    description: "Cross-platform retail solution with AR features and seamless payment processing",
    image: "/Website_image/Website/Trang chủ/366x192/Mobile Commerce.png",
    category: "Mobile Development",
    technologies: ["React Native", "AR Kit", "Payment Integration", "GraphQL"],
    color: "from-orange-500 to-red-600"
  }
];

// Function to render tech badge - matching the case studies page
function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10 hover:bg-white/20 transition-colors">
      {name}
    </span>
  );
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const CaseStudiesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      
      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
            Featured Work
          </h2>
          <p className="text-lg text-white/70">
            Discover how we've transformed businesses through innovative technology solutions. 
            These success stories showcase our expertise and approach to driving growth and efficiency.
          </p>
        </motion.div>

        {/* Featured Case Studies - Matching case studies page layout */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {featuredCaseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={fadeIn}
              className="group flex flex-col overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${study.color} opacity-40`}></div>
                
                {/* Background image */}
                <Image 
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover object-center opacity-60 mix-blend-overlay"
                />
                
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/30 text-white">
                    {study.category}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00b8ff] transition-colors">
                  {study.title}
                </h3>
                <p className="text-white/70 mb-4 line-clamp-2">
                  {study.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {study.technologies.slice(0, 3).map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                    {study.technologies.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/5 text-white/60">
                        +{study.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Link 
                    href={`/work/case-studies/${study.id}`}
                    className="inline-flex items-center text-[#00b8ff] hover:text-white transition-colors"
                  >
                    View Case Study <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center"
        >
          <Link
            href="/work/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white font-medium hover:opacity-90 transition-opacity"
          >
            View All Case Studies <ArrowRight className="w-5 h-5" />
          </Link>
          
          <p className="mt-4 text-white/60 text-sm max-w-lg mx-auto">
            Explore our comprehensive portfolio of successful projects across various industries and technologies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CaseStudiesSection

