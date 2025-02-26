"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Palette, Layout, Layers, PenTool, Monitor, Figma } from "lucide-react"
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

export default function DigitalDesignPage() {
  const [activeTab, setActiveTab] = useState("branding")
  
  return (
    <PageTemplate 
      title="Graphic Design Services"
      subtitle="Creating visually stunning and impactful designs that elevate your brand"
    >
      {/* Hero section with visual elements */}
      <motion.div 
        className="relative overflow-hidden rounded-2xl mb-16 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20 border border-white/10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#00b8ff]/20 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#0021a7]/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="space-y-6 flex flex-col justify-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transform Your Vision Into Reality
            </motion.h2>
            <motion.p 
              className="text-white/70 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Our expert designers blend creativity with strategic thinking to deliver designs that captivate your audience and achieve your business goals.
            </motion.p>
          </div>
          <div className="relative h-64 md:h-auto">
            <Image
              src="/images/team/duyen.jpg"
              alt="Design Showcase"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
          </div>
        </div>
      </motion.div>

      {/* Services with icons */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Our Design Services</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard 
            icon={<Palette className="h-8 w-8 text-[#00b8ff]" />}
            title="Brand Identity"
            description="We create distinctive visual identities that reflect your brand's personality and resonate with your target audience."
          />
          <ServiceCard 
            icon={<Layout className="h-8 w-8 text-[#00b8ff]" />}
            title="UI/UX Design"
            description="User-centered interface and experience design that enhances usability while maintaining visual appeal."
          />
          <ServiceCard 
            icon={<PenTool className="h-8 w-8 text-[#00b8ff]" />}
            title="Illustration"
            description="Custom illustrations and graphics that bring your ideas to life and add a unique touch to your brand."
          />
          <ServiceCard 
            icon={<Monitor className="h-8 w-8 text-[#00b8ff]" />}
            title="Web Design"
            description="Responsive, modern web designs that provide an exceptional user experience across all devices."
          />
          <ServiceCard 
            icon={<Layers className="h-8 w-8 text-[#00b8ff]" />}
            title="Print Design"
            description="High-quality print materials from business cards to brochures that make a lasting impression."
          />
          <ServiceCard 
            icon={<Figma className="h-8 w-8 text-[#00b8ff]" />}
            title="Prototyping"
            description="Interactive prototypes that visualize your product before development, saving time and resources."
          />
        </div>
      </motion.div>

      {/* Design Process with visual timeline */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Our Design Process</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00b8ff] to-[#0021a7] hidden md:block" />
          
          <div className="space-y-12 relative">
            <ProcessStep 
              number="01"
              title="Discovery & Research"
              description="We begin by understanding your brand, audience, and objectives through in-depth research and consultation."
            />
            <ProcessStep 
              number="02"
              title="Concept Development"
              description="Our designers create initial concepts based on research insights, exploring different creative directions."
            />
            <ProcessStep 
              number="03"
              title="Design Refinement"
              description="We iterate on the selected concept, refining every detail based on your feedback and design principles."
            />
            <ProcessStep 
              number="04"
              title="Implementation"
              description="The finalized designs are prepared for their intended use, whether digital platforms or print production."
            />
            <ProcessStep 
              number="05"
              title="Evaluation & Support"
              description="We measure the effectiveness of the design and provide ongoing support to ensure lasting success."
            />
          </div>
        </div>
      </motion.div>

      {/* Portfolio showcase with tabs */}
      <motion.div 
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Our Work</h2>
        
        {/* Portfolio tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <PortfolioTab 
            active={activeTab === "branding"} 
            onClick={() => setActiveTab("branding")}
          >
            Branding
          </PortfolioTab>
          <PortfolioTab 
            active={activeTab === "web"} 
            onClick={() => setActiveTab("web")}
          >
            Web Design
          </PortfolioTab>
          <PortfolioTab 
            active={activeTab === "ui"} 
            onClick={() => setActiveTab("ui")}
          >
            UI/UX
          </PortfolioTab>
          <PortfolioTab 
            active={activeTab === "print"} 
            onClick={() => setActiveTab("print")}
          >
            Print
          </PortfolioTab>
        </div>
        
        {/* Portfolio grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Using the same image for demo purposes - replace with actual portfolio images */}
          <PortfolioItem image="/images/team/duyen.jpg" title="Brand Identity" client="Tech Innovators" />
          <PortfolioItem image="/images/team/duyen.jpg" title="Website Redesign" client="Global Finance" />
          <PortfolioItem image="/images/team/duyen.jpg" title="Mobile App UI" client="Health & Wellness" />
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
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Ready to Transform Your Brand?</h2>
            <p className="text-white/70 max-w-xl">
              Let's collaborate to create designs that elevate your brand and connect with your audience. Contact us today to discuss your project.
            </p>
          </div>
          <motion.button
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
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

// Process step component
function ProcessStep({ 
  number, 
  title, 
  description 
}: { 
  number: string; 
  title: string; 
  description: string;
}) {
  return (
    <motion.div
      className="flex gap-6"
      variants={fadeIn}
    >
      <div className="flex-shrink-0 relative">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] flex items-center justify-center text-white font-bold z-10 relative">
          {number}
        </div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </motion.div>
  );
}

// Portfolio tab component
function PortfolioTab({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active 
          ? 'bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white' 
          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

// Portfolio item component
function PortfolioItem({ 
  image, 
  title, 
  client 
}: { 
  image: string; 
  title: string; 
  client: string;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl aspect-[4/3]"
      variants={fadeIn}
      whileHover={{ y: -5 }}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-white/80">{client}</p>
      </div>
    </motion.div>
  );
}
