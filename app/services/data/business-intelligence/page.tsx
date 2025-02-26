"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Search, 
  Users, 
  Zap, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  Layers,
  BookOpen
} from "lucide-react";
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

// BI solutions
const biSolutions = [
  {
    title: "Interactive Dashboards",
    description: "Real-time, interactive dashboards that visualize complex data in intuitive formats for quick decision-making",
    icon: <BarChart3 className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Advanced Analytics",
    description: "Leverage statistical analysis, predictive modeling, and machine learning to extract deeper insights from your data",
    icon: <LineChart className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "KPI Monitoring",
    description: "Custom key performance indicator tracking with automated alerts and historical trend analysis",
    icon: <TrendingUp className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Data Discovery",
    description: "Self-service tools that allow business users to explore and visualize data without technical expertise",
    icon: <Search className="h-8 w-8 text-[#00b8ff]" />,
  },
];

// BI capabilities
const biCapabilities = [
  {
    title: "Self-Service Analytics",
    description: "Empower every employee to access and analyze data with intuitive, code-free tools",
    icon: <Users className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Real-Time Insights",
    description: "Access up-to-the-minute data for timely decisions and rapid response to market changes",
    icon: <Zap className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Enterprise Reporting",
    description: "Scheduled, automated reports distributed to stakeholders across your organization",
    icon: <BookOpen className="h-8 w-8 text-[#00b8ff]" />,
  },
];

// Industry use cases
const industryUseCases = [
  {
    industry: "Retail",
    description: "Optimize inventory, analyze customer behavior, and improve supply chain efficiency through data-driven insights.",
    metrics: ["Sales Performance", "Customer Segmentation", "Inventory Turnover"],
    icon: <Globe className="h-16 w-16 text-[#00b8ff] opacity-80" />,
  },
  {
    industry: "Healthcare",
    description: "Improve patient outcomes, optimize resource allocation, and increase operational efficiency with healthcare analytics.",
    metrics: ["Patient Satisfaction", "Resource Utilization", "Treatment Efficacy"],
    icon: <Users className="h-16 w-16 text-[#00b8ff] opacity-80" />,
  },
  {
    industry: "Financial Services",
    description: "Detect fraud, assess risk, and personalize customer offers with advanced financial analytics solutions.",
    metrics: ["Risk Analysis", "Customer Lifetime Value", "Fraud Detection"],
    icon: <TrendingUp className="h-16 w-16 text-[#00b8ff] opacity-80" />,
  },
];

// Key benefits
const keyBenefits = [
  {
    title: "50%",
    description: "Faster decision-making with real-time dashboards",
  },
  {
    title: "360°",
    description: "Holistic view of business performance",
  },
  {
    title: "30%",
    description: "Increase in operational efficiency",
  },
  {
    title: "24/7",
    description: "Continuous monitoring and insights",
  },
];

// Platform integrations
const platformIntegrations = [
  "Power BI", "Tableau", "Looker", "Qlik", "Snowflake", "ThoughtSpot", "Domo"
];

export default function BusinessIntelligencePage() {
  const [activeIndustry, setActiveIndustry] = useState("Retail");

  return (
    <PageTemplate 
      title="Business Intelligence" 
      subtitle="Transform your data into actionable insights with modern BI solutions"
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
                Business Intelligence Solutions
              </motion.h2>
              <motion.p 
                className="text-white/70 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Transform complex data into clear, actionable insights that drive smarter business decisions and accelerate growth.
              </motion.p>
            </div>
            
            {/* Dashboard visualization */}
            <div className="relative h-64 md:h-80">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              >
                <div className="w-full h-full max-w-[320px] mx-auto relative">
                  {/* Dashboard mockup */}
                  <motion.div 
                    className="absolute inset-0 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {/* Dashboard header */}
                    <div className="h-8 w-full bg-gradient-to-r from-[#00b8ff]/40 to-[#0021a7]/40 flex items-center px-3">
                      <div className="h-2 w-2 rounded-full bg-white/60 mr-1.5"></div>
                      <div className="h-2 w-2 rounded-full bg-white/60 mr-1.5"></div>
                      <div className="h-2 w-2 rounded-full bg-white/60"></div>
                    </div>
                    
                    {/* Dashboard content */}
                    <div className="p-3 grid grid-cols-2 gap-2">
                      {/* Chart 1 */}
                      <motion.div 
                        className="aspect-square rounded bg-white/10 flex items-center justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <PieChart className="h-10 w-10 text-[#00b8ff] opacity-70" />
                      </motion.div>
                      
                      {/* Chart 2 */}
                      <motion.div 
                        className="aspect-square rounded bg-white/10 flex items-center justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <BarChart3 className="h-10 w-10 text-[#00b8ff] opacity-70" />
                      </motion.div>
                      
                      {/* Chart 3 */}
                      <motion.div 
                        className="aspect-square rounded bg-white/10 flex items-center justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <LineChart className="h-10 w-10 text-[#00b8ff] opacity-70" />
                      </motion.div>
                      
                      {/* Chart 4 */}
                      <motion.div 
                        className="aspect-square rounded bg-white/10 flex items-center justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                      >
                        <TrendingUp className="h-10 w-10 text-[#00b8ff] opacity-70" />
                      </motion.div>
                    </div>
                    
                    {/* Dashboard footer */}
                    <div className="p-3">
                      <motion.div 
                        className="h-4 w-full rounded bg-white/10"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                      ></motion.div>
                      <div className="mt-2 grid grid-cols-3 gap-1">
                        <motion.div 
                          className="h-3 rounded bg-white/10"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 1.2, duration: 0.6 }}
                        ></motion.div>
                        <motion.div 
                          className="h-3 rounded bg-white/10"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 1.3, duration: 0.6 }}
                        ></motion.div>
                        <motion.div 
                          className="h-3 rounded bg-white/10"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 1.4, duration: 0.6 }}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Key benefits stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 border-t border-white/10">
            {keyBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeIn}
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">{benefit.title}</p>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* BI Solutions */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Comprehensive BI Solutions</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {biSolutions.map((solution, index) => (
            <ServiceCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Data to Insights Workflow */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Data to Insights Workflow</h2>
        <p className="text-white/70 mb-8 max-w-2xl">
          Our proven approach transforms raw data into actionable business intelligence
        </p>
        
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#00b8ff]/50 to-[#0021a7]/50 transform -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <WorkflowStep 
              icon={<Database className="h-8 w-8 text-[#00b8ff]" />}
              title="Data Collection"
              description="Gather data from multiple sources including databases, cloud applications, and IoT devices"
              step={1}
            />
            <WorkflowStep 
              icon={<Layers className="h-8 w-8 text-[#00b8ff]" />}
              title="Processing & Integration"
              description="Clean, transform, and integrate data into a unified format"
              step={2}
            />
            <WorkflowStep 
              icon={<BarChart3 className="h-8 w-8 text-[#00b8ff]" />}
              title="Analysis & Visualization"
              description="Apply analytics algorithms and create intuitive visual representations"
              step={3}
            />
            <WorkflowStep 
              icon={<CheckCircle2 className="h-8 w-8 text-[#00b8ff]" />}
              title="Insight Delivery"
              description="Deliver actionable insights through dashboards, reports, and alerts"
              step={4}
            />
          </div>
        </div>
      </motion.div>
      
      {/* BI Capabilities */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Advanced Capabilities</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {biCapabilities.map((capability, index) => (
            <ServiceCard
              key={index}
              icon={capability.icon}
              title={capability.title}
              description={capability.description}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Industry Use Cases */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Industry Use Cases</h2>
        <p className="text-white/70 mb-8 max-w-2xl">
          Discover how organizations in various industries leverage our business intelligence solutions
        </p>
        
        <div className="border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5">
          <div className="grid grid-cols-3 border-b border-white/10">
            {industryUseCases.map((useCase) => (
              <button
                key={useCase.industry}
                onClick={() => setActiveIndustry(useCase.industry)}
                className={`py-4 text-sm md:text-base font-medium transition-colors ${
                  activeIndustry === useCase.industry
                    ? "border-b-2 border-[#00b8ff] text-[#00b8ff]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {useCase.industry}
              </button>
            ))}
          </div>
          
          {industryUseCases.map((useCase) => (
            <div 
              key={useCase.industry} 
              className={`p-6 ${activeIndustry === useCase.industry ? "block" : "hidden"}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <h3 className="text-2xl font-bold mb-4 text-white">{useCase.industry} Analytics</h3>
                  <p className="text-white/70 mb-6">{useCase.description}</p>
                  
                  <h4 className="font-semibold text-lg mb-2 text-white">Key Metrics</h4>
                  <ul className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-2">
                    {useCase.metrics.map((metric, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-[#00b8ff] flex-shrink-0" />
                        <span className="text-white/70">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="rounded-lg overflow-hidden h-full min-h-[200px] bg-gradient-to-br from-[#0021a7]/30 to-[#00b8ff]/30 backdrop-blur-sm border border-white/10 flex items-center justify-center p-8">
                    <div className="text-white text-center">
                      <div className="mb-4">
                        {useCase.icon}
                      </div>
                      <div className="text-xl font-semibold">
                        Transform {useCase.industry} Data Into Actionable Insights
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Platform Integrations */}
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Platform Integrations</h2>
        <p className="text-white/70 mb-8 max-w-2xl">
          Our BI solutions integrate with leading analytics platforms
        </p>
        
        <div className="flex flex-wrap gap-4">
          {platformIntegrations.map((platform, index) => (
            <motion.div 
              key={index}
              className="px-6 py-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-white">{platform}</span>
            </motion.div>
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
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Ready to Transform Your Data Strategy?</h2>
            <p className="text-white/70 max-w-xl">
              Let our experts help you design and implement business intelligence solutions that drive real business value.
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

// Workflow step component
function WorkflowStep({ 
  icon, 
  title, 
  description,
  step
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  step: number;
}) {
  return (
    <motion.div
      className="relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all h-full"
      variants={fadeIn}
      whileHover={{ y: -5 }}
    >
      <div className="relative z-10">
        <div className="mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#00b8ff]/20 to-[#0021a7]/20 flex items-center justify-center mb-3">
            {icon}
          </div>
          <span className="inline-block px-2.5 py-1 text-xs bg-white/10 rounded-full text-white/80">Step {step}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
      
      <div className="absolute top-6 left-6 h-12 w-12 rounded-full bg-white/5 md:hidden"></div>
    </motion.div>
  );
}
