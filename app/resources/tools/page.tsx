"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Mail, Calendar, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

interface ToolCard {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  gradient: {
    from: string;
    to: string;
  };
  features: string[];
  comingSoon?: boolean;
}

const tools: ToolCard[] = [
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description: 'Create custom QR codes for your business needs with advanced styling options and analytics.',
    longDescription: 'Generate professional QR codes with custom colors, logos, and tracking capabilities. Perfect for marketing campaigns, business cards, and event management.',
    icon: <QrCode className="h-8 w-8" />,
    gradient: {
      from: '#00b8ff',
      to: '#0021a7',
    },
    features: [
      'Custom styling and colors',
      'Logo embedding',
      'Multiple formats (URL, Text, WiFi, etc.)',
      'High-resolution downloads',
      'Analytics tracking',
      'Batch generation'
    ],
  },
  {
    id: 'email-generator',
    title: 'Email Generator',
    description: 'Professional email template generator with responsive designs and customizable layouts.',
    longDescription: 'Create stunning email templates with drag-and-drop functionality, pre-built components, and responsive designs that work across all email clients.',
    icon: <Mail className="h-8 w-8" />,
    gradient: {
      from: '#00b8ff',
      to: '#9400d3',
    },
    features: [
      'Drag & drop editor',
      'Responsive templates',
      'Pre-built components',
      'A/B testing support',
      'Email client testing',
      'Export to major platforms'
    ],
  },
  {
    id: 'life-in-weeks',
    title: 'Life in Weeks',
    description: 'Visualize your life journey with an interactive timeline showing weeks lived and remaining.',
    longDescription: 'A powerful visualization tool that helps you understand the value of time by showing your life in weeks. Add milestones, set goals, and gain perspective on your journey.',
    icon: <Calendar className="h-8 w-8" />,
    gradient: {
      from: '#00b8ff',
      to: '#ff6b6b',
    },
    features: [
      'Interactive life visualization',
      'Milestone tracking',
      'Goal setting and progress',
      'Life statistics',
      'Motivational insights',
      'Shareable life charts'
    ],
  },
];

export default function ToolsPage() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const handleToolClick = (toolId: string) => {
    const toolUrls: Record<string, string> = {
      'qr-generator': 'https://qr.tonytechinsights.com/',
      'email-generator': 'https://emailgen.tonytechinsights.com/',
      'life-in-weeks': 'https://lifespanweek.vercel.app/'
    };
    
    const url = toolUrls[toolId];
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0021a7] to-[#00b8ff] opacity-20"></div>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent"
              variants={fadeIn}
            >
              Company Tools
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/80"
              variants={fadeIn}
            >
              Powerful utilities designed to streamline your workflow and boost productivity
            </motion.p>
            <motion.div 
              className="flex items-center justify-center gap-2 text-[#00b8ff]"
              variants={fadeIn}
            >
              <Sparkles className="h-5 w-5" />
              <span className="text-lg font-medium">Free to use • No registration required</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={fadeIn}
                onHoverStart={() => setHoveredTool(tool.id)}
                onHoverEnd={() => setHoveredTool(null)}
                className="group cursor-pointer"
                onClick={() => handleToolClick(tool.id)}
              >
                <Card
                  className={cn(
                    "relative h-full overflow-hidden rounded-2xl border border-[#0021a7]/30 bg-black/50 backdrop-blur-sm transition-all duration-500",
                    "hover:border-[#00b8ff] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00b8ff]/20",
                    hoveredTool === tool.id && "scale-105"
                  )}
                >
                  {/* Background gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${tool.gradient.from}15, ${tool.gradient.to}15)`,
                    }}
                  />

                  <div className="relative p-8 space-y-6">
                    {/* Icon */}
                    <div className="relative inline-flex">
                      <div
                        className="rounded-2xl p-4 text-white transition-all duration-500 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${tool.gradient.from}, ${tool.gradient.to})`,
                        }}
                      >
                        {tool.icon}
                      </div>
                      <div
                        className="absolute inset-0 rounded-2xl opacity-50 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl"
                        style={{
                          background: `linear-gradient(135deg, ${tool.gradient.from}, ${tool.gradient.to})`,
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#00b8ff] transition-colors duration-300">
                        {tool.title}
                      </h3>
                    </div>

                    {/* Action button */}
                    <motion.div
                      className="flex items-center gap-2 pt-4"
                      style={{ color: tool.gradient.from }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <span className="font-semibold">Launch Tool</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.div>
                  </div>

                  {/* Coming soon badge (if applicable) */}
                  {tool.comingSoon && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Coming Soon
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* More tools note */}
          <motion.div
            className="text-center mt-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-white/60 text-lg">
              More tools coming soon...
            </p>
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-gradient-to-r from-[#0021a7]/20 to-[#00b8ff]/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              More Tools Coming Soon
            </h2>
            <p className="text-white/70 text-lg mb-8">
              We're continuously developing new tools to help streamline your workflow. 
              Have a suggestion for a tool you'd like to see? Let us know!
            </p>
            <motion.button
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-[#00b8ff]/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="h-4 w-4" />
              Suggest a Tool
              <ExternalLink className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Tagline Banner */}
      <section className="py-12 bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider">
            INNOVATING FOR LIMITLESS GROWTH
          </h2>
        </div>
      </section>
    </div>
  );
} 