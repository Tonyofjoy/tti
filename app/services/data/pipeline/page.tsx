"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Database, ArrowRight, GitBranch, BarChart3, RefreshCw, Settings, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

// Pipeline stages
const pipelineStages = [
  {
    name: "Extract",
    icon: <Database className="h-8 w-8 text-[#00b8ff]" />,
    description: "Connect to and extract data from diverse sources including databases, APIs, files, and streaming platforms",
  },
  {
    name: "Transform",
    icon: <RefreshCw className="h-8 w-8 text-[#00b8ff]" />,
    description: "Cleanse, normalize, and transform data into the required format for analytics and operations",
  },
  {
    name: "Load",
    icon: <GitBranch className="h-8 w-8 text-[#00b8ff]" />,
    description: "Load processed data into target systems such as data warehouses, data lakes, or applications",
  },
  {
    name: "Monitor",
    icon: <BarChart3 className="h-8 w-8 text-[#00b8ff]" />,
    description: "Track data quality, pipeline performance, and system health with real-time monitoring",
  },
];

// Key features
const keyFeatures = [
  {
    title: "Real-time Data Processing",
    description: "Process streaming data for instant analytics and decision-making",
    icon: <Zap className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Automated Workflows",
    description: "Set up event-triggered pipelines that run with minimal supervision",
    icon: <Settings className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Data Quality Management",
    description: "Ensure high-quality data with built-in validation and cleansing steps",
    icon: <Check className="h-8 w-8 text-[#00b8ff]" />,
  },
];

// Use cases
const useCases = [
  {
    id: "analytics",
    title: "Analytics & BI",
    description: "Streamline data for business intelligence and reporting, ensuring teams have timely access to quality insights that drive decisions.",
    tools: ["Tableau", "Power BI", "Looker"],
    benefits: ["Faster reporting cycles", "Self-service analytics", "Single source of truth"],
  },
  {
    id: "ml",
    title: "Machine Learning",
    description: "Prepare and deliver training data for ML models, with automatic feature engineering and versioning to support your AI initiatives.",
    tools: ["TensorFlow", "PyTorch", "scikit-learn"],
    benefits: ["Automated feature engineering", "Dataset versioning", "Model performance tracking"],
  },
  {
    id: "integration",
    title: "System Integration",
    description: "Connect enterprise systems and synchronize data across your organization, breaking down silos and enabling seamless operations.",
    tools: ["API Gateways", "ESB", "Webhooks"],
    benefits: ["Real-time sync", "Reduced manual processes", "Centralized control"],
  },
];

// Pipeline stats
const pipelineStats = [
  { number: "10M+", label: "Records Processed Daily" },
  { number: "99.9%", label: "Pipeline Reliability" },
  { number: "60%", label: "Reduced Processing Time" },
  { number: "24/7", label: "Monitoring & Support" },
];

export default function DataPipelinePage() {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <PageTemplate 
      title="Data Pipeline Solutions" 
      subtitle="Streamline your data flow with robust, scalable pipelines that transform raw data into valuable insights"
    >
      {/* Hero Section with visual elements */}
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
                Data Pipeline Solutions
              </motion.h2>
              <motion.p 
                className="text-white/70 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Build automated, efficient data pipelines that extract, transform, and deliver insights with speed and reliability.
              </motion.p>
              <motion.button
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] rounded-lg text-white font-medium w-fit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            
            {/* Pipeline visualization */}
            <div className="relative h-64 md:h-80">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative w-full h-full max-w-[320px] mx-auto">
                  {/* ETL pipeline visualization */}
                  <motion.div 
                    className="absolute left-0 top-1/2 w-16 h-16 transform -translate-y-1/2 rounded-lg bg-gradient-to-r from-[#00b8ff]/80 to-[#0021a7]/80 border border-white/20 flex items-center justify-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="text-white text-sm font-medium">Extract</span>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute left-1/2 top-1/2 w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-r from-[#0021a7]/80 to-[#00b8ff]/80 border border-white/20 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="text-white text-sm font-medium">Transform</span>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute right-0 top-1/2 w-16 h-16 transform -translate-y-1/2 rounded-lg bg-gradient-to-r from-[#00b8ff]/80 to-[#0021a7]/80 border border-white/20 flex items-center justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-white text-sm font-medium">Load</span>
                  </motion.div>
                  
                  {/* Data flow animation */}
                  <motion.div
                    className="absolute top-1/2 left-16 right-16 h-1 transform -translate-y-1/2"
                    style={{
                      background: "linear-gradient(90deg, rgba(0,184,255,0.7), rgba(0,33,167,0.7))"
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  />
                  
                  {/* Data points animation */}
                  <motion.div
                    className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white"
                    initial={{ left: "16px", opacity: 0 }}
                    animate={{ 
                      left: ["16px", "calc(100% - 16px)"],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      delay: 1,
                      repeatDelay: 0.5
                    }}
                  />
                  
                  <motion.div
                    className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white"
                    initial={{ left: "16px", opacity: 0 }}
                    animate={{ 
                      left: ["16px", "calc(100% - 16px)"],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      delay: 2,
                      repeatDelay: 0.5
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Pipeline stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 border-t border-white/10">
            {pipelineStats.map((stat, index) => (
              <DataStatCard 
                key={index}
                number={stat.number} 
                label={stat.label} 
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Pipeline Stages */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">End-to-End Data Pipeline</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pipelineStages.map((stage, index) => (
            <ServiceCard
              key={index}
              icon={stage.icon}
              title={stage.name}
              description={stage.description}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Use Cases */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Data Pipeline Use Cases</h2>
        <p className="text-white/70 mb-8 max-w-2xl">
          Explore how our pipeline solutions address different business needs.
        </p>
        
        <div className="border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5">
          <div className="grid grid-cols-3 border-b border-white/10">
            {useCases.map((useCase) => (
              <button
                key={useCase.id}
                onClick={() => setActiveTab(useCase.id)}
                className={`py-4 text-sm md:text-base font-medium transition-colors ${
                  activeTab === useCase.id
                    ? "border-b-2 border-[#00b8ff] text-[#00b8ff]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {useCase.title}
              </button>
            ))}
          </div>
          
          {useCases.map((useCase) => (
            <div 
              key={useCase.id} 
              className={`p-6 ${activeTab === useCase.id ? "block" : "hidden"}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <h3 className="text-2xl font-bold mb-4 text-white">{useCase.title}</h3>
                  <p className="text-white/70 mb-6">{useCase.description}</p>
                  
                  <h4 className="font-semibold text-lg mb-2 text-white">Key Benefits</h4>
                  <ul className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-2">
                    {useCase.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-[#00b8ff] flex-shrink-0" />
                        <span className="text-white/70">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-semibold text-lg mb-2 text-white">Compatible Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {useCase.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 border border-white/10 text-white/80 rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="rounded-lg overflow-hidden h-full min-h-[200px] bg-gradient-to-br from-[#0021a7]/30 to-[#00b8ff]/30 backdrop-blur-sm border border-white/10 flex items-center justify-center p-8">
                    <div className="text-white text-center">
                      <div className="mb-4">
                        {useCase.id === "analytics" && <BarChart3 className="h-16 w-16 mx-auto text-[#00b8ff] opacity-90" />}
                        {useCase.id === "ml" && <Settings className="h-16 w-16 mx-auto text-[#00b8ff] opacity-90" />}
                        {useCase.id === "integration" && <GitBranch className="h-16 w-16 mx-auto text-[#00b8ff] opacity-90" />}
                      </div>
                      <div className="text-xl font-semibold">
                        {useCase.id === "analytics" && "Transform Data into Insights"}
                        {useCase.id === "ml" && "Power Your AI/ML Models"}
                        {useCase.id === "integration" && "Connect Your Systems"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Key Features */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Key Features</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {keyFeatures.map((feature, index) => (
            <ServiceCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
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
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Ready to Optimize Your Data Pipelines?</h2>
            <p className="text-white/70 max-w-xl">
              Let our experts help you design and implement efficient data pipelines tailored to your business needs.
            </p>
          </div>
          <motion.button
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Consultation
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

// Data stat card component
function DataStatCard({ 
  number, 
  label 
}: { 
  number: string; 
  label: string;
}) {
  return (
    <motion.div
      className="text-center"
      variants={fadeIn}
    >
      <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">{number}</p>
      <p className="text-white/70 text-sm">{label}</p>
    </motion.div>
  );
}
