"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Globe, LineChart, Shield, Smartphone, Cloud, Monitor } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Case studies data using real case studies from the case studies page
const featuredCaseStudies = [
  {
    id: "enterprise-digital-transformation",
    title: "Enterprise Digital Transformation",
    client: "Fortune 500 Company",
    category: "Application Development",
    description: "Complete digital overhaul for Fortune 500 company with cloud migration and process automation, resulting in significant business growth.",
    image: "/images/header.png",
    link: "/work/case-studies/enterprise-digital-transformation",
    testimonial: "Tony Tech Insight delivered a transformation that redefined our business operations and competitive advantage.",
    results: "200% Efficiency Increase and $2M Cost Savings",
    color: "from-blue-500 to-indigo-600",
    icon: Globe,
    technologies: ["Cloud Architecture", "Process Automation", "Microservices", "DevOps"],
  },
  {
    id: "ai-powered-analytics",
    title: "AI-Powered Analytics Platform",
    client: "Data-Driven Enterprise",
    category: "AI & Automation",
    description: "Machine learning solution for data-driven decisions with real-time insights and predictive modeling to revolutionize business intelligence.",
    image: "/images/header.png",
    link: "/work/case-studies/ai-powered-analytics",
    testimonial: "The AI solution delivered insights and predictive capabilities beyond what we thought possible.",
    results: "85% Faster Analysis with 3x ROI",
    color: "from-purple-500 to-pink-600",
    icon: LineChart,
    technologies: ["Machine Learning", "Big Data", "Real-time Analytics", "TensorFlow"],
  },
  {
    id: "mobile-commerce-platform",
    title: "Mobile Commerce Platform",
    client: "Retail Innovation Co",
    category: "Marketing and Branding",
    description: "Cross-platform retail solution with AR features and seamless payment processing to enhance the customer shopping experience.",
    image: "/images/header.png",
    link: "/work/case-studies/mobile-commerce-platform",
    testimonial: "Our customers love the new shopping experience, and our engagement metrics prove it.",
    results: "150% User Engagement and 2M+ Downloads",
    color: "from-orange-500 to-red-600",
    icon: Smartphone,
    technologies: ["React Native", "AR Kit", "Payment Integration", "GraphQL"],
  },
];

// Function to render tech badge - matching the case studies page
function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10 hover:bg-white/20 transition-colors">
      {name}
    </span>
  );
}

const CaseStudiesSection = () => {
  const [activeStudy, setActiveStudy] = useState(0);
  
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      
      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredCaseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              onMouseEnter={() => setActiveStudy(index)}
            >
              {/* Icon header area with gradient background - like case studies page */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${study.color} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <study.icon className="h-16 w-16 text-white/90" />
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/30 text-white">
                    {study.category}
                  </span>
                </div>
                
                {/* Client name - subtle overlay at bottom of image area */}
                <div className="absolute bottom-4 right-4 z-10">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/30 text-white/90">
                    {study.client}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                {/* Title with hover effect */}
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00b8ff] transition-colors">
                  {study.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/70 mb-4 line-clamp-2">
                  {study.description}
                </p>
                
                {/* Result metrics - enhanced from original */}
                <div className="bg-white/5 rounded-lg p-3 mb-4 border border-white/10">
                  <div className="text-sm text-white/90 font-medium">
                    <span className="text-[#00b8ff]">Results:</span> {study.results}
                  </div>
                </div>
                
                {/* Testimonial - added element not in original */}
                <div className="mb-4 pl-3 border-l-2 border-[#00b8ff]/70 italic text-white/70 text-sm line-clamp-2">
                  "{study.testimonial}"
                </div>
                
                {/* Technology badges - matching case studies page */}
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
                
                {/* CTA Link - matching case studies page */}
                <div className="mt-auto">
                  <Link 
                    href={study.link}
                    className="inline-flex items-center text-[#00b8ff] hover:text-white transition-colors"
                  >
                    View Case Study <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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

