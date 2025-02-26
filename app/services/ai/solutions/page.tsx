"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Brain,
  Eye,
  LineChart,
  Database,
  Cpu,
  Activity,
  ShieldCheck,
  Building2,
  Store,
  Stethoscope,
  BarChart4,
  Bot,
  ArrowRight,
  Factory,
  Map,
  CloudRain,
  FileCode2,
  Sparkles,
  Globe,
  Zap
} from "lucide-react";
import PageTemplate from "@/components/templates/page-template";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

const glowAnimation = {
  initial: { opacity: 0.7, scale: 0.95 },
  animate: {
    opacity: [0.7, 1, 0.7],
    scale: [0.95, 1, 0.95],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

// AI Solution categories
const aiSolutionCategories = [
  {
    id: "ml",
    title: "Machine Learning",
    icon: <Brain className="h-6 w-6" />,
    description: "Train models that learn from data and improve with experience"
  },
  {
    id: "cv",
    title: "Computer Vision",
    icon: <Eye className="h-6 w-6" />,
    description: "Extract meaningful information from images and video"
  },
  {
    id: "analytics",
    title: "Predictive Analytics",
    icon: <LineChart className="h-6 w-6" />,
    description: "Forecast trends and outcomes using historical data"
  },
  {
    id: "nlp",
    title: "Natural Language",
    icon: <FileCode2 className="h-6 w-6" />,
    description: "Process and understand human language"
  },
  {
    id: "automation",
    title: "Intelligent Automation",
    icon: <Bot className="h-6 w-6" />,
    description: "Streamline processes with AI-driven automation"
  },
];

// Solution details for each category
const solutionDetails = {
  ml: [
    {
      title: "Supervised Learning",
      description: "Train models on labeled data to make predictions or classifications",
      icon: <Database className="h-8 w-8 text-[#00b8ff]" />,
    },
    {
      title: "Unsupervised Learning",
      description: "Discover patterns and structures in unlabeled data",
      icon: <Lightbulb className="h-8 w-8 text-[#00b8ff]" />,
    },
    {
      title: "Reinforcement Learning",
      description: "Develop agents that learn optimal behaviors through trial and error",
      icon: <Cpu className="h-8 w-8 text-[#00b8ff]" />,
    },
  ],
  cv: [
    {
      title: "Object Detection",
      description: "Identify and locate objects within images and videos",
      icon: <Eye className="h-8 w-8 text-[#00b8ff]" />,
    },
    {
      title: "Image Classification",
      description: "Categorize images based on their content",
      icon: <Sparkles className="h-8 w-8 text-[#00b8ff]" />,
    },
    {
      title: "Facial Recognition",
      description: "Identify and verify individuals based on facial features",
      icon: <ShieldCheck className="h-8 w-8 text-[#00b8ff]" />,
    },
  ],
  analytics: [
    {
      title: "Time Series Forecasting",
      description: "Predict future values based on previously observed values",
      icon: <LineChart className="h-8 w-8 text-[#00b8ff]" />,
    },
    {
      title: "Anomaly Detection",
      description: "Identify unusual patterns that don't conform to expected behavior",
      icon: <Activity className="h-8 w-8 text-[#00b8ff]" />,
    },
    {
      title: "Customer Insights",
      description: "Gain deeper understanding of customer behavior and preferences",
      icon: <BarChart4 className="h-8 w-8 text-[#00b8ff]" />,
    },
  ],
  nlp: [
    {
      title: "Sentiment Analysis",
      description: "Determine the emotional tone behind text",
      icon: <Activity className="h-8 w-8 text-[#00b8ff]" />,
    },
    {
      title: "Text Classification",
      description: "Categorize text documents into predefined categories",
      icon: <FileCode2 className="h-8 w-8 text-[#00b8ff]" />,
    },
    {
      title: "Language Translation",
      description: "Automatically translate text from one language to another",
      icon: <Globe className="h-8 w-8 text-[#00b8ff]" />,
    },
  ],
  automation: [
    {
      title: "Process Automation",
      description: "Streamline workflows with intelligent automation",
      icon: <Zap className="h-8 w-8 text-[#00b8ff]" />,
    },
    {
      title: "Decision Support",
      description: "Aid decision-making with AI-powered recommendations",
      icon: <Brain className="h-8 w-8 text-[#00b8ff]" />,
    },
    {
      title: "Cognitive Assistance",
      description: "Provide intelligent support for human activities",
      icon: <Bot className="h-8 w-8 text-[#00b8ff]" />,
    },
  ],
};

// Industry applications
const industryApplications = [
  {
    title: "Healthcare",
    description: "Enhance diagnostics, improve patient care, and optimize clinical workflows",
    icon: <Stethoscope className="h-8 w-8 text-[#00b8ff]" />,
    stats: "30% faster diagnosis times",
  },
  {
    title: "Finance",
    description: "Detect fraud, automate trading, and improve risk assessment",
    icon: <BarChart4 className="h-8 w-8 text-[#00b8ff]" />,
    stats: "85% fraud detection accuracy",
  },
  {
    title: "Retail",
    description: "Personalize shopping experiences and optimize inventory management",
    icon: <Store className="h-8 w-8 text-[#00b8ff]" />,
    stats: "25% increase in customer engagement",
  },
  {
    title: "Manufacturing",
    description: "Optimize production, predict maintenance needs, and ensure quality control",
    icon: <Factory className="h-8 w-8 text-[#00b8ff]" />,
    stats: "40% reduction in downtime",
  },
  {
    title: "Transportation",
    description: "Improve route optimization, traffic prediction, and autonomous vehicle technology",
    icon: <Map className="h-8 w-8 text-[#00b8ff]" />,
    stats: "15% fuel efficiency improvement",
  },
  {
    title: "Agriculture",
    description: "Enhance crop monitoring, optimize irrigation, and predict harvest yields",
    icon: <CloudRain className="h-8 w-8 text-[#00b8ff]" />,
    stats: "20% increase in crop yields",
  },
];

// Success metrics
const aiSuccessMetrics = [
  { value: "83%", label: "Automation efficiency" },
  { value: "65%", label: "Cost reduction" },
  { value: "47%", label: "Faster time-to-market" },
  { value: "92%", label: "Accuracy improvement" },
];

export default function AISolutionsPage() {
  const [activeCategory, setActiveCategory] = useState("ml");
  const [aiNodes, setAiNodes] = useState<Array<{x: number, y: number, size: number, speed: number}>>([]);
  
  // Generate AI node positions for the hero animation
  useEffect(() => {
    const nodes = [];
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 5 + 3,
      });
    }
    setAiNodes(nodes);
  }, []);

  return (
    <PageTemplate 
      title="AI-Powered Solutions" 
      subtitle="Transform your business through innovative artificial intelligence applications"
    >
      {/* Hero Section with AI animation */}
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#00b8ff]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#0021a7]/10 rounded-full blur-3xl" />
        
        <motion.div 
          className="relative z-10 overflow-hidden rounded-2xl mb-20 border border-white/10 bg-white/5 backdrop-blur-sm"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            <div className="space-y-6">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Unlock Business Value with AI
              </motion.h2>
              <motion.p 
                className="text-white/70 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Leverage cutting-edge artificial intelligence technologies to solve complex business challenges, automate processes, and gain competitive advantages.
              </motion.p>
            </div>
            
            {/* AI Network Visualization */}
            <div className="relative h-64 md:h-80">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="relative w-full h-full">
                  {/* AI network background */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-gradient-to-r from-[#00b8ff]/20 to-[#0021a7]/20 backdrop-blur-sm z-10"
                    variants={glowAnimation}
                    initial="initial"
                    animate="animate"
                  />
                  
                  {/* Central AI icon */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] p-4 rounded-2xl z-20"
                    variants={floatingAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    <Brain className="h-12 w-12 text-white" />
                  </motion.div>
                  
                  {/* AI nodes */}
                  {aiNodes.map((node, index) => (
                    <motion.div 
                      key={index}
                      className="absolute rounded-full bg-[#00b8ff]"
                      style={{
                        width: `${node.size}px`,
                        height: `${node.size}px`,
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                      }}
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.2, 1],
                        x: [0, Math.random() * 20 - 10, 0],
                        y: [0, Math.random() * 20 - 10, 0],
                      }}
                      transition={{
                        duration: node.speed,
                        repeat: Infinity,
                        delay: index * 0.1,
                      }}
                    />
                  ))}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {aiNodes.slice(0, 15).map((node, index) => (
                      <motion.line
                        key={index}
                        x1="50"
                        y1="50"
                        x2={node.x}
                        y2={node.y}
                        stroke="#00b8ff"
                        strokeWidth="0.5"
                        strokeOpacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                      />
                    ))}
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Success metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 border-t border-white/10">
            {aiSuccessMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">{metric.value}</p>
                <p className="text-white/70 text-sm">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* AI Solution Categories */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">AI Solution Categories</h2>
        
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {aiSolutionCategories.map((category) => (
            <motion.button
              key={category.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeCategory === category.id 
                  ? 'bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              } transition-all`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              <span>{category.title}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Active category description */}
        <motion.div 
          className="mb-8 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-2">
            {aiSolutionCategories.find(c => c.id === activeCategory)?.title}
          </h3>
          <p className="text-white/70">
            {aiSolutionCategories.find(c => c.id === activeCategory)?.description}
          </p>
        </motion.div>
        
        {/* Solution cards for active category */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          key={`${activeCategory}-solutions`}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {solutionDetails[activeCategory as keyof typeof solutionDetails].map((solution, index) => (
            <ServiceCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
            />
          ))}
        </motion.div>
      </motion.div>
      
      {/* Industry Applications */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Industry Applications</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {industryApplications.map((industry, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all h-full"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{industry.icon}</div>
              <h3 className="text-xl font-bold mb-2">{industry.title}</h3>
              <p className="text-white/70 mb-4">{industry.description}</p>
              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-sm font-medium text-[#00b8ff]">{industry.stats}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* AI Implementation Process */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">AI Implementation Process</h2>
        
        <div className="relative">
          {/* Process steps timeline */}
          <div className="absolute left-[28px] top-8 bottom-0 w-1 bg-gradient-to-b from-[#00b8ff] to-[#0021a7] hidden md:block"></div>
          
          <div className="space-y-12">
            {[
              {
                step: 1,
                title: "Discovery & Assessment",
                description: "We analyze your business needs and identify opportunities where AI can create the most value.",
                icon: <Lightbulb className="h-8 w-8 text-[#00b8ff]" />,
              },
              {
                step: 2,
                title: "Solution Design",
                description: "Our experts design a custom AI solution tailored to your specific requirements and objectives.",
                icon: <Brain className="h-8 w-8 text-[#00b8ff]" />,
              },
              {
                step: 3,
                title: "Development & Training",
                description: "We develop and train the AI models using your data, ensuring accuracy and relevance.",
                icon: <Cpu className="h-8 w-8 text-[#00b8ff]" />,
              },
              {
                step: 4,
                title: "Integration & Deployment",
                description: "Seamlessly integrate the AI solution into your existing systems and infrastructure.",
                icon: <Building2 className="h-8 w-8 text-[#00b8ff]" />,
              },
              {
                step: 5,
                title: "Monitoring & Optimization",
                description: "Continuously monitor performance and refine the models to ensure optimal results.",
                icon: <Activity className="h-8 w-8 text-[#00b8ff]" />,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#00b8ff]/20 to-[#0021a7]/20 backdrop-blur-sm border border-white/10">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium text-white/50 mr-2">Step {step.step}</span>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-white/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#00b8ff]/10 to-[#0021a7]/10 p-8 md:p-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Ready to Transform Your Business with AI?</h2>
            <p className="text-white/70 max-w-xl">
              Schedule a consultation with our AI experts to discover how our solutions can drive innovation and efficiency in your organization.
            </p>
          </div>
          <motion.button
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started with AI
          </motion.button>
        </div>
      </motion.div>
    </PageTemplate>
  );
}

// Service card component
function ServiceCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <motion.div
      className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all h-full"
      variants={fadeIn}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  );
}
