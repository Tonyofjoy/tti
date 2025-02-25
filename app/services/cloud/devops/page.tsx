"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  ArrowRight,
  GitBranch,
  Play,
  Settings,
  BarChart4,
  AlertCircle,
  Clock,
  Terminal,
  RefreshCw,
  Code,
  LayoutGrid,
  MonitorCheck,
  CheckCircle,
  Server,
  Cloud
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

// DevOps pipeline steps
const pipelineSteps = [
  {
    title: "Plan",
    icon: <LayoutGrid className="h-6 w-6 text-[#00b8ff]" />,
    description: "Define requirements, plan architecture and establish timelines for development and delivery."
  },
  {
    title: "Code",
    icon: <Code className="h-6 w-6 text-[#00b8ff]" />,
    description: "Implement features with version control, code reviews, and collaborative development practices."
  },
  {
    title: "Build",
    icon: <Terminal className="h-6 w-6 text-[#00b8ff]" />,
    description: "Compile code, run unit tests, and package applications for deployment in various environments."
  },
  {
    title: "Test",
    icon: <AlertCircle className="h-6 w-6 text-[#00b8ff]" />,
    description: "Perform automated testing, integration tests, and security scans to validate quality."
  },
  {
    title: "Deploy",
    icon: <Cloud className="h-6 w-6 text-[#00b8ff]" />,
    description: "Automate deployments across environments with zero-downtime and rollback capabilities."
  },
  {
    title: "Operate",
    icon: <Server className="h-6 w-6 text-[#00b8ff]" />,
    description: "Manage production systems with proactive monitoring and responsive incident management."
  },
  {
    title: "Monitor",
    icon: <BarChart4 className="h-6 w-6 text-[#00b8ff]" />,
    description: "Collect metrics, logs, and telemetry to ensure system health and performance."
  },
  {
    title: "Optimize",
    icon: <RefreshCw className="h-6 w-6 text-[#00b8ff]" />,
    description: "Continuously improve processes, infrastructure, and application performance based on feedback."
  }
]

// DevOps services
const devopsServices = [
  {
    title: "CI/CD Pipeline Implementation",
    description: "Automated build, test and deployment pipelines that increase delivery speed and reliability.",
    icon: <GitBranch className="h-8 w-8 text-[#00b8ff]" />
  },
  {
    title: "Infrastructure Automation",
    description: "Infrastructure as Code (IaC) implementation using Terraform, CloudFormation, or Ansible.",
    icon: <Settings className="h-8 w-8 text-[#00b8ff]" />
  },
  {
    title: "Container Orchestration",
    description: "Kubernetes and Docker implementation for scalable, portable application deployment.",
    icon: <LayoutGrid className="h-8 w-8 text-[#00b8ff]" />
  },
  {
    title: "Monitoring & Observability",
    description: "Comprehensive monitoring solutions with real-time alerts and detailed insights.",
    icon: <MonitorCheck className="h-8 w-8 text-[#00b8ff]" />
  },
  {
    title: "Incident Response",
    description: "Automated incident detection, alerting and management to minimize downtime.",
    icon: <AlertCircle className="h-8 w-8 text-[#00b8ff]" />
  },
  {
    title: "Performance Optimization",
    description: "Identify and resolve bottlenecks to improve application and infrastructure performance.",
    icon: <BarChart4 className="h-8 w-8 text-[#00b8ff]" />
  }
]

// Benefits
const benefits = [
  {
    title: "Faster Time to Market",
    description: "Reduce development cycles and deliver features to customers more rapidly.",
    icon: <Clock className="h-12 w-12 text-[#00b8ff]" />,
    metric: "70%",
    metricLabel: "faster releases"
  },
  {
    title: "Improved Reliability",
    description: "Reduce deployment failures and recovery time with automated processes.",
    icon: <CheckCircle className="h-12 w-12 text-[#00b8ff]" />,
    metric: "99.9%",
    metricLabel: "uptime"
  },
  {
    title: "Greater Scalability",
    description: "Scale your infrastructure and applications with confidence to meet demand.",
    icon: <Server className="h-12 w-12 text-[#00b8ff]" />,
    metric: "10x",
    metricLabel: "scaling capacity"
  },
  {
    title: "Cost Efficiency",
    description: "Optimize resource utilization and reduce operational overhead costs.",
    icon: <BarChart4 className="h-12 w-12 text-[#00b8ff]" />,
    metric: "30%",
    metricLabel: "cost reduction"
  }
]

export default function DevOpsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [gridPattern, setGridPattern] = useState<Array<{hasDot: boolean, opacity: number}>>([])
  
  // Generate grid pattern on client-side only
  useEffect(() => {
    const pattern = Array.from({ length: 64 }).map(() => ({
      hasDot: Math.random() > 0.8,
      opacity: Math.floor(Math.random() * 5) + 3
    }));
    setGridPattern(pattern);
  }, []);
  
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
                    DevOps
                  </span> Services
                </h1>
                <p className="text-xl text-white/70 mb-8 max-w-2xl">
                  Supercharge your development lifecycle with our end-to-end DevOps solutions. 
                  We automate, optimize, and scale your operations for faster delivery and better reliability.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#00b8ff]/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
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
                {/* DevOps Pipeline Visualization */}
                <div className="w-full aspect-square max-w-md mx-auto relative">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#00b8ff]/30 animate-spin-slow"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-full border-2 border-[#00b8ff]/20 flex items-center justify-center">
                      <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-[#00b8ff]/10 to-[#0021a7]/20 backdrop-blur-xl flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
                          <RefreshCw className="h-8 w-8 text-white animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* DevOps Icons around the circle */}
                  {[GitBranch, Code, Terminal, Play, Cloud, MonitorCheck, AlertCircle, Settings].map((Icon, index) => {
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
                DevOps Services
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our comprehensive DevOps services help you build, deploy, and manage applications more efficiently,
              with greater reliability and shorter development cycles.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {devopsServices.map((service, index) => (
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
      
      {/* DevOps Pipeline Section */}
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
                Continuous Integration & Delivery Pipeline
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our end-to-end DevOps pipeline automates your software delivery process, from code commit to production deployment.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Pipeline steps */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] transform -translate-y-1/2"></div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-6 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {pipelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div className="hidden md:flex items-center justify-center absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${hoveredIndex === index ? 'border-[#00b8ff] bg-[#00b8ff]/20' : 'border-[#00b8ff]/50 bg-[#0a0d12]'}`}>
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className={`${hoveredIndex === index ? 'bg-white/10' : 'bg-white/5'} backdrop-blur-sm border ${hoveredIndex === index ? 'border-white/20' : 'border-white/10'} rounded-lg p-6 h-full transition-all duration-200`}>
                    <div className="md:hidden flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${hoveredIndex === index ? 'border-[#00b8ff] bg-[#00b8ff]/20' : 'border-[#00b8ff]/50 bg-[#0a0d12]'} mr-3`}>
                        {step.icon}
                      </div>
                      <h3 className="font-bold text-lg">{step.title}</h3>
                    </div>
                    <div className="md:mt-8">
                      <h3 className="font-bold text-lg md:text-center mb-2 hidden md:block">{step.title}</h3>
                      <p className="text-white/70 text-sm md:text-center">{step.description}</p>
                    </div>
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
                Benefits of DevOps
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              See how our DevOps services transform your development lifecycle and deliver tangible business results.
            </p>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                metric={benefit.metric}
                metricLabel={benefit.metricLabel}
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
                <h2 className="text-3xl font-bold mb-4">Ready to transform your development process?</h2>
                <p className="text-white/70 max-w-2xl">
                  Get in touch with our DevOps experts today and discover how we can help you build, deploy, and manage applications more efficiently.
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
      <div className="flex justify-center mb-6">
        {icon}
      </div>
      <div className="mb-4">
        <div className="text-3xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent mb-1">{metric}</div>
        <div className="text-sm text-white/50">{metricLabel}</div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  )
}
