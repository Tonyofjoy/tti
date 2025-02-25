"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Database, Server, Layers, CodeSquare, LineChart, Shield, ArrowRight, ChevronRight } from "lucide-react";
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
      staggerChildren: 0.2,
    },
  },
};

// Service features data
const architectureFeatures = [
  {
    title: "Scalable Data Models",
    description: "Design flexible, future-proof data models that grow with your business needs",
    icon: <Layers className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Data Governance",
    description: "Implement robust data governance frameworks to maintain quality and compliance",
    icon: <Shield className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "System Integration",
    description: "Connect disparate systems with seamless data architecture patterns",
    icon: <CodeSquare className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Performance Optimization",
    description: "Structure your data for optimal query performance and real-time analytics",
    icon: <LineChart className="h-8 w-8 text-[#00b8ff]" />,
  },
];

// Architecture components
const architectureComponents = [
  {
    name: "Data Lake",
    description: "Centralized repository for structured and unstructured data at scale",
    icon: <Database className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    name: "Data Warehouse",
    description: "Optimized structure for analytics and business intelligence",
    icon: <Server className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    name: "API Layer",
    description: "Secure access points for integrating with applications and services",
    icon: <CodeSquare className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    name: "Monitoring",
    description: "Real-time visibility into data flows and system performance",
    icon: <LineChart className="h-8 w-8 text-[#00b8ff]" />,
  },
];

// Case studies
const caseStudies = [
  {
    title: "Global Retailer",
    description: "Unified customer data across 500+ stores to enable personalized marketing",
    result: "43% increase in campaign conversion rates",
    imageUrl: "/images/case-study-retail.jpg" // Placeholder - you can add actual images
  },
  {
    title: "Financial Services",
    description: "Modernized legacy data systems while maintaining regulatory compliance",
    result: "68% faster reporting with 99.99% accuracy",
    imageUrl: "/images/case-study-finance.jpg" // Placeholder - you can add actual images
  },
];

export default function DataArchitecturePage() {
  return (
    <PageTemplate 
      title="Data Architecture" 
      subtitle="Future-proof your business with a scalable, flexible data foundation"
    >
      {/* Hero section with visual elements */}
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
                Modern Data Architecture
              </motion.h2>
              <motion.p 
                className="text-white/70 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Build a scalable, flexible data foundation that turns information into insights and drives intelligent decision-making.
              </motion.p>
              <motion.button
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] rounded-lg text-white font-medium w-fit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Schedule Consultation <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            
            {/* Data Architecture visualization */}
            <div className="relative h-64 md:h-80">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative w-full h-full max-w-[320px] mx-auto">
                  {/* Layered data architecture visualization */}
                  <motion.div 
                    className="absolute inset-x-0 bottom-0 h-16 rounded-lg bg-gradient-to-r from-[#00b8ff]/80 to-[#0021a7]/80 border border-white/20 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="text-white text-sm font-medium">Data Lake</span>
                    <Database className="ml-2 h-4 w-4 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute inset-x-0 bottom-20 h-16 rounded-lg bg-gradient-to-r from-[#0021a7]/80 to-[#00b8ff]/80 border border-white/20 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="text-white text-sm font-medium">Data Warehouse</span>
                    <Server className="ml-2 h-4 w-4 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute inset-x-0 bottom-40 h-16 rounded-lg bg-gradient-to-r from-[#00b8ff]/80 to-[#0021a7]/80 border border-white/20 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-white text-sm font-medium">API & Services</span>
                    <CodeSquare className="ml-2 h-4 w-4 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute inset-x-0 bottom-60 h-16 rounded-lg bg-gradient-to-r from-[#0021a7]/80 to-[#00b8ff]/80 border border-white/20 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <span className="text-white text-sm font-medium">Applications & Analytics</span>
                    <LineChart className="ml-2 h-4 w-4 text-white" />
                  </motion.div>
                  
                  {/* Connection lines */}
                  <motion.div 
                    className="absolute left-1/2 bottom-16 h-4 w-0.5 bg-white/30"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ delay: 1.0 }}
                    style={{ transformOrigin: "bottom" }}
                  />
                  <motion.div 
                    className="absolute left-1/2 bottom-36 h-4 w-0.5 bg-white/30"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ delay: 1.1 }}
                    style={{ transformOrigin: "bottom" }}
                  />
                  <motion.div 
                    className="absolute left-1/2 bottom-56 h-4 w-0.5 bg-white/30"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ delay: 1.2 }}
                    style={{ transformOrigin: "bottom" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Data architecture stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 border-t border-white/10">
            <DataStatCard number="500TB+" label="Data Processed" />
            <DataStatCard number="99.9%" label="Uptime" />
            <DataStatCard number="60%" label="Cost Reduction" />
            <DataStatCard number="10x" label="Query Performance" />
          </div>
        </motion.div>
      </div>
      
      {/* Main Features Section */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Build a Foundation for Data-Driven Success</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {architectureFeatures.map((feature, index) => (
            <ServiceCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </motion.div>

      {/* Architecture Components Section */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Modern Data Architecture Components</h2>
        <p className="text-white/70 mb-8 max-w-2xl">
          A comprehensive approach to organizing, integrating, and managing your enterprise data.
        </p>
        
        <div className="border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0021a7] to-[#00b8ff] opacity-90 z-0" />
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-center">
                <div className="h-full w-full relative">
                  {/* Data architecture diagram - visual representation */}
                  <div className="absolute inset-x-0 top-0 p-6 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                    <div className="text-white font-bold">Applications & Analytics</div>
                  </div>
                  <div className="absolute inset-x-0 top-[25%] p-6 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                    <div className="text-white font-bold">API & Service Layer</div>
                  </div>
                  <div className="absolute inset-x-0 top-[50%] p-6 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                    <div className="text-white font-bold">Data Warehouse</div>
                  </div>
                  <div className="absolute inset-x-0 top-[75%] p-6 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                    <div className="text-white font-bold">Data Lake</div>
                  </div>
                  {/* Connection lines */}
                  <div className="absolute left-1/2 top-[15%] h-[10%] w-0.5 bg-white/50" />
                  <div className="absolute left-1/2 top-[40%] h-[10%] w-0.5 bg-white/50" />
                  <div className="absolute left-1/2 top-[65%] h-[10%] w-0.5 bg-white/50" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {architectureComponents.map((component, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all flex items-start gap-4 group"
                  whileHover={{ y: -5 }}
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">{component.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{component.name}</h3>
                    <p className="text-white/70">{component.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Case Studies Section */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Success Stories</h2>
        <p className="text-white/70 mb-8 max-w-2xl">
          See how our data architecture solutions have transformed businesses.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all h-full flex flex-col group"
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0021a7] to-[#00b8ff] opacity-80" />
                {/* Uncomment when you have actual images */}
                {/* <Image
                  src={study.imageUrl}
                  alt={study.title}
                  fill
                  className="object-cover"
                /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-white/70 mb-4">{study.description}</p>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10 mb-4">
                  <p className="font-semibold text-[#00b8ff]">{study.result}</p>
                </div>
                <button className="text-[#00b8ff] flex items-center gap-1 hover:gap-2 transition-all">
                  View Case Study <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/work/case-studies">
            <button className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-all mx-auto">
              View All Case Studies <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </motion.div>
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
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Ready to Transform Your Data Architecture?</h2>
            <p className="text-white/70 max-w-xl">
              Let's discuss how we can help you build a modern, scalable data foundation that drives business growth.
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
