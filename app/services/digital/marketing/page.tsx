"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, BarChart2, Search, Share2, TrendingUp, Target, PieChart, Users, Zap } from "lucide-react"
import PageTemplate from "@/components/templates/page-template"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const serviceCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  hover: { 
    y: -5,
    boxShadow: "0 10px 30px -15px rgba(0, 184, 255, 0.2)",
    transition: { duration: 0.2 }
  }
}

export default function DigitalMarketingPage() {
  const [activeTab, setActiveTab] = useState("all")

  const services = [
    {
      id: "seo",
      icon: Search,
      title: "Search Engine Optimization",
      description: "Boost your online visibility with our data-driven SEO strategies. We optimize your website to rank higher in search results, driving organic traffic and increasing conversions.",
      category: "organic"
    },
    {
      id: "ppc",
      icon: Target,
      title: "Pay-Per-Click Advertising",
      description: "Maximize your ROI with targeted PPC campaigns. Our experts create and manage high-performing ads across Google, Bing, and social platforms to drive immediate results.",
      category: "paid"
    },
    {
      id: "social",
      icon: Share2,
      title: "Social Media Marketing",
      description: "Build brand awareness and engage with your audience through strategic social media campaigns. We create compelling content and manage your presence across all relevant platforms.",
      category: "organic"
    },
    {
      id: "analytics",
      icon: BarChart2,
      title: "Marketing Analytics",
      description: "Make data-driven decisions with comprehensive analytics and reporting. We track key metrics, analyze performance, and provide actionable insights to optimize your marketing efforts.",
      category: "analytics"
    },
    {
      id: "content",
      icon: Zap,
      title: "Content Marketing",
      description: "Tell your brand story with engaging, valuable content. Our content strategies drive engagement, establish authority, and nurture leads through the marketing funnel.",
      category: "organic"
    },
    {
      id: "growth",
      icon: TrendingUp,
      title: "Growth Marketing",
      description: "Accelerate your business growth with our integrated marketing approach. We identify opportunities, implement rapid experiments, and scale successful strategies.",
      category: "strategy"
    },
  ]

  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(service => service.category === activeTab)

  return (
    <PageTemplate 
      title="Digital Marketing Services"
      subtitle="Drive growth with data-driven marketing strategies"
    >
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mb-16"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0021a7]/80 to-[#00b8ff]/30 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="w-full h-full bg-[url('/images/pattern-grid.svg')] bg-repeat"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <Heading level={2} className="mb-4 text-3xl md:text-4xl">
              Transform Your Digital Presence
            </Heading>
            <p className="text-lg text-white/80 mb-6">
              In today's digital landscape, effective marketing is essential for business growth. Our comprehensive digital marketing services help you connect with your audience, drive engagement, and achieve measurable results.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#0021a7] hover:bg-white/90">
                Get a Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services Filter */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mb-12"
      >
        <div className="flex flex-wrap gap-2 mb-8">
          {["all", "organic", "paid", "analytics", "strategy"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white"
                  : "bg-white/5 hover:bg-white/10 text-white/70"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Services Grid */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16"
      >
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            variants={serviceCardVariants}
            whileHover="hover"
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20">
                <service.icon className="h-6 w-6 text-[#00b8ff]" />
              </div>
              <h3 className="text-xl font-bold">{service.title}</h3>
            </div>
            
            <p className="text-white/70 mb-4">{service.description}</p>
            
            <div className="flex items-center text-[#00b8ff] font-medium group-hover:translate-x-1 transition-transform">
              Learn more <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Process Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <Heading level={2} className="mb-4">Our Marketing Process</Heading>
          <p className="text-white/70 max-w-2xl mx-auto">
            We follow a proven methodology to deliver exceptional results for our clients. Our data-driven approach ensures that every campaign is strategically designed, executed, and optimized.
          </p>
        </div>

        <div className="relative">
          {/* Process Timeline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00b8ff] to-[#0021a7]/30 hidden md:block"></div>
          
          <div className="space-y-12 md:space-y-0">
            {[
              {
                step: "01",
                title: "Discovery & Analysis",
                description: "We begin by understanding your business goals, target audience, and current marketing performance. Our team conducts comprehensive research to identify opportunities and challenges."
              },
              {
                step: "02",
                title: "Strategy Development",
                description: "Based on our findings, we create a customized marketing strategy aligned with your objectives. This includes channel selection, messaging, targeting, and performance metrics."
              },
              {
                step: "03",
                title: "Implementation",
                description: "Our experts execute the strategy with precision, launching campaigns across selected channels. We ensure all elements work together cohesively to maximize impact."
              },
              {
                step: "04",
                title: "Monitoring & Optimization",
                description: "We continuously track performance and make data-driven adjustments to improve results. Our agile approach allows us to respond quickly to changing market conditions."
              },
              {
                step: "05",
                title: "Reporting & Analysis",
                description: "You'll receive regular, transparent reports on campaign performance. We analyze results, extract insights, and provide recommendations for ongoing improvement."
              }
            ].map((process, index) => (
              <motion.div 
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative md:grid md:grid-cols-2 md:gap-8 items-center ${
                  index % 2 === 0 ? "md:text-right" : ""
                }`}
              >
                <div className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative">
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] rounded-full text-sm font-bold">
                      {process.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3 mt-2">{process.title}</h3>
                    <p className="text-white/70">{process.description}</p>
                  </div>
                </div>
                
                <div className={`hidden md:block ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] flex items-center justify-center z-10">
                      <span className="font-bold">{process.step}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0021a7] to-[#00b8ff] opacity-90"></div>
          
          <div className="relative z-10 p-8 md:p-12 text-center">
            <Heading level={2} className="mb-4">Ready to Elevate Your Digital Marketing?</Heading>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Partner with us to develop a customized digital marketing strategy that drives real business results. Our team of experts is ready to help you achieve your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-[#0021a7] hover:bg-white/90">
                Schedule a Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Our Portfolio
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </PageTemplate>
  )
}
