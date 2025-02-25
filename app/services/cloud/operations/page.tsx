"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import {
  ArrowRight,
  BarChart3,
  AlertCircle,
  Settings,
  Terminal,
  Server,
  Zap,
  BarChart2,
  Clock,
  Activity,
  Users,
  RefreshCw,
  PieChart,
  LineChart,
  Bell,
  TrendingUp,
  Database,
  MonitorCheck,
  CircleDollarSign,
  Clock8,
  CheckCircle2,
  ShieldCheck,
  Cpu
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
  initial: { opacity: 0.5, scale: 0.95 },
  animate: { 
    opacity: [0.5, 1, 0.5], 
    scale: [0.95, 1.05, 0.95],
    transition: { 
      repeat: Infinity, 
      duration: 3,
      ease: "easeInOut"
    } 
  }
}

// Operations services
const operationsServices = [
  {
    title: "Monitoring & Observability",
    description: "Comprehensive monitoring of all cloud resources with real-time alerts and detailed performance metrics.",
    icon: <Activity className="h-8 w-8 text-[#00b8ff]" />,
    metrics: [
      { label: "Uptime", value: "99.99%" },
      { label: "Alert Response", value: "<2 min" }
    ]
  },
  {
    title: "Incident Management",
    description: "Rapid response to service disruptions with automated detection, triage, and resolution workflows.",
    icon: <AlertCircle className="h-8 w-8 text-[#00b8ff]" />,
    metrics: [
      { label: "MTTR", value: "15 min" },
      { label: "Auto-resolution", value: "67%" }
    ]
  },
  {
    title: "Performance Optimization",
    description: "Continuous assessment and tuning of your cloud resources to maximize performance and minimize costs.",
    icon: <Zap className="h-8 w-8 text-[#00b8ff]" />,
    metrics: [
      { label: "Avg. Improvement", value: "38%" },
      { label: "ROI", value: "4.3x" }
    ]
  },
  {
    title: "Cost Management",
    description: "Advanced cloud cost analysis and optimization to reduce waste and improve resource allocation.",
    icon: <CircleDollarSign className="h-8 w-8 text-[#00b8ff]" />,
    metrics: [
      { label: "Avg. Savings", value: "26%" },
      { label: "Waste Reduction", value: "43%" }
    ]
  },
  {
    title: "Capacity Planning",
    description: "Proactive resource forecasting and scaling to meet performance needs while controlling costs.",
    icon: <TrendingUp className="h-8 w-8 text-[#00b8ff]" />,
    metrics: [
      { label: "Forecast Accuracy", value: "94%" },
      { label: "Scaling Efficiency", value: "3.2x" }
    ]
  },
  {
    title: "Automation & Orchestration",
    description: "Streamlining operations through infrastructure as code, CI/CD pipelines, and workflow automation.",
    icon: <RefreshCw className="h-8 w-8 text-[#00b8ff]" />,
    metrics: [
      { label: "Time Saved", value: "68%" },
      { label: "Error Reduction", value: "91%" }
    ]
  }
]

// Operations cycle
const operationsCycle = [
  {
    name: "Monitor",
    description: "Real-time monitoring of infrastructure, applications, and services",
    icon: <BarChart3 className="h-6 w-6 text-[#00b8ff]" />,
    features: ["Application Performance", "Infrastructure Health", "Security Events", "Business Metrics"]
  },
  {
    name: "Analyze",
    description: "Advanced analytics and machine learning to identify patterns and issues",
    icon: <LineChart className="h-6 w-6 text-[#00b8ff]" />,
    features: ["Anomaly Detection", "Root Cause Analysis", "Predictive Insights", "Optimization Recommendations"]
  },
  {
    name: "Respond",
    description: "Automated and manual responses to incidents and optimization opportunities",
    icon: <Bell className="h-6 w-6 text-[#00b8ff]" />,
    features: ["Incident Response", "Auto-remediation", "Scaling Operations", "Resource Adjustment"]
  },
  {
    name: "Improve",
    description: "Continuous improvement through feedback loops and best practices",
    icon: <RefreshCw className="h-6 w-6 text-[#00b8ff]" />,
    features: ["Post-mortem Analysis", "Performance Tuning", "Process Refinement", "Knowledge Base Updates"]
  }
]

// Dashboard metrics for visualization
const dashboardMetrics = [
  { 
    name: "CPU Usage", 
    current: 26, 
    trend: "down", 
    data: [45, 38, 32, 40, 26, 28, 30, 26],
    color: "#00b8ff" 
  },
  { 
    name: "Memory Usage", 
    current: 54, 
    trend: "up", 
    data: [38, 42, 47, 50, 46, 48, 52, 54],
    color: "#0066ff" 
  },
  { 
    name: "API Response", 
    current: 215, 
    trend: "stable", 
    data: [230, 220, 225, 218, 224, 216, 220, 215],
    color: "#9900ff",
    unit: "ms"
  },
  { 
    name: "Error Rate", 
    current: 0.23, 
    trend: "down", 
    data: [1.2, 0.8, 0.5, 0.4, 0.3, 0.35, 0.28, 0.23],
    color: "#00ff99",
    unit: "%"
  }
]

// Performance benefits
const performanceBenefits = [
  { title: "Improved Uptime", value: "99.99%", icon: <Clock className="h-6 w-6 text-[#00b8ff]" /> },
  { title: "Faster Incident Resolution", value: "65%", icon: <Zap className="h-6 w-6 text-[#00b8ff]" /> },
  { title: "Cost Reduction", value: "26-40%", icon: <CircleDollarSign className="h-6 w-6 text-[#00b8ff]" /> },
  { title: "Increased Team Efficiency", value: "3.5×", icon: <Users className="h-6 w-6 text-[#00b8ff]" /> }
]

export default function OperationsPage() {
  const [hoveredCycleIndex, setHoveredCycleIndex] = useState<number | null>(null)
  const [hoveredMetricIndex, setHoveredMetricIndex] = useState<number | null>(null)
  const [gridPattern, setGridPattern] = useState<Array<{hasDot: boolean, opacity: number}>>([])
  const [dashboardData, setDashboardData] = useState(dashboardMetrics)
  
  const dashboardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: dashboardRef,
    offset: ["start end", "end start"]
  })
  
  const dashboardScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  
  // Generate grid pattern on client-side only
  useEffect(() => {
    const pattern = Array.from({ length: 64 }).map(() => ({
      hasDot: Math.random() > 0.7,
      opacity: Math.floor(Math.random() * 5) + 3
    }));
    setGridPattern(pattern);
    
    // Simulate live dashboard with changing metrics
    const interval = setInterval(() => {
      setDashboardData(prev => prev.map(metric => {
        // Generate a small random change for each metric
        const randomChange = (Math.random() - 0.5) * 5;
        const newValue = parseFloat((metric.current + randomChange * 0.05).toFixed(2));
        
        // Don't let values go below 0
        const clampedValue = Math.max(newValue, 0);
        
        // Add new data point and determine trend
        const newData = [...metric.data.slice(1), clampedValue];
        const lastThree = newData.slice(-3);
        let trend = "stable";
        
        if (lastThree[2] > lastThree[0] * 1.05) trend = "up";
        else if (lastThree[2] < lastThree[0] * 0.95) trend = "down";
        
        return {
          ...metric,
          current: clampedValue,
          data: newData,
          trend: trend as "up" | "down" | "stable"
        };
      }));
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
          
          {/* Abstract operations pattern background */}
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
                    Cloud Operations
                  </span> Services
                </h1>
                <p className="text-xl text-white/70 mb-8 max-w-2xl">
                  Maximize your cloud investment with our comprehensive operations services. We optimize 
                  performance, ensure reliability, and drive cost efficiency for your mission-critical 
                  cloud infrastructure.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#00b8ff]/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Operational Assessment <ArrowRight className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium border border-white/10 hover:border-white/30 transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Service Details
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
                {/* Operations Dashboard Visualization */}
                <div className="w-full aspect-square max-w-md mx-auto relative">
                  {/* Dashboard container */}
                  <div className="absolute inset-0 rounded-xl bg-[#0a0d12]/60 backdrop-blur-sm border border-white/10 overflow-hidden">
                    {/* Dashboard header */}
                    <div className="border-b border-white/10 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-[#00b8ff]" />
                        <span className="font-medium">Operations Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#00b8ff] animate-pulse"></div>
                        <span className="text-xs text-white/50">Live</span>
                      </div>
                    </div>
                    
                    {/* Dashboard content */}
                    <div className="p-4 grid grid-cols-2 gap-4">
                      {dashboardData.map((metric, index) => (
                        <motion.div
                          key={index}
                          className={`p-3 rounded-lg border ${hoveredMetricIndex === index ? 'border-[#00b8ff]/30 bg-white/5' : 'border-white/10 bg-black/20'} transition-all`}
                          whileHover={{ scale: 1.05 }}
                          onHoverStart={() => setHoveredMetricIndex(index)}
                          onHoverEnd={() => setHoveredMetricIndex(null)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{metric.name}</span>
                            <div className={`flex items-center gap-1 text-xs ${
                              metric.trend === 'up' ? 'text-green-400' : 
                              metric.trend === 'down' ? 'text-[#00b8ff]' : 'text-white/50'
                            }`}>
                              {metric.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                              {metric.trend === 'down' && <TrendingUp className="h-3 w-3 transform rotate-180" />}
                              {metric.trend === 'stable' && <TrendingUp className="h-3 w-3 transform rotate-90" />}
                              <span>{metric.trend}</span>
                            </div>
                          </div>
                          
                          <div className="text-xl font-bold mb-2">
                            {metric.current}{metric.unit || '%'}
                          </div>
                          
                          {/* Mini sparkline chart */}
                          <div className="h-10 flex items-end gap-[2px]">
                            {metric.data.map((value, i) => {
                              // Scale the value based on the max in the dataset
                              const max = Math.max(...metric.data);
                              const height = (value / max) * 100;
                              
                              return (
                                <div 
                                  key={i} 
                                  className="flex-1 rounded-sm" 
                                  style={{ 
                                    height: `${height}%`, 
                                    backgroundColor: metric.color,
                                    opacity: i === metric.data.length - 1 ? 1 : 0.5 + (i / metric.data.length * 0.5)
                                  }}
                                ></div>
                              );
                            })}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Dashboard footer */}
                    <div className="absolute bottom-0 inset-x-0 border-t border-white/10 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className={`h-6 w-6 rounded-full border-2 border-[#0a0d12] bg-gradient-to-br from-[#${i === 0 ? '00b8ff' : i === 1 ? '0066ff' : '9900ff'}] to-[#${i === 0 ? '0066ff' : i === 1 ? '9900ff' : '00ff99'}]/50`}></div>
                          ))}
                        </div>
                        <span className="text-xs text-white/50">3 active operators</span>
                      </div>
                      <div className="text-xs text-white/50">
                        Last updated: <span className="text-white">just now</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Key metrics bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10">
            {performanceBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 flex justify-center">
                  {benefit.icon}
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                  {benefit.value}
                </p>
                <p className="text-white/70 text-sm">
                  {benefit.title}
                </p>
              </div>
            ))}
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
                Comprehensive Operations Services
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our operations services focus on maximizing performance, reliability, and efficiency of your cloud environment.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {operationsServices.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                metrics={service.metrics}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Operations cycle section */}
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
                The Cloud Operations Cycle
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our continuous operations methodology ensures optimal performance and reliability for your cloud services.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Centered diagram with concentric circles (visible on desktop) */}
            <div className="hidden md:block relative h-[750px] mx-auto max-w-5xl">
              {/* Background circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-[580px] h-[580px] border border-white/10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="w-[420px] h-[420px] border border-white/10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="w-[260px] h-[260px] border border-white/10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
              
              {/* Connection lines */}
              <div className="absolute top-[275px] left-[335px] w-[125px] h-[2px] bg-[#00b8ff]/30"></div>
              <div className="absolute top-[275px] right-[335px] w-[125px] h-[2px] bg-[#00b8ff]/30"></div>
              <div className="absolute bottom-[275px] left-[335px] w-[125px] h-[2px] bg-[#00b8ff]/30"></div>
              <div className="absolute bottom-[275px] right-[335px] w-[125px] h-[2px] bg-[#00b8ff]/30"></div>
              
              {/* Center element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-[#00b8ff]/20 to-[#0021a7]/20 backdrop-blur-sm border border-[#00b8ff]/30 flex items-center justify-center z-20">
                <Settings className="h-10 w-10 text-[#00b8ff] animate-pulse" />
              </div>

              {/* Monitor - Top Left */}
              <div className="absolute top-[110px] left-[110px] w-[280px]">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
                  style={{ 
                    zIndex: hoveredCycleIndex === 0 ? 30 : 10,
                    boxShadow: hoveredCycleIndex === 0 ? '0 8px 32px rgba(0, 184, 255, 0.15)' : 'none',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease'
                  }}
                  onHoverStart={() => setHoveredCycleIndex(0)}
                  onHoverEnd={() => setHoveredCycleIndex(null)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5">
                      <BarChart3 className="h-6 w-6 text-[#00b8ff]" />
                    </div>
                    <h3 className="text-xl font-bold">Monitor</h3>
                  </div>
                  
                  <p className="text-white/70 mb-4">Real-time monitoring of infrastructure, applications, and services</p>
                  
                  <motion.div 
                    className="grid grid-cols-1 gap-2 mt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredCycleIndex === 0 ? 1 : 0,
                      height: hoveredCycleIndex === 0 ? 'auto' : 0,
                      marginTop: hoveredCycleIndex === 0 ? 16 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      overflow: 'hidden',
                      maxHeight: hoveredCycleIndex === 0 ? '200px' : 0
                    }}
                  >
                    {operationsCycle[0].features.slice(0, 3).map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-center bg-black/30 rounded-lg px-3 py-1.5 border border-white/10"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00b8ff] mr-2" />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Analyze - Top Right */}
              <div className="absolute top-[110px] right-[110px] w-[280px]">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
                  style={{ 
                    zIndex: hoveredCycleIndex === 1 ? 30 : 10,
                    boxShadow: hoveredCycleIndex === 1 ? '0 8px 32px rgba(0, 184, 255, 0.15)' : 'none',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease'
                  }}
                  onHoverStart={() => setHoveredCycleIndex(1)}
                  onHoverEnd={() => setHoveredCycleIndex(null)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5">
                      <LineChart className="h-6 w-6 text-[#00b8ff]" />
                    </div>
                    <h3 className="text-xl font-bold">Analyze</h3>
                  </div>
                  
                  <p className="text-white/70 mb-4">Advanced analytics and machine learning to identify patterns and issues</p>
                  
                  <motion.div 
                    className="grid grid-cols-1 gap-2 mt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredCycleIndex === 1 ? 1 : 0,
                      height: hoveredCycleIndex === 1 ? 'auto' : 0,
                      marginTop: hoveredCycleIndex === 1 ? 16 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      overflow: 'hidden',
                      maxHeight: hoveredCycleIndex === 1 ? '200px' : 0
                    }}
                  >
                    {operationsCycle[1].features.slice(0, 3).map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-center bg-black/30 rounded-lg px-3 py-1.5 border border-white/10"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00b8ff] mr-2" />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Respond - Bottom Right */}
              <div className="absolute bottom-[110px] right-[110px] w-[280px]">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
                  style={{ 
                    zIndex: hoveredCycleIndex === 2 ? 30 : 10,
                    boxShadow: hoveredCycleIndex === 2 ? '0 8px 32px rgba(0, 184, 255, 0.15)' : 'none',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease'
                  }}
                  onHoverStart={() => setHoveredCycleIndex(2)}
                  onHoverEnd={() => setHoveredCycleIndex(null)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5">
                      <Bell className="h-6 w-6 text-[#00b8ff]" />
                    </div>
                    <h3 className="text-xl font-bold">Respond</h3>
                  </div>
                  
                  <p className="text-white/70 mb-4">Automated and manual responses to incidents and optimization opportunities</p>
                  
                  <motion.div 
                    className="grid grid-cols-1 gap-2 mt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredCycleIndex === 2 ? 1 : 0,
                      height: hoveredCycleIndex === 2 ? 'auto' : 0,
                      marginTop: hoveredCycleIndex === 2 ? 16 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      overflow: 'hidden',
                      maxHeight: hoveredCycleIndex === 2 ? '200px' : 0
                    }}
                  >
                    {operationsCycle[2].features.slice(0, 3).map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-center bg-black/30 rounded-lg px-3 py-1.5 border border-white/10"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00b8ff] mr-2" />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Improve - Bottom Left */}
              <div className="absolute bottom-[110px] left-[110px] w-[280px]">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
                  style={{ 
                    zIndex: hoveredCycleIndex === 3 ? 30 : 10,
                    boxShadow: hoveredCycleIndex === 3 ? '0 8px 32px rgba(0, 184, 255, 0.15)' : 'none',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease'
                  }}
                  onHoverStart={() => setHoveredCycleIndex(3)}
                  onHoverEnd={() => setHoveredCycleIndex(null)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5">
                      <RefreshCw className="h-6 w-6 text-[#00b8ff]" />
                    </div>
                    <h3 className="text-xl font-bold">Improve</h3>
                  </div>
                  
                  <p className="text-white/70 mb-4">Continuous improvement through feedback loops and best practices</p>
                  
                  <motion.div 
                    className="grid grid-cols-1 gap-2 mt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredCycleIndex === 3 ? 1 : 0,
                      height: hoveredCycleIndex === 3 ? 'auto' : 0,
                      marginTop: hoveredCycleIndex === 3 ? 16 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      overflow: 'hidden',
                      maxHeight: hoveredCycleIndex === 3 ? '200px' : 0
                    }}
                  >
                    {operationsCycle[3].features.slice(0, 3).map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-center bg-black/30 rounded-lg px-3 py-1.5 border border-white/10"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00b8ff] mr-2" />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            {/* Mobile view - stacked cards */}
            <div className="md:hidden space-y-6">
              {operationsCycle.map((phase, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5">
                      {phase.icon}
                    </div>
                    <h3 className="text-xl font-bold">{phase.name}</h3>
                  </div>
                  <p className="text-white/70">{phase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Live operations dashboard */}
      <section className="py-20 bg-gradient-to-b from-[#0a0d12] to-[#0e1217]" ref={dashboardRef}>
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
                Real-time Cloud Management
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our operations platform provides comprehensive visibility and control over your entire cloud environment.
            </p>
          </motion.div>
          
          <motion.div 
            className="relative bg-[#0a0d12] border border-white/10 rounded-lg p-6 overflow-hidden"
            style={{
              scale: dashboardScale,
              opacity: dashboardOpacity
            }}
          >
            {/* Dashboard header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
                  <MonitorCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Operations Command Center</h3>
                  <p className="text-white/50 text-sm">Real-time monitoring and management</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#00b8ff]/10 border border-[#00b8ff]/30">
                  <div className="h-2 w-2 rounded-full bg-[#00b8ff] animate-pulse"></div>
                  <span className="text-xs text-[#00b8ff]">All systems normal</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                    <Bell className="h-4 w-4 text-white/70" />
                    <span className="text-sm">2</span>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-white/70" />
                    <span className="text-sm">Console</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main dashboard layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Resource metrics */}
              <div className="lg:col-span-2">
                <h4 className="text-sm text-white/50 uppercase mb-3">Resource Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* CPU Utilization */}
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-[#00b8ff]" />
                        <span className="text-sm font-medium">CPU Utilization</span>
                      </div>
                      <span className="text-sm font-bold">26%</span>
                    </div>
                    <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7]" 
                        style={{ width: '26%' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '26%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-white/50">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  {/* Memory Usage */}
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-[#00b8ff]" />
                        <span className="text-sm font-medium">Memory Usage</span>
                      </div>
                      <span className="text-sm font-bold">54%</span>
                    </div>
                    <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7]" 
                        style={{ width: '54%' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '54%' }}
                        transition={{ duration: 1, delay: 0.6 }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-white/50">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  {/* Network Traffic */}
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-[#00b8ff]" />
                        <span className="text-sm font-medium">Network Traffic</span>
                      </div>
                      <span className="text-sm font-bold">732 Mbps</span>
                    </div>
                    
                    <div className="h-12 flex items-end gap-1">
                      {[45, 68, 35, 62, 73, 47, 59, 68, 43, 52, 35, 58].map((value, i) => (
                        <div 
                          key={i} 
                          className="flex-1 rounded-sm bg-gradient-to-t from-[#00b8ff] to-[#0021a7]" 
                          style={{ 
                            height: `${value}%`,
                            opacity: i === 11 ? 1 : 0.5 + (i / 12 * 0.5)
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-1 text-xs text-white/50">
                      <span>08:00</span>
                      <span>12:00</span>
                      <span>16:00</span>
                    </div>
                  </div>
                  
                  {/* Disk I/O */}
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-[#00b8ff]" />
                        <span className="text-sm font-medium">Disk I/O</span>
                      </div>
                      <span className="text-sm font-bold">128 MB/s</span>
                    </div>
                    
                    <div className="h-12 flex items-end gap-1">
                      {[25, 32, 45, 38, 42, 55, 48, 62, 58, 72, 65, 47].map((value, i) => (
                        <div 
                          key={i} 
                          className="flex-1 rounded-sm bg-gradient-to-t from-[#00b8ff] to-[#0021a7]" 
                          style={{ 
                            height: `${value}%`,
                            opacity: i === 11 ? 1 : 0.5 + (i / 12 * 0.5)
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-1 text-xs text-white/50">
                      <span>08:00</span>
                      <span>12:00</span>
                      <span>16:00</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status panel */}
              <div>
                <h4 className="text-sm text-white/50 uppercase mb-3">System Status</h4>
                <div className="bg-white/5 rounded-lg border border-white/10 p-4 h-[calc(100%-28px)]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      <span className="text-sm">All systems operational</span>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { name: "API Gateway", status: "Operational", latency: "32ms" },
                        { name: "Compute Instances", status: "Operational", latency: "1ms" },
                        { name: "Database Cluster", status: "Operational", latency: "18ms" },
                        { name: "Storage Service", status: "Operational", latency: "24ms" },
                        { name: "CDN Edge Network", status: "Operational", latency: "46ms" }
                      ].map((service, i) => (
                        <div key={i} className="flex items-center justify-between text-sm p-2 border-b border-white/5">
                          <span>{service.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-green-400 text-xs">{service.status}</span>
                            <div className="px-2 py-1 bg-white/5 rounded text-xs">{service.latency}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm">
                        <span>Last incident:</span>
                        <div className="flex items-center gap-2">
                          <Clock8 className="h-3 w-3 text-white/50" />
                          <span>18 days ago</span>
                        </div>
                      </div>
                      <div className="text-xs text-white/50 mt-2">
                        SLA uptime: <span className="text-white">99.997%</span> (last 30 days)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Operations assessment CTA */}
      <section className="py-20 bg-[#0e1217]">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-[#00b8ff]/10 to-[#0021a7]/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 opacity-20">
              <Settings className="h-40 w-40 text-[#00b8ff]" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Optimize Your Cloud Operations</h2>
                  <p className="text-white/70 max-w-2xl">
                    Start with a comprehensive operational assessment to identify optimization opportunities and build a 
                    customized operations strategy for your cloud environment.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#00b8ff]"></div>
                      <span className="text-sm text-white/70">Performance Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#00b8ff]"></div>
                      <span className="text-sm text-white/70">Cost Optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#00b8ff]"></div>
                      <span className="text-sm text-white/70">Operational Roadmap</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white px-8 py-4 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap self-start md:self-center hover:shadow-lg hover:shadow-[#00b8ff]/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule Operations Assessment <ArrowRight className="h-4 w-4" />
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
function ServiceCard({ icon, title, description, metrics, index }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
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
      <p className="text-white/70 mb-4">{description}</p>
      
      <div className="mt-auto pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
        {metrics.map((metric, i) => (
          <div key={i} className="text-center">
            <div className="text-sm font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              {metric.value}
            </div>
            <div className="text-xs text-white/50">{metric.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
