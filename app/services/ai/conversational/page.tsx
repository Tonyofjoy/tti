"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Bot, 
  Mic, 
  Cpu, 
  BrainCircuit, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  Code,
  Server,
  Fingerprint
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

const pulseAnimation = {
  initial: { scale: 0.95, opacity: 0.8 },
  animate: {
    scale: [0.95, 1.05, 0.95],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

const techCircleAnimation = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360,
    transition: {
      duration: 50,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// AI solutions
const aiSolutions = [
  {
    title: "Intelligent Chatbots",
    description: "Build conversational interfaces that understand context, sentiment, and intent to provide human-like interactions",
    icon: <MessageSquare className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Virtual Assistants",
    description: "Create AI assistants that learn from user behavior to automate tasks, answer questions, and improve productivity",
    icon: <Bot className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Voice Interfaces",
    description: "Develop natural voice-powered experiences that understand spoken language and respond with human-like speech",
    icon: <Mic className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Omnichannel Deployment",
    description: "Deploy conversational AI across websites, mobile apps, messaging platforms, and voice channels for seamless engagement",
    icon: <Globe className="h-8 w-8 text-[#00b8ff]" />,
  },
];

// AI capabilities
const aiCapabilities = [
  {
    title: "Natural Language Understanding",
    description: "Advanced NLU capabilities that comprehend context, sentiment, and subtle language nuances",
    icon: <BrainCircuit className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Continuous Learning",
    description: "Self-improving AI that learns from every interaction to enhance accuracy and effectiveness over time",
    icon: <Cpu className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Enterprise Integration",
    description: "Seamless integration with CRM, ERP, and knowledge management systems for data-driven conversations",
    icon: <Server className="h-8 w-8 text-[#00b8ff]" />,
  },
];

// Sample conversation for the chat demo
const sampleConversation = [
  { role: "user", message: "I need help setting up a conversational AI for customer support." },
  { role: "ai", message: "I can help with that. What specific challenges are you trying to address with conversational AI?" },
  { role: "user", message: "We want to reduce response time and handle basic inquiries automatically." },
  { role: "ai", message: "That's a common use case. Our solution can reduce response times by 85% and handle up to 70% of routine inquiries without human intervention. Would you like to see how it works with your specific data?" },
  { role: "user", message: "Yes, that sounds promising. What kind of data would you need?" },
  { role: "ai", message: "Great! We'd need samples of customer inquiries, your FAQ documentation, and any existing response templates. We can then train a custom model that aligns with your brand voice and business processes." },
];

// Key metrics
const keyMetrics = [
  {
    title: "85%",
    description: "Faster response time to customer inquiries",
  },
  {
    title: "70%",
    description: "Reduction in support ticket volume",
  },
  {
    title: "24/7",
    description: "Always-on customer engagement",
  },
  {
    title: "90%",
    description: "Customer satisfaction with AI responses",
  },
];

// Use cases
const useCases = [
  {
    title: "Customer Support",
    description: "Provide instant, 24/7 customer service that resolves common issues, answers questions, and routes complex cases to human agents.",
    icon: <CheckCircle2 className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Sales & Lead Generation",
    description: "Engage website visitors, qualify leads, and guide customers through the purchasing process with intelligent conversation.",
    icon: <Zap className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Internal Knowledge Access",
    description: "Give employees quick access to company information through conversational interfaces that understand natural questions.",
    icon: <Code className="h-8 w-8 text-[#00b8ff]" />,
  },
];

export default function ConversationalAIPage() {
  const [chatIndex, setChatIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  const [techNodes, setTechNodes] = useState<Array<{x: number, y: number, size: number}>>([]);
  
  // Generate tech node positioning
  useEffect(() => {
    const nodes = [];
    for (let i = 0; i < 15; i++) {
      nodes.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 3,
      });
    }
    setTechNodes(nodes);
  }, []);
  
  // Auto-advance the chat demonstration
  useEffect(() => {
    if (chatIndex < sampleConversation.length) {
      setTyping(true);
      const timeout = setTimeout(() => {
        setTyping(false);
        if (chatIndex < sampleConversation.length - 1) {
          const nextTimeout = setTimeout(() => {
            setChatIndex(prev => prev + 1);
          }, 1000);
          return () => clearTimeout(nextTimeout);
        }
      }, 2000);
      
      return () => clearTimeout(timeout);
    } else {
      // Reset the conversation after a pause
      const resetTimeout = setTimeout(() => {
        setChatIndex(0);
      }, 5000);
      
      return () => clearTimeout(resetTimeout);
    }
  }, [chatIndex]);

  return (
    <PageTemplate 
      title="Conversational AI" 
      subtitle="Build intelligent, human-like conversational experiences that transform how businesses interact with users"
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
                Next-Generation Conversational AI
              </motion.h2>
              <motion.p 
                className="text-white/70 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Create intelligent, responsive, and human-like conversational experiences that transform how you engage with customers and streamline operations.
              </motion.p>
            </div>
            
            {/* AI Brain Visualization */}
            <div className="relative h-64 md:h-80">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative w-full h-full max-w-[320px] mx-auto">
                  {/* Neural network visualization */}
                  <div className="relative w-full h-full">
                    {/* Central brain/AI node */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-[#00b8ff]/30 to-[#0021a7]/30 flex items-center justify-center backdrop-blur-sm border border-white/20 z-20"
                      variants={pulseAnimation}
                      initial="initial"
                      animate="animate"
                    >
                      <BrainCircuit className="h-12 w-12 text-[#00b8ff]" />
                    </motion.div>
                    
                    {/* Tech nodes */}
                    {techNodes.map((node, index) => (
                      <motion.div 
                        key={index}
                        className="absolute rounded-full bg-[#00b8ff] opacity-60"
                        style={{
                          width: `${node.size}px`,
                          height: `${node.size}px`,
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                        }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 3 + index % 3,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                    ))}
                    
                    {/* Connection lines */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-dashed border-[#00b8ff]/30 z-10"
                      variants={techCircleAnimation}
                      initial="initial"
                      animate="animate"
                    />
                    
                    <motion.div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-dashed border-[#0021a7]/30 z-10"
                      variants={techCircleAnimation}
                      initial="initial"
                      animate="animate"
                      style={{ animationDirection: "reverse" }}
                      transition={{ duration: 40 }}
                    />
                    
                    <motion.div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-2 border-dashed border-[#00b8ff]/20 z-10"
                      variants={techCircleAnimation}
                      initial="initial"
                      animate="animate"
                      transition={{ duration: 30 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 border-t border-white/10">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeIn}
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">{metric.title}</p>
                <p className="text-white/70 text-sm">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* AI Chat Demo */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Experience AI Conversation</h2>
        <p className="text-white/70 mb-8 max-w-2xl">
          See how our conversational AI creates natural, helpful interactions
        </p>
        
        <div className="border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5">
          {/* Chat interface header */}
          <div className="p-4 border-b border-white/10 flex items-center">
            <Bot className="h-6 w-6 text-[#00b8ff] mr-2" />
            <span className="text-white font-medium">AI Assistant</span>
            <span className="ml-2 px-2 py-0.5 text-xs bg-[#00b8ff]/20 rounded-full text-[#00b8ff]">Online</span>
          </div>
          
          {/* Chat messages */}
          <div className="p-6 h-[400px] overflow-y-auto flex flex-col space-y-4">
            <AnimatePresence>
              {sampleConversation.slice(0, chatIndex + 1).map((message, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white'
                      : 'bg-white/10 text-white'
                  }`}>
                    <p>{message.message}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing indicator */}
            {typing && chatIndex < sampleConversation.length && sampleConversation[chatIndex].role === 'ai' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center self-start bg-white/10 rounded-2xl p-4"
              >
                <span className="flex space-x-1">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-[#00b8ff]"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-[#00b8ff]"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                  />
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-[#00b8ff]"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                  />
                </span>
              </motion.div>
            )}
          </div>
          
          {/* Chat input field */}
          <div className="p-4 border-t border-white/10 flex items-center">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white/50">
              Type your message...
            </div>
            <button className="ml-2 p-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7]">
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* AI Solutions */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Conversational AI Solutions</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {aiSolutions.map((solution, index) => (
            <ServiceCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Technology Stack */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Cutting-Edge AI Technology</h2>
        <p className="text-white/70 mb-8 max-w-2xl">
          Our solutions leverage the latest advancements in AI and machine learning
        </p>
        
        <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          {/* Tech background animation */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" className="opacity-10">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 40 10 M 10 0 L 10 40" stroke="white" strokeWidth="0.5" fill="none" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
            {/* Moving light effect */}
            <motion.div 
              className="absolute top-1/2 left-0 w-20 h-40 bg-gradient-to-r from-[#00b8ff]/30 to-transparent blur-xl"
              animate={{ 
                left: ['0%', '100%'],
                opacity: [0, 1, 0] 
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <Fingerprint className="h-10 w-10 text-[#00b8ff]" />
              <h3 className="text-xl font-bold text-white">AI Model Architecture</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Large Language Models (LLMs)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Transformer-based neural networks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Transfer learning techniques</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Context-aware embeddings</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <BrainCircuit className="h-10 w-10 text-[#00b8ff]" />
              <h3 className="text-xl font-bold text-white">AI Capabilities</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Semantic understanding</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Sentiment analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Intent recognition</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Contextual memory</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <Server className="h-10 w-10 text-[#00b8ff]" />
              <h3 className="text-xl font-bold text-white">Technical Features</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Real-time response generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Multi-language support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Continuous model improvement</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b8ff]"></span>
                  <span>Low-latency architecture</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* AI Capabilities */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Core AI Capabilities</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {aiCapabilities.map((capability, index) => (
            <ServiceCard
              key={index}
              icon={capability.icon}
              title={capability.title}
              description={capability.description}
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
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Business Use Cases</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <ServiceCard
              key={index}
              icon={useCase.icon}
              title={useCase.title}
              description={useCase.description}
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
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Transform Your Customer Experience with AI</h2>
            <p className="text-white/70 max-w-xl">
              Schedule a consultation with our AI experts to discover how conversational AI can elevate your customer engagement and operational efficiency.
            </p>
          </div>
          <motion.button
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your AI Journey
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
