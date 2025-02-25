"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowRight, ChevronRight, ChevronLeft, Eye, PenTool, Type, Palette, Grid, Layout, Share2 } from "lucide-react"
import PageTemplate from "@/components/templates/page-template"

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

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
}

export default function BrandIdentityPage() {
  const [activeGuidelineIndex, setActiveGuidelineIndex] = useState(0);
  const containerRef = useRef(null);
  
  // Brand guideline tabs
  const guidelines = [
    {
      id: "colors",
      title: "Color Palette",
      icon: <Palette className="h-5 w-5" />,
      content: <ColorPaletteContent />
    },
    {
      id: "typography",
      title: "Typography",
      icon: <Type className="h-5 w-5" />,
      content: <TypographyContent />
    },
    {
      id: "logo",
      title: "Logo Usage",
      icon: <PenTool className="h-5 w-5" />,
      content: <LogoUsageContent />
    },
    {
      id: "grid",
      title: "Grid System",
      icon: <Grid className="h-5 w-5" />,
      content: <GridSystemContent />
    },
    {
      id: "applications",
      title: "Applications",
      icon: <Layout className="h-5 w-5" />,
      content: <ApplicationsContent />
    }
  ];
  
  const nextGuideline = () => {
    setActiveGuidelineIndex((prev) => 
      prev === guidelines.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevGuideline = () => {
    setActiveGuidelineIndex((prev) => 
      prev === 0 ? guidelines.length - 1 : prev - 1
    );
  };
  
  // Portfolio items
  const portfolioItems = [
    {
      title: "Modern Tech Rebrand",
      description: "Complete brand overhaul for a technology company, including logo design, color system, and brand guidelines.",
      image: "/images/team/duyen.jpg"
    },
    {
      title: "Luxury Fashion Identity",
      description: "Sophisticated brand identity for a high-end fashion label with custom typography and elegant visual language.",
      image: "/images/team/duyen.jpg"
    },
    {
      title: "Food Delivery App",
      description: "Vibrant, playful brand system for a food delivery startup that stands out in a competitive market.",
      image: "/images/team/duyen.jpg"
    }
  ];
  
  return (
    <PageTemplate 
      title="Brand Identity"
      subtitle="Creating distinctive, memorable, and cohesive brand experiences"
    >
      {/* Hero section with brand visuals */}
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#00b8ff]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#0021a7]/10 rounded-full blur-3xl" />
        
        <motion.div 
          className="relative z-10 overflow-hidden rounded-2xl mb-20 border border-white/10 bg-white/5 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
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
                Your Brand. Your Story.
              </motion.h2>
              <motion.p 
                className="text-white/70 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                We craft distinctive brand identities that capture your essence and resonate with your audience, creating lasting impressions in a crowded marketplace.
              </motion.p>
              <motion.button
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] rounded-lg text-white font-medium w-fit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Explore Our Process <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            
            {/* Brand mark animation */}
            <div className="relative h-64 md:h-80">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative w-40 h-40 md:w-56 md:h-56">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] opacity-70" />
                  <motion.div 
                    className="absolute inset-4 rounded-full bg-black flex items-center justify-center"
                    animate={{ 
                      boxShadow: ["0 0 0 0 rgba(0,184,255,0)", "0 0 0 15px rgba(0,184,255,0.2)", "0 0 0 0 rgba(0,184,255,0)"] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-3xl md:text-5xl font-black bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                      TTI
                    </span>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Orbiting elements */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center center" }}
              >
                <motion.div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#00b8ff] rounded-full"
                  whileHover={{ scale: 1.5 }}
                />
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 left-1/2 w-full h-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center center" }}
              >
                <motion.div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#0021a7] rounded-full"
                  whileHover={{ scale: 1.5 }}
                />
              </motion.div>
            </div>
          </div>
          
          {/* Brand stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 border-t border-white/10">
            <BrandStatCard number="750+" label="Brands Created" />
            <BrandStatCard number="95%" label="Client Satisfaction" />
            <BrandStatCard number="12+" label="Industry Awards" />
            <BrandStatCard number="15+" label="Years Experience" />
          </div>
        </motion.div>
      </div>
      
      {/* Services section */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Our Branding Services</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard 
            icon={<PenTool className="h-8 w-8 text-[#00b8ff]" />}
            title="Logo Design"
            description="Crafting distinctive, memorable logos that embody your brand essence and stand the test of time."
          />
          <ServiceCard 
            icon={<Palette className="h-8 w-8 text-[#00b8ff]" />}
            title="Visual Identity"
            description="Developing comprehensive visual systems including color palettes, typography, and design elements."
          />
          <ServiceCard 
            icon={<Layout className="h-8 w-8 text-[#00b8ff]" />}
            title="Brand Guidelines"
            description="Creating detailed documentation to ensure consistent brand application across all touchpoints."
          />
          <ServiceCard 
            icon={<Type className="h-8 w-8 text-[#00b8ff]" />}
            title="Brand Messaging"
            description="Defining your brand voice, messaging hierarchy, and communication strategy."
          />
          <ServiceCard 
            icon={<Share2 className="h-8 w-8 text-[#00b8ff]" />}
            title="Brand Strategy"
            description="Developing strategic positioning and brand architecture aligned with business objectives."
          />
          <ServiceCard 
            icon={<Eye className="h-8 w-8 text-[#00b8ff]" />}
            title="Brand Audit"
            description="Analyzing existing brand assets and perception to identify opportunities for improvement."
          />
        </div>
      </motion.div>
      
      {/* Interactive brand guideline section */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        ref={containerRef}
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Interactive Brand Guidelines</h2>
        <p className="text-white/70 mb-8 max-w-2xl">
          Explore how we bring brands to life through comprehensive guidelines that ensure consistency and impact across all touchpoints.
        </p>
        
        <div className="border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5">
          {/* Navigation tabs */}
          <div className="flex overflow-x-auto border-b border-white/10 p-4">
            {guidelines.map((guideline, index) => (
              <button
                key={guideline.id}
                onClick={() => setActiveGuidelineIndex(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap mr-2 transition-all ${
                  index === activeGuidelineIndex
                    ? 'bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {guideline.icon}
                {guideline.title}
              </button>
            ))}
          </div>
          
          {/* Content area */}
          <div className="relative min-h-[400px] p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGuidelineIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {guidelines[activeGuidelineIndex].content}
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button
                onClick={prevGuideline}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextGuideline}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Portfolio section */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Our Branding Work</h2>
        <p className="text-white/70 mb-8 max-w-2xl">
          Explore some of our recent branding projects that have helped businesses transform their market presence.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <PortfolioCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              index={index}
            />
          ))}
        </div>
      </motion.div>
      
      {/* CTA section */}
      <motion.div 
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#00b8ff]/10 to-[#0021a7]/10 p-8 md:p-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Ready to Build Your Brand?</h2>
            <p className="text-white/70 max-w-xl">
              Let's work together to create a compelling brand identity that captures your essence and connects with your audience.
            </p>
          </div>
          <motion.button
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
          </motion.button>
        </div>
      </motion.div>
    </PageTemplate>
  )
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

// Brand stat card component
function BrandStatCard({ 
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

// Portfolio card component
function PortfolioCard({ 
  title, 
  description, 
  image, 
  index 
}: { 
  title: string; 
  description: string; 
  image: string;
  index: number;
}) {
  return (
    <motion.div
      className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all h-full flex flex-col"
      variants={fadeIn}
      whileHover={{ y: -5 }}
      transition={{ delay: index * 0.1 }}
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
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/70 mb-4">{description}</p>
        <button className="text-[#00b8ff] flex items-center gap-1 hover:gap-2 transition-all">
          View Case Study <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

// Brand guideline content components
function ColorPaletteContent() {
  const colors = [
    { name: "Primary Blue", hex: "#00b8ff", rgb: "0, 184, 255" },
    { name: "Deep Blue", hex: "#0021a7", rgb: "0, 33, 167" },
    { name: "Midnight", hex: "#121212", rgb: "18, 18, 18" },
    { name: "Slate", hex: "#64748b", rgb: "100, 116, 139" },
    { name: "Light Gray", hex: "#e2e8f0", rgb: "226, 232, 240" },
    { name: "Accent", hex: "#ff3366", rgb: "255, 51, 102" },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Brand Color Palette</h3>
        <p className="text-white/70 mb-6">
          Our color palette combines vibrant blues with sophisticated neutrals to create a modern, trustworthy visual identity. The primary blue represents innovation, while deep blue conveys reliability and professionalism.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {colors.map((color, index) => (
          <motion.div
            key={color.name}
            className="rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div 
              className="h-24 w-full" 
              style={{ backgroundColor: color.hex }}
            />
            <div className="p-3 bg-white/5 border-t border-white/10">
              <p className="font-medium">{color.name}</p>
              <p className="text-sm text-white/70">{color.hex}</p>
              <p className="text-sm text-white/70">RGB: {color.rgb}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TypographyContent() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Typography System</h3>
        <p className="text-white/70 mb-6">
          Our typography system uses a careful balance of modern and readable fonts that complement our brand personality and ensure consistency across all communications.
        </p>
      </div>
      
      <div className="space-y-6">
        <motion.div
          className="p-6 border border-white/10 rounded-lg bg-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-sm text-white/70 mb-2">Primary Heading Font</p>
          <h2 className="text-4xl font-bold">Inter Display</h2>
          <p className="text-white/70 mt-2">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>abcdefghijklmnopqrstuvwxyz<br/>1234567890</p>
        </motion.div>
        
        <motion.div
          className="p-6 border border-white/10 rounded-lg bg-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-white/70 mb-2">Body Text Font</p>
          <h2 className="text-xl">Inter</h2>
          <p className="text-white/70 mt-2">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>abcdefghijklmnopqrstuvwxyz<br/>1234567890</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <motion.div
            className="p-4 border border-white/10 rounded-lg bg-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-white/70 mb-2">Heading Styles</p>
            <h1 className="text-3xl font-bold mb-2">H1 Heading</h1>
            <h2 className="text-2xl font-bold mb-2">H2 Heading</h2>
            <h3 className="text-xl font-bold mb-2">H3 Heading</h3>
            <h4 className="text-lg font-bold">H4 Heading</h4>
          </motion.div>
          
          <motion.div
            className="p-4 border border-white/10 rounded-lg bg-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-white/70 mb-2">Body Styles</p>
            <p className="mb-2">Body text (Regular 16px)</p>
            <p className="text-sm mb-2">Small text (14px)</p>
            <p className="text-xs mb-2">Extra small text (12px)</p>
            <p className="font-medium">Medium emphasis text</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function LogoUsageContent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Logo Usage Guidelines</h3>
        <p className="text-white/70 mb-6">
          Our logo is the cornerstone of our brand identity. These guidelines ensure that it is used correctly and consistently across all applications.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          className="rounded-lg overflow-hidden border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white/5 p-6 flex items-center justify-center h-48">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
                <span className="text-3xl font-black bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                  TTI
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-white/10 bg-black">
            <p className="font-medium">Primary Logo</p>
            <p className="text-sm text-white/70">Full color on dark backgrounds</p>
          </div>
        </motion.div>
        
        <motion.div
          className="rounded-lg overflow-hidden border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white p-6 flex items-center justify-center h-48">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                <span className="text-3xl font-black bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                  TTI
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-white/10 bg-black">
            <p className="font-medium">Light Version</p>
            <p className="text-sm text-white/70">For use on light backgrounds</p>
          </div>
        </motion.div>
        
        <motion.div
          className="rounded-lg overflow-hidden border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white/5 p-6 space-y-4">
            <h4 className="font-medium">Clearspace</h4>
            <div className="relative flex items-center justify-center">
              <div className="border-2 border-dashed border-white/30 w-48 h-48 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
                    <span className="text-3xl font-black bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                      TTI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-white/10 bg-black">
            <p className="text-sm text-white/70">Maintain minimum clearspace equal to 25% of the logo's width</p>
          </div>
        </motion.div>
        
        <motion.div
          className="rounded-lg overflow-hidden border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/5 p-6 space-y-4">
            <h4 className="font-medium">Incorrect Usage</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded border border-red-500/50 p-3 flex items-center justify-center h-16">
                <div className="w-10 h-10 rounded-full bg-[#FF5533] flex items-center justify-center">
                  <span className="text-sm font-black text-white">TTI</span>
                </div>
              </div>
              <div className="rounded border border-red-500/50 p-3 flex items-center justify-center h-16">
                <div className="w-16 h-8 rounded-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
                  <span className="text-sm font-black text-white">TTI</span>
                </div>
              </div>
              <div className="rounded border border-red-500/50 p-3 flex items-center justify-center h-16">
                <div className="rotate-45 w-10 h-10 rounded-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] flex items-center justify-center">
                  <span className="text-sm font-black text-white">TTI</span>
                </div>
              </div>
              <div className="rounded border border-red-500/50 p-3 flex items-center justify-center h-16">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] flex items-center justify-center shadow-lg">
                  <span className="text-sm font-black text-white drop-shadow-lg">TTI</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-white/10 bg-black">
            <p className="text-sm text-white/70">Don't alter colors, proportions, add effects, or rotate the logo</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function GridSystemContent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Grid System</h3>
        <p className="text-white/70 mb-6">
          Our grid system provides structure and consistency across all branded materials, ensuring balance and harmony in layouts.
        </p>
      </div>
      
      <motion.div
        className="p-6 border border-white/10 rounded-lg bg-white/5 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h4 className="font-medium mb-4">12-Column Layout System</h4>
        <div className="w-full h-48 relative bg-black/20 rounded overflow-hidden">
          {/* Grid visualization */}
          <div className="absolute inset-0 grid grid-cols-12 gap-2 p-4">
            {Array(12).fill(0).map((_, i) => (
              <motion.div 
                key={i}
                className="h-full bg-[#00b8ff]/20 rounded"
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              />
            ))}
          </div>
          
          {/* Example layout elements */}
          <motion.div
            className="absolute inset-4 grid grid-cols-12 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="col-span-8 bg-[#00b8ff]/40 rounded h-16" />
            <div className="col-span-4 bg-[#0021a7]/40 rounded h-16" />
            
            <div className="col-span-4 bg-[#0021a7]/40 rounded h-16" />
            <div className="col-span-4 bg-[#00b8ff]/40 rounded h-16" />
            <div className="col-span-4 bg-[#0021a7]/40 rounded h-16" />
          </motion.div>
        </div>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          className="p-4 border border-white/10 rounded-lg bg-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-medium mb-3">Margins & Padding</h4>
          <div className="w-full aspect-video relative bg-black/20 rounded overflow-hidden p-4">
            <div className="border-2 border-dashed border-[#00b8ff]/50 h-full w-full rounded flex items-center justify-center">
              <div className="bg-[#00b8ff]/30 w-3/4 h-3/4 rounded flex items-center justify-center">
                <p className="text-xs text-white/70">Content Area</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-white/70 mt-2">Consistent margin and padding scales ensure visual harmony</p>
        </motion.div>
        
        <motion.div
          className="p-4 border border-white/10 rounded-lg bg-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-medium mb-3">Responsive Breakpoints</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-12 h-6 bg-[#00b8ff]/30 rounded mr-3"></div>
              <p>Mobile: 320px - 639px</p>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-6 bg-[#00b8ff]/50 rounded mr-3"></div>
              <p>Tablet: 640px - 1023px</p>
            </div>
            <div className="flex items-center">
              <div className="w-20 h-6 bg-[#00b8ff]/70 rounded mr-3"></div>
              <p>Desktop: 1024px - 1279px</p>
            </div>
            <div className="flex items-center">
              <div className="w-24 h-6 bg-[#00b8ff]/90 rounded mr-3"></div>
              <p>Large: 1280px and above</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ApplicationsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Brand Applications</h3>
        <p className="text-white/70 mb-6">
          Examples of how our brand identity is applied across different mediums and touchpoints to create a cohesive brand experience.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          className="rounded-lg overflow-hidden border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative h-48">
            <Image
              src="/images/team/duyen.jpg"
              alt="Business Cards"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-white font-medium">Business Cards</h4>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="rounded-lg overflow-hidden border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative h-48">
            <Image
              src="/images/team/duyen.jpg"
              alt="Website Design"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-white font-medium">Website</h4>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="rounded-lg overflow-hidden border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative h-48">
            <Image
              src="/images/team/duyen.jpg"
              alt="Social Media"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-white font-medium">Social Media</h4>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="rounded-lg overflow-hidden border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative h-48">
            <Image
              src="/images/team/duyen.jpg"
              alt="Packaging"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-white font-medium">Packaging</h4>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
