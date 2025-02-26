"use client"

import PageTemplate from "@/components/templates/page-template"
import { motion } from "framer-motion"
import { ArrowRight, Code2, Database, Globe, LineChart, Rocket, Server, Shield, Smartphone, Monitor, Cpu, Cloud } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

const caseStudies = [
  {
    id: "enterprise-digital-transformation",
    title: "Enterprise Digital Transformation",
    description: "Complete digital overhaul for Fortune 500 company with cloud migration and process automation",
    image: "/images/header.png",
    category: "Enterprise Solutions",
    stats: {
      improvement: "200% Efficiency Increase",
      timeframe: "12 Months",
      impact: "$2M Cost Savings"
    },
    technologies: ["Cloud Architecture", "AI Integration", "Process Automation", "Microservices", "DevOps"],
    icon: Globe,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "ai-powered-analytics",
    title: "AI-Powered Analytics Platform",
    description: "Machine learning solution for data-driven decisions with real-time insights and predictive modeling",
    image: "/images/header.png",
    category: "AI & Analytics",
    stats: {
      improvement: "85% Faster Analysis",
      timeframe: "6 Months",
      impact: "3x ROI"
    },
    technologies: ["Machine Learning", "Big Data", "Real-time Analytics", "Python", "TensorFlow"],
    icon: LineChart,
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "secure-banking-infrastructure",
    title: "Secure Banking Infrastructure",
    description: "Modern banking platform with enhanced security protocols and seamless API integrations",
    image: "/images/header.png",
    category: "FinTech",
    stats: {
      improvement: "99.99% Uptime",
      timeframe: "18 Months",
      impact: "Zero Security Breaches"
    },
    technologies: ["Blockchain", "Cloud Security", "API Integration", "OAuth 2.0", "Microservices"],
    icon: Shield,
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "mobile-commerce-platform",
    title: "Mobile Commerce Platform",
    description: "Cross-platform retail solution with AR features and seamless payment processing",
    image: "/images/header.png",
    category: "Mobile Development",
    stats: {
      improvement: "150% User Engagement",
      timeframe: "9 Months",
      impact: "2M+ Downloads"
    },
    technologies: ["React Native", "AR Kit", "Payment Integration", "GraphQL", "Firebase"],
    icon: Smartphone,
    color: "from-orange-500 to-red-600"
  },
  {
    id: "saas-application-modernization",
    title: "SaaS Application Modernization",
    description: "Legacy system transformation with modern architecture and improved developer experience",
    image: "/images/header.png",
    category: "Cloud Solutions",
    stats: {
      improvement: "3x Development Speed",
      timeframe: "8 Months",
      impact: "38% User Retention Increase"
    },
    technologies: ["React", "GraphQL", "Node.js", "Docker", "AWS"],
    icon: Cloud,
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: "ecommerce-platform-transformation",
    title: "E-commerce Platform Transformation",
    description: "Complete redesign with modern tech stack and optimized conversion funnel",
    image: "/images/header.png",
    category: "Web Development",
    stats: {
      improvement: "64% Conversion Rate",
      timeframe: "5 Months",
      impact: "82% Performance Boost"
    },
    technologies: ["Next.js", "Tailwind CSS", "Stripe", "Sanity.io", "Vercel"],
    icon: Monitor,
    color: "from-indigo-500 to-violet-600"
  }
];

// Function to render tech badge
function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10 hover:bg-white/20 transition-colors">
      {name}
    </span>
  );
}

export default function CaseStudiesPage() {
  return (
    <PageTemplate 
      title="Case Studies"
      subtitle="Success stories and implementation details"
    >
      {/* Hero Section */}
      <section className="mb-16">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0021a7]/80 to-[#00b8ff]/80 p-8 md:p-12"
        >
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Transforming Ideas into Digital Success Stories</h2>
            <p className="text-lg text-white/90 mb-6">
              Explore how we've helped businesses across industries achieve remarkable results through innovative technology solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white/20 text-white">
                <Shield className="h-4 w-4" /> Enterprise Solutions
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white/20 text-white">
                <Smartphone className="h-4 w-4" /> Mobile Development
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white/20 text-white">
                <LineChart className="h-4 w-4" /> AI & Analytics
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white/20 text-white">
                <Monitor className="h-4 w-4" /> Web Development
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Case Studies */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Featured Case Studies</h2>
            <p className="text-white/70 max-w-2xl">
              Discover how we've helped organizations overcome challenges and achieve their goals
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
            >
              Discuss Your Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={fadeIn}
              className="group flex flex-col overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
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
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="rounded-xl bg-gradient-to-r from-[#0021a7] to-[#00b8ff] p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-5 text-white">
            Ready to create your success story?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90 px-4">
            Let's discuss how our expertise can help you achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg bg-white text-[#0021a7] hover:bg-gray-100 transition-colors"
            >
              Schedule a Consultation
            </Link>
            <Link 
              href="/services" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTemplate>
  )
}
