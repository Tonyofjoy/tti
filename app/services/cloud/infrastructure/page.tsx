"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  ArrowRight,
  Server,
  Cloud,
  Database,
  Shield,
  BarChart,
  RefreshCw,
  Globe,
  Lock,
  Zap
} from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
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

export default function CloudInfrastructurePage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)
  const [gridPattern, setGridPattern] = useState<Array<{hasDot: boolean, opacity: number}>>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Generate grid pattern on client-side only
  useEffect(() => {
    const pattern = Array.from({ length: 64 }).map(() => ({
      hasDot: Math.random() > 0.8,
      opacity: Math.floor(Math.random() * 5) + 3
    }));
    setGridPattern(pattern);
  }, []);
  
  // Cloud solutions
  const cloudSolutions = [
    {
      title: "Cloud Migration",
      description: "Seamlessly transition your existing infrastructure to scalable cloud environments with minimal disruption.",
      icon: <Cloud className="h-8 w-8 text-[#00b8ff]" />
    },
    {
      title: "Infrastructure as Code",
      description: "Automate deployment and management of infrastructure using declarative templates and CI/CD pipelines.",
      icon: <Server className="h-8 w-8 text-[#00b8ff]" />
    },
    {
      title: "Managed Databases",
      description: "Highly available, scalable database solutions with automated backups and optimized performance.",
      icon: <Database className="h-8 w-8 text-[#00b8ff]" />
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade security protocols with continuous monitoring and compliance management.",
      icon: <Shield className="h-8 w-8 text-[#00b8ff]" />
    },
    {
      title: "Performance Optimization",
      description: "Fine-tune your cloud resources for optimal performance, cost-efficiency, and scalability.",
      icon: <BarChart className="h-8 w-8 text-[#00b8ff]" />
    },
    {
      title: "Disaster Recovery",
      description: "Robust backup and recovery solutions to ensure business continuity during unexpected disruptions.",
      icon: <RefreshCw className="h-8 w-8 text-[#00b8ff]" />
    }
  ]
  
  // Architecture components
  const architectureComponents = [
    {
      name: "Edge Network",
      description: "Global CDN with edge computing capabilities for low-latency content delivery",
      icon: <Globe className="h-6 w-6 text-[#00b8ff]" />
    },
    {
      name: "Security Layer",
      description: "DDoS protection, WAF, and identity management for comprehensive security",
      icon: <Lock className="h-6 w-6 text-[#00b8ff]" />
    },
    {
      name: "Compute Layer",
      description: "Auto-scaling container orchestration with serverless computing options",
      icon: <Server className="h-6 w-6 text-[#00b8ff]" />
    },
    {
      name: "Data Layer",
      description: "Multi-model database solutions with real-time analytics capabilities",
      icon: <Database className="h-6 w-6 text-[#00b8ff]" />
    }
  ]
  
  // Case studies
  const caseStudies = [
    {
      title: "E-commerce Platform Migration",
      description: "Migrated a high-traffic e-commerce platform to a microservices architecture, resulting in 40% cost reduction and 99.99% uptime.",
      image: "/images/team/duyen.jpg"
    },
    {
      title: "Financial Services Infrastructure",
      description: "Implemented a secure, compliant cloud infrastructure for a financial services firm, meeting strict regulatory requirements.",
      image: "/images/team/duyen.jpg"
    },
    {
      title: "Healthcare Data Platform",
      description: "Built a HIPAA-compliant data platform that scaled to handle millions of patient records with sub-second query performance.",
      image: "/images/team/duyen.jpg"
    }
  ]
  
  // Key features
  const keyFeatures = [
    {
      title: "High Performance",
      description: "Optimized infrastructure for maximum speed and reliability",
      icon: <Zap className="h-6 w-6 text-[#00b8ff]" />,
      metric: "10x",
      metricLabel: "faster performance"
    },
    {
      title: "Enterprise Security",
      description: "Multi-layered security with compliance built-in",
      icon: <Shield className="h-6 w-6 text-[#00b8ff]" />,
      metric: "99.9%",
      metricLabel: "threat protection"
    },
    {
      title: "Auto Scaling",
      description: "Dynamic resource allocation based on demand",
      icon: <RefreshCw className="h-6 w-6 text-[#00b8ff]" />,
      metric: "5x",
      metricLabel: "scaling capacity"
    },
    {
      title: "Cost Optimization",
      description: "Intelligent resource management to reduce waste",
      icon: <BarChart className="h-6 w-6 text-[#00b8ff]" />,
      metric: "40%",
      metricLabel: "cost reduction"
    }
  ]
  
  return (
    <main className="bg-[#0e1217] text-white min-h-screen">
      {/* Hero section */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#0021a7]/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0e1217] to-transparent"></div>
          
          {/* Abstract tech pattern background - client-side only rendering */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full grid grid-cols-8 grid-rows-8 opacity-30">
              {gridPattern.map((item, i) => (
                <div 
                  key={i}
                  className="border border-[#00b8ff]/20 flex items-center justify-center"
                >
                  {item.hasDot && (
                    <div className={`w-2 h-2 rounded-full bg-[#00b8ff] opacity-${item.opacity}0`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                    Cloud Infrastructure
                  </span> Services
                </h1>
                <p className="text-xl text-white/70 mb-8 max-w-2xl">
                  Build, deploy, and scale your applications with our enterprise-grade cloud infrastructure solutions. 
                  Optimize performance, enhance security, and reduce operational costs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#00b8ff]/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Solutions <ArrowRight className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium border border-white/10 hover:border-white/30 transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Case Studies
                  </motion.button>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Cloud Infrastructure Visualization */}
                <div className="w-full aspect-square max-w-md mx-auto relative">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#00b8ff]/30 animate-spin-slow"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-full border-2 border-[#00b8ff]/20 flex items-center justify-center">
                      <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-[#00b8ff]/10 to-[#0021a7]/20 backdrop-blur-xl flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
                          <Cloud className="h-8 w-8 text-white animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cloud Infrastructure Icons around the circle */}
                  {[Server, Database, Shield, Globe, Lock, Zap, BarChart, RefreshCw].map((Icon, index) => {
                    const angle = (index * 45) * (Math.PI / 180);
                    const radius = 45;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute w-10 h-10 rounded-full bg-[#0e1217] border border-[#00b8ff]/30 flex items-center justify-center shadow-lg"
                        style={{ 
                          left: `${x}%`, 
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
                      >
                        <Icon className="h-5 w-5 text-[#00b8ff]" />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Stats bar */}
          <motion.div 
            className="grid grid-cols-3 gap-6 mt-16" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">99.99%</p>
              <p className="text-white/70 text-sm">Uptime SLA</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">30-60%</p>
              <p className="text-white/70 text-sm">Cost Reduction</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">24/7</p>
              <p className="text-white/70 text-sm">Expert Support</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Services section */}
      <section className="py-20 bg-gradient-to-b from-[#0e1217] to-[#0a0d12]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                Cloud Solutions
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our comprehensive cloud infrastructure solutions help you build robust, secure, and scalable systems 
              that drive business growth and innovation.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {cloudSolutions.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Architecture diagram section */}
      <section className="py-20 bg-[#0a0d12]">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                Modern Cloud Architecture
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our reference architecture leverages best practices in scalability, security, and performance optimization.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Architecture components */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {architectureComponents.map((component, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div className={`${hoveredIndex === index ? 'bg-white/10' : 'bg-white/5'} backdrop-blur-sm border ${hoveredIndex === index ? 'border-white/20' : 'border-white/10'} rounded-lg p-6 h-full transition-all duration-200`}>
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${hoveredIndex === index ? 'border-[#00b8ff] bg-[#00b8ff]/20' : 'border-[#00b8ff]/50 bg-[#0a0d12]'} mr-3`}>
                        {component.icon}
                      </div>
                      <h3 className="font-bold text-lg">{component.name}</h3>
                    </div>
                    <p className="text-white/70">{component.description}</p>
                    
                    {/* Additional information that appears on hover */}
                    <motion.div 
                      className="mt-4 pt-4 border-t border-white/10"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0,
                        height: hoveredIndex === index ? "auto" : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-sm font-semibold mb-2 text-[#00b8ff]">Key Features:</h4>
                      <ul className="text-sm text-white/70 space-y-1 list-disc pl-4">
                        {index === 0 && (
                          <>
                            <li>Global content delivery with 99.9% uptime</li>
                            <li>Edge computing for reduced latency</li>
                            <li>Automatic traffic routing optimization</li>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <li>DDoS protection and threat detection</li>
                            <li>Web Application Firewall (WAF)</li>
                            <li>Zero-trust network architecture</li>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <li>Kubernetes container orchestration</li>
                            <li>Serverless function deployment</li>
                            <li>Auto-scaling compute resources</li>
                          </>
                        )}
                        {index === 3 && (
                          <>
                            <li>Distributed database systems</li>
                            <li>Automated backup and replication</li>
                            <li>Real-time analytics processing</li>
                          </>
                        )}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-[#0a0d12] to-[#0e1217]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                Key Features
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              See how our Cloud Infrastructure services deliver tangible business results and technological advantages.
            </p>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {keyFeatures.map((feature, index) => (
              <BenefitCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                metric={feature.metric}
                metricLabel={feature.metricLabel}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Case studies section */}
      <section className="py-20 bg-[#0e1217]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Discover how our cloud infrastructure solutions have helped businesses solve complex challenges.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={index}
                title={study.title}
                description={study.description}
                image={study.image}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-[#0e1217]">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-[#00b8ff]/10 to-[#0021a7]/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to transform your infrastructure?</h2>
                <p className="text-white/70 max-w-2xl">
                  Get in touch with our cloud experts to discuss your specific requirements and discover how we can help optimize your digital infrastructure.
                </p>
              </div>
              <motion.button
                className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white px-8 py-4 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap self-start md:self-center hover:shadow-lg hover:shadow-[#00b8ff]/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule Consultation <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

// Service Card Component
function ServiceCard({ icon, title, description, index }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeIn}
      initial="rest"
      whileHover="hover"
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-200 h-full"
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  )
}

// Benefit Card Component
function BenefitCard({ icon, title, description, metric, metricLabel, index }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-200 text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="mb-2">
        <h3 className="text-2xl font-bold text-white mb-1">{metric}</h3>
        <p className="text-sm text-[#00b8ff]">{metricLabel}</p>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  )
}

// Case Study Card Component
function CaseStudyCard({ title, description, image, index }: { 
  title: string; 
  description: string; 
  image: string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-200 h-full"
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/70 mb-4">{description}</p>
        <motion.button
          className="text-[#00b8ff] flex items-center gap-2"
          whileHover={{ gap: 4 }}
        >
          Read Case Study <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
} 