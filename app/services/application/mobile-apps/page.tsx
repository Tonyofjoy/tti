"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Tablet,
  Laptop,
  Code,
  ZapIcon,
  Globe,
  ArrowRight,
  BellRing,
  Wifi,
  BarChart,
  ShieldCheck,
  Fingerprint,
  Share2,
  Repeat,
  Compass,
  LayoutGrid,
  MessageSquare,
  CheckCircle2,
  Settings,
  RefreshCcw
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

const slideInLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6 } },
};

const phoneAnimation = {
  initial: { rotate: 0 },
  animate: { 
    rotate: [0, -3, 3, -3, 0],
    transition: {
      delay: 1,
      duration: 2,
      repeat: Infinity,
      repeatDelay: 5,
      ease: "easeInOut",
    }
  }
};

// Mobile solutions
const mobileSolutions = [
  {
    title: "Native Apps",
    description: "High-performance applications built specifically for iOS and Android platforms utilizing Swift, Kotlin, and Java",
    icon: <Smartphone className="h-8 w-8 text-[#00b8ff]" />,
    features: [
      "Platform-specific UI/UX", 
      "Full device API access", 
      "Optimal performance",
      "App store distribution"
    ]
  },
  {
    title: "Cross-platform Apps",
    description: "Efficient multi-platform applications built with React Native and Flutter that share a single codebase across iOS and Android",
    icon: <Repeat className="h-8 w-8 text-[#00b8ff]" />,
    features: [
      "Unified codebase", 
      "Faster time to market", 
      "Native-like performance",
      "Broader reach"
    ]
  },
  {
    title: "Progressive Web Apps",
    description: "Web applications that offer installable, app-like experiences with offline capabilities and native features",
    icon: <Globe className="h-8 w-8 text-[#00b8ff]" />,
    features: [
      "Works offline", 
      "No app store required", 
      "Automatic updates",
      "Cross-platform compatibility"
    ]
  },
  {
    title: "Hybrid Solutions",
    description: "Flexible applications combining web technologies and native container approaches for optimal balance of features",
    icon: <LayoutGrid className="h-8 w-8 text-[#00b8ff]" />,
    features: [
      "Web & native integration", 
      "Reusable components", 
      "Flexible architecture",
      "Scalable development"
    ]
  },
];

// App features
const appFeatures = [
  {
    title: "Offline Support",
    description: "Enable users to access critical functionality even without internet connectivity through intelligent data caching",
    icon: <Wifi className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Push Notifications",
    description: "Engage users with timely, personalized alerts and updates to drive retention and increase app engagement",
    icon: <BellRing className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Analytics Integration",
    description: "Gain valuable insights into user behavior, app performance, and conversion metrics to optimize your mobile strategy",
    icon: <BarChart className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Secure Authentication",
    description: "Implement multi-factor, biometric, and SSO authentication options to protect user data and privacy",
    icon: <Fingerprint className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Social Integration",
    description: "Seamlessly connect with social platforms for authentication, sharing, and community engagement",
    icon: <Share2 className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    title: "Location Services",
    description: "Deliver proximity-based experiences with GPS, geofencing, and mapping capabilities",
    icon: <Compass className="h-8 w-8 text-[#00b8ff]" />,
  },
];

// Development process
const developmentProcess = [
  {
    step: 1,
    title: "Discovery & Strategy",
    description: "We analyze your business goals, target audience, and technical requirements to create a comprehensive mobile strategy.",
    icon: <Compass className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    step: 2,
    title: "UX/UI Design",
    description: "Our designers create intuitive, engaging interfaces that follow platform-specific design patterns and your brand guidelines.",
    icon: <LayoutGrid className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    step: 3,
    title: "Development",
    description: "Our engineers build your app using modern frameworks and best practices for performance, security, and scalability.",
    icon: <Code className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    step: 4,
    title: "Testing & QA",
    description: "Rigorous testing across devices, platforms, and network conditions ensures your app performs flawlessly.",
    icon: <CheckCircle2 className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    step: 5,
    title: "Deployment",
    description: "We handle the app store submission process and ensure compliance with all platform guidelines and requirements.",
    icon: <ZapIcon className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    step: 6,
    title: "Maintenance & Updates",
    description: "Ongoing support, performance monitoring, and regular updates keep your app secure and up-to-date.",
    icon: <Settings className="h-8 w-8 text-[#00b8ff]" />,
  },
];

// App platforms
const platforms = [
  { name: "iOS", icon: <Smartphone className="h-6 w-6" />, color: "#007AFF" },
  { name: "Android", icon: <Smartphone className="h-6 w-6" />, color: "#3DDC84" },
  { name: "Web", icon: <Globe className="h-6 w-6" />, color: "#FF9500" },
  { name: "Wearables", icon: <RefreshCcw className="h-6 w-6" />, color: "#FF2D55" },
];

// Success metrics
const successMetrics = [
  { label: "Mobile Apps Delivered", value: "120+" },
  { label: "5-Star App Store Ratings", value: "4.8" },
  { label: "App Downloads", value: "2M+" },
  { label: "User Retention Rate", value: "68%" },
];

export default function MobileAppsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PageTemplate 
      title="Cross-platform Mobile Apps"
      subtitle="Building exceptional mobile experiences for iOS and Android"
    >
      {/* Hero Section */}
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
                Transform Your Digital Presence with Custom Mobile Apps
              </motion.h2>
              <motion.p 
                className="text-white/70 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Create seamless, engaging mobile experiences that connect with your customers anywhere, anytime. Our cross-platform approach ensures maximum reach with optimal efficiency.
              </motion.p>
              <motion.button
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] rounded-lg text-white font-medium w-fit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Start Your Mobile Journey <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            
            {/* Mobile Device Animation */}
            <div className="relative h-64 md:h-80">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {/* Phone frames */}
                <div className="relative">
                  {/* Main phone */}
                  <motion.div
                    className="absolute z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    variants={phoneAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    <div className="w-[160px] h-[320px] rounded-3xl border-[8px] border-gray-800 bg-gradient-to-br from-[#00b8ff]/30 to-[#0021a7]/30 backdrop-blur-sm overflow-hidden relative">
                      <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex justify-center items-center">
                        <div className="w-16 h-4 rounded-full bg-black/40"></div>
                      </div>
                      <div className="pt-6 px-2">
                        <div className="bg-white/10 h-8 rounded-lg mb-3"></div>
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded-lg bg-white/10"></div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-8 rounded-lg bg-white/10"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Background tablet */}
                  <motion.div
                    className="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.7, scale: 0.8 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="w-[200px] h-[280px] rounded-3xl border-[8px] border-gray-800 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20 backdrop-blur-sm overflow-hidden"></div>
                  </motion.div>
                  
                  {/* Floating elements */}
                  {[
                    { icon: <BellRing className="w-5 h-5 text-[#00b8ff]" />, top: "10%", left: "70%" },
                    { icon: <Share2 className="w-5 h-5 text-[#00b8ff]" />, top: "30%", left: "85%" },
                    { icon: <Wifi className="w-5 h-5 text-[#00b8ff]" />, top: "50%", left: "75%" },
                    { icon: <Compass className="w-5 h-5 text-[#00b8ff]" />, top: "70%", left: "80%" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center z-30"
                      style={{ top: item.top, left: item.left }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-t border-white/10">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">{metric.value}</p>
                <p className="text-white/70 text-sm">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Mobile Solutions Section */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Mobile App Solutions</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {mobileSolutions.map((solution, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">{solution.icon}</div>
                <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                <p className="text-white/70 mb-6">{solution.description}</p>
                <div className="mt-auto">
                  <p className="text-sm font-medium text-white/80 mb-2">Key Benefits:</p>
                  <ul className="grid grid-cols-2 gap-1">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#00b8ff]" />
                        <span className="text-sm text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Platform Tabs */}
      <motion.div
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Cross-Platform Expertise</h2>
        
        <div className="p-1 rounded-lg bg-white/5 inline-flex mb-8">
          {platforms.map((platform, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                activeTab === index 
                  ? "bg-gradient-to-r from-[#00b8ff]/20 to-[#0021a7]/20 text-white" 
                  : "text-white/60 hover:text-white"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <span className="text-[#00b8ff]">{platform.icon}</span>
              <span>{platform.name}</span>
            </button>
          ))}
        </div>
        
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {activeTab === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold">iOS Development</h3>
                  <p className="text-white/70">
                    We create polished, high-performance iOS applications using Swift and leveraging Apple's latest frameworks including SwiftUI, ARKit, and Core ML.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Native UI/UX following Apple design guidelines",
                      "App Store optimization and submission",
                      "Integration with Apple services (Apple Pay, iCloud, etc.)",
                      "Advanced features like AR, ML and biometrics"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#00b8ff] mt-0.5 flex-shrink-0" />
                        <span className="text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              
              {activeTab === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold">Android Development</h3>
                  <p className="text-white/70">
                    We build powerful Android applications with Kotlin and Java, optimized for the diverse Android ecosystem and Google's Material Design principles.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Material Design implementation",
                      "Support for diverse device ecosystem",
                      "Google Play Store optimization",
                      "Integration with Google services"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#00b8ff] mt-0.5 flex-shrink-0" />
                        <span className="text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              
              {activeTab === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold">Progressive Web Apps</h3>
                  <p className="text-white/70">
                    We develop PWAs that combine the reach of the web with the features of native apps, offering installable experiences without app stores.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Works offline with service workers",
                      "Installable on home screen",
                      "Push notifications on supported platforms",
                      "Fast loading with app shell architecture"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#00b8ff] mt-0.5 flex-shrink-0" />
                        <span className="text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              
              {activeTab === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold">Wearable Applications</h3>
                  <p className="text-white/70">
                    We extend your digital presence to wearable devices, creating companion apps for Apple Watch, WearOS, and fitness devices.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Optimized UIs for small screens",
                      "Health and fitness tracking integration",
                      "Efficient battery usage",
                      "Seamless syncing with companion apps"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#00b8ff] mt-0.5 flex-shrink-0" />
                        <span className="text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
            
            <div className="flex items-center justify-center">
              {activeTab === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative"
                >
                  <div className="w-[200px] h-[400px] rounded-3xl border-[8px] border-[#007AFF]/30 bg-gradient-to-br from-[#00b8ff]/10 to-[#0021a7]/10 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-[#007AFF]/30 flex justify-center items-center">
                      <div className="w-20 h-4 rounded-full bg-black/20"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Smartphone className="h-20 w-20 text-[#007AFF]/40" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 p-3 bg-[#007AFF]/20 rounded-full backdrop-blur-sm border border-[#007AFF]/30">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="#007AFF" strokeWidth="6" fill="none" strokeDasharray="1,8" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative"
                >
                  <div className="w-[200px] h-[400px] rounded-3xl border-[8px] border-[#3DDC84]/30 bg-gradient-to-br from-[#3DDC84]/10 to-[#0021a7]/10 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-[#3DDC84]/30 flex justify-center items-center">
                      <div className="w-20 h-4 rounded-full bg-black/20"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Smartphone className="h-20 w-20 text-[#3DDC84]/40" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 p-3 bg-[#3DDC84]/20 rounded-full backdrop-blur-sm border border-[#3DDC84]/30">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <polygon points="50,20 20,80 80,80" fill="#3DDC84" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative"
                >
                  <div className="w-[300px] aspect-video rounded-xl border-[8px] border-[#FF9500]/30 bg-gradient-to-br from-[#FF9500]/10 to-[#0021a7]/10 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-[#FF9500]/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="h-20 w-20 text-[#FF9500]/40" />
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 p-3 bg-[#FF9500]/20 rounded-full backdrop-blur-sm border border-[#FF9500]/30">
                    <motion.div
                      animate={{ rotate: [0, 0, 180, 180, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg className="w-8 h-8" viewBox="0 0 100 100">
                        <rect x="25" y="25" width="50" height="50" fill="none" stroke="#FF9500" strokeWidth="6" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative"
                >
                  <div className="w-[180px] h-[180px] rounded-full border-[8px] border-[#FF2D55]/30 bg-gradient-to-br from-[#FF2D55]/10 to-[#0021a7]/10 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCcw className="h-16 w-16 text-[#FF2D55]/40" />
                    </div>
                  </div>
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <svg className="w-48 h-48" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" stroke="#FF2D55" strokeWidth="2" fill="none" strokeDasharray="1,10" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* App Features Grid */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Advanced App Features</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Development Process */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Mobile App Development Process</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[28px] top-8 bottom-0 w-1 bg-gradient-to-b from-[#00b8ff] to-[#0021a7] hidden md:block"></div>
          
          <div className="space-y-12">
            {developmentProcess.map((process, index) => (
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
                    {process.icon}
                  </div>
                </div>
                <div className="flex-1 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium text-white/50 mr-2">Step {process.step}</span>
                    <h3 className="text-xl font-bold">{process.title}</h3>
                  </div>
                  <p className="text-white/70">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* App Showcase */}
      <motion.div 
        className="mb-20 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#00b8ff]/5 to-[#0021a7]/5 backdrop-blur-sm"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">App Success Stories</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "HealthTrack Pro",
              category: "Healthcare",
              metrics: "500K+ active users, 4.9 App Store rating",
              description: "A comprehensive health tracking application with wearable integration and telehealth features."
            },
            {
              title: "FinConnect",
              category: "Finance",
              metrics: "35% increase in customer engagement",
              description: "A mobile banking platform with AI-powered financial insights and secure transaction capabilities."
            },
            {
              title: "RetailGo",
              category: "Retail",
              metrics: "2.3x increase in mobile sales conversion",
              description: "An omnichannel shopping experience with AR product visualization and loyalty rewards."
            }
          ].map((app, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-full"
              variants={slideInLeft}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col h-full">
                <span className="text-sm font-medium text-[#00b8ff] mb-2">{app.category}</span>
                <h3 className="text-xl font-bold mb-4">{app.title}</h3>
                <p className="text-white/70 mb-6">{app.description}</p>
                <div className="flex items-center mt-auto pt-4 border-t border-white/10">
                  <CheckCircle2 className="h-5 w-5 text-[#00b8ff] mr-2" />
                  <p className="text-white/80 text-sm">{app.metrics}</p>
                </div>
              </div>
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
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Ready to Build Your Mobile App?</h2>
            <p className="text-white/70 max-w-xl">
              Let's discuss your app idea and explore how our mobile development expertise can bring your vision to life across platforms.
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
