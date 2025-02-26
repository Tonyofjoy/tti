"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  ArrowRight,
  Shield,
  Lock,
  ShieldAlert,
  Eye,
  UserCheck,
  Server,
  File,
  CheckCircle,
  Network,
  Fingerprint,
  Globe,
  AlertTriangle,
  Scan,
  KeyRound,
  MonitorCheck
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

const pulseAnimation = {
  initial: { opacity: 0.5, scale: 0.8 },
  animate: { 
    opacity: [0.5, 1, 0.5], 
    scale: [0.8, 1.1, 0.8],
    transition: { 
      repeat: Infinity, 
      duration: 3,
      ease: "easeInOut"
    } 
  }
}

// Security services
const securityServices = [
  {
    title: "Threat Detection & Response",
    description: "24/7 monitoring with AI-powered threat detection and rapid incident response protocols.",
    icon: <ShieldAlert className="h-8 w-8 text-[#00b8ff]" />
  },
  {
    title: "Identity & Access Management",
    description: "Zero-trust architecture with multi-factor authentication and role-based access controls.",
    icon: <UserCheck className="h-8 w-8 text-[#00b8ff]" />
  },
  {
    title: "Vulnerability Management",
    description: "Continuous scanning, patching and remediation of security vulnerabilities.",
    icon: <Scan className="h-8 w-8 text-[#00b8ff]" />
  },
  {
    title: "Data Protection",
    description: "End-to-end encryption, data loss prevention, and secure backup strategies.",
    icon: <Lock className="h-8 w-8 text-[#00b8ff]" />
  },
  {
    title: "Cloud Security Posture",
    description: "Assessment and management of your cloud infrastructure security with automated compliance.",
    icon: <Server className="h-8 w-8 text-[#00b8ff]" />
  },
  {
    title: "Security Governance",
    description: "Compliance frameworks, security policies, and risk management strategies.",
    icon: <File className="h-8 w-8 text-[#00b8ff]" />
  }
]

// Security layers
const securityLayers = [
  {
    name: "Perimeter Security",
    description: "Your first line of defense with DDoS protection, WAF, and network monitoring",
    icon: <Globe className="h-6 w-6 text-[#00b8ff]" />,
    threatTypes: ["Volumetric attacks", "Web application attacks", "Network intrusions"]
  },
  {
    name: "Identity Security",
    description: "Zero-trust principles with MFA, SSO, and privileged access management",
    icon: <Fingerprint className="h-6 w-6 text-[#00b8ff]" />,
    threatTypes: ["Account compromise", "Insider threats", "Privilege escalation"]
  },
  {
    name: "Infrastructure Security",
    description: "Secure your servers, containers, and cloud resources from vulnerabilities",
    icon: <Server className="h-6 w-6 text-[#00b8ff]" />,
    threatTypes: ["OS vulnerabilities", "Misconfigurations", "Supply chain attacks"]
  },
  {
    name: "Data Security",
    description: "Protect your sensitive information with encryption, monitoring, and controls",
    icon: <Lock className="h-6 w-6 text-[#00b8ff]" />,
    threatTypes: ["Data breaches", "Data leakage", "Unauthorized access"]
  }
]

// Compliance frameworks
const complianceFrameworks = [
  { name: "SOC 2", description: "Service Organization Control" },
  { name: "ISO 27001", description: "Information Security Management" },
  { name: "GDPR", description: "General Data Protection Regulation" },
  { name: "HIPAA", description: "Health Insurance Portability and Accountability Act" },
  { name: "PCI DSS", description: "Payment Card Industry Data Security Standard" },
  { name: "NIST", description: "National Institute of Standards and Technology" }
]

export default function SecurityPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [securityScore, setSecurityScore] = useState(65)
  const [threatCount, setThreatCount] = useState({ blocked: 0, total: 0 })
  const [gridPattern, setGridPattern] = useState<Array<{hasDot: boolean, opacity: number}>>([])
  
  // Generate grid pattern on client-side only
  useEffect(() => {
    const pattern = Array.from({ length: 64 }).map(() => ({
      hasDot: Math.random() > 0.8,
      opacity: Math.floor(Math.random() * 5) + 3
    }));
    setGridPattern(pattern);
    
    // Simulate real-time security metrics
    const interval = setInterval(() => {
      setSecurityScore(prev => {
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newScore = prev + change;
        return Math.min(Math.max(newScore, 60), 99); // Keep between 60-99
      });
      
      setThreatCount(prev => {
        const newThreats = Math.floor(Math.random() * 3);
        return {
          blocked: prev.blocked + newThreats,
          total: prev.total + newThreats
        };
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <main className="bg-[#0e1217] text-white min-h-screen">
      {/* Hero section */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#0021a7]/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0e1217] to-transparent"></div>
          
          {/* Abstract security pattern background */}
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
                    Cloud Security
                  </span> Services
                </h1>
                <p className="text-xl text-white/70 mb-8 max-w-2xl">
                  Protect your cloud infrastructure and data with our comprehensive security services. Our experts implement robust safeguards, conduct regular assessments, and provide continuous monitoring to defend against evolving threats.
                </p>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Security Shield Visualization */}
                <div className="w-full aspect-square max-w-md mx-auto relative">
                  {/* Outer pulse */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-[#00b8ff]/30"
                    variants={pulseAnimation}
                    initial="initial"
                    animate="animate"
                  />
                  
                  {/* Security shield */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-3/4 h-3/4 relative flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {/* Shield background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00b8ff]/10 to-[#0021a7]/10 rounded-full backdrop-blur-sm border border-white/10"></div>
                      
                      {/* Shield icon */}
                      <div className="relative z-10 flex flex-col items-center">
                        <Shield className="w-24 h-24 text-[#00b8ff]" />
                        <div className="mt-4 text-center">
                          <div className="text-3xl font-bold">{securityScore}%</div>
                          <div className="text-sm text-white/70">Security Score</div>
                        </div>
                      </div>
                      
                      {/* Threat counter */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-sm py-2 px-4 rounded-full text-xs border border-white/10">
                        <span className="text-[#00b8ff] font-medium">{threatCount.blocked}</span> threats blocked today
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Security elements around the shield */}
                  {[Lock, Eye, ShieldAlert, Network, Fingerprint, Globe].map((Icon, index) => {
                    const angle = (index * 60) * (Math.PI / 180);
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
                  
                  {/* Animated threat lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path
                      d="M0,20 L100,80"
                      stroke="#00b8ff"
                      strokeWidth="0.2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 0.3,
                        pathOffset: [0, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.path
                      d="M10,90 L90,10"
                      stroke="#00b8ff"
                      strokeWidth="0.2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 0.3,
                        pathOffset: [0, 1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 mt-16 p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">24/7</p>
              <p className="text-white/70 text-sm">Security Monitoring</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">99.9%</p>
              <p className="text-white/70 text-sm">Threat Detection</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">&lt;15 min</p>
              <p className="text-white/70 text-sm">Response Time</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security services section */}
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
                Comprehensive Security Services
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our multi-layered security approach protects your business at every level, from network perimeter to data access.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {securityServices.map((service, index) => (
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
      
      {/* Security layers section */}
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
                Multi-Layer Security Architecture
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our defense-in-depth approach ensures comprehensive protection against evolving cyber threats.
            </p>
          </motion.div>
          
          <div className="relative">
            <motion.div 
              className="grid grid-cols-1 gap-6 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {securityLayers.map((layer, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div className={`${hoveredIndex === index ? 'bg-white/10' : 'bg-white/5'} backdrop-blur-sm border ${hoveredIndex === index ? 'border-white/20' : 'border-white/10'} rounded-lg transition-all duration-200 overflow-hidden`}>
                    <div className="flex items-start p-6">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${hoveredIndex === index ? 'bg-[#00b8ff]/20' : 'bg-white/5'} mr-4`}>
                        {layer.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{layer.name}</h3>
                        <p className="text-white/70 mb-4">{layer.description}</p>
                        
                        <motion.div 
                          className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: hoveredIndex === index ? 1 : 0,
                            height: hoveredIndex === index ? 'auto' : 0,
                            marginTop: hoveredIndex === index ? 16 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {layer.threatTypes.map((threat, i) => (
                            <div 
                              key={i} 
                              className="flex items-center bg-black/30 rounded-lg px-3 py-2 border border-white/10"
                            >
                              <Shield className="h-4 w-4 text-[#00b8ff] mr-2" />
                              <span className="text-sm">{threat}</span>
                            </div>
                          ))}
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className={`h-6 w-6 rounded-full ${hoveredIndex === index ? 'bg-[#00b8ff]/20' : 'bg-white/10'} flex items-center justify-center`}
                        animate={{ rotate: hoveredIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="h-4 w-4 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Compliance section */}
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
                Compliance & Certifications
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We help you meet industry standards and regulatory requirements with our certified security practices.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {complianceFrameworks.map((framework, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-2">
                  <File className="h-8 w-8 text-[#00b8ff]" />
                </div>
                <h3 className="font-bold mb-1">{framework.name}</h3>
                <p className="text-white/50 text-xs">{framework.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex items-center justify-center p-4 bg-[#00b8ff]/10 rounded-full">
                <CheckCircle className="h-8 w-8 text-[#00b8ff]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Compliance Assessment</h3>
                <p className="text-white/70">
                  Not sure which compliance frameworks apply to your business? Our compliance assessment identifies your regulatory requirements and helps build a roadmap to achieve certification.
                </p>
              </div>
              <motion.button
                className="px-6 py-3 rounded-lg bg-white/10 border border-white/10 text-white font-medium whitespace-nowrap flex items-center gap-2 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Assessment <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security assessment CTA */}
      <section className="py-20 bg-[#0e1217]">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-[#00b8ff]/10 to-[#0021a7]/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background security elements */}
            <div className="absolute -top-10 -right-10 opacity-20">
              <Lock className="h-40 w-40 text-[#00b8ff]" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Secure Your Digital Assets Today</h2>
                  <p className="text-white/70 max-w-2xl">
                    Start with a comprehensive security assessment to identify vulnerabilities and build a robust 
                    security strategy tailored to your business needs.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#00b8ff]"></div>
                      <span className="text-sm text-white/70">Vulnerability Scanning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#00b8ff]"></div>
                      <span className="text-sm text-white/70">Risk Assessment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#00b8ff]"></div>
                      <span className="text-sm text-white/70">Security Roadmap</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white px-8 py-4 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap self-start md:self-center hover:shadow-lg hover:shadow-[#00b8ff]/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule Security Assessment <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
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