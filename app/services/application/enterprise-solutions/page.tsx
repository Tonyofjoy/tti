"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  BarChart3,
  ServerCog,
  ClipboardCheck,
  Settings,
  ArrowRight,
  ShieldCheck,
  Code2,
  Layers,
  Globe,
  PlugZap,
  Database,
  CloudCog,
  Network,
  LineChart,
  ArrowUpDown,
  Lock,
  CheckCircle2,
  TrendingUp
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

// Enterprise solution offerings
const enterpriseSolutions = [
  {
    title: "ERP Systems",
    description: "Integrated systems that connect all aspects of your business operations, from finance and HR to inventory and manufacturing",
    icon: <Building2 className="h-8 w-8 text-[#00b8ff]" />,
    features: [
      "Financial management", 
      "Supply chain optimization", 
      "HR & resource planning",
      "Manufacturing automation"
    ]
  },
  {
    title: "CRM Platforms",
    description: "Customer-centric solutions that streamline interactions, automate sales processes, and enhance relationship management",
    icon: <Users className="h-8 w-8 text-[#00b8ff]" />,
    features: [
      "Lead management", 
      "Sales automation", 
      "Customer service tools",
      "Marketing campaign integration"
    ]
  },
  {
    title: "Business Intelligence",
    description: "Data-driven analytics platforms that transform raw data into actionable insights for informed decision-making",
    icon: <BarChart3 className="h-8 w-8 text-[#00b8ff]" />,
    features: [
      "Interactive dashboards", 
      "Real-time reporting", 
      "Predictive analytics",
      "KPI monitoring"
    ]
  },
  {
    title: "Custom Enterprise Applications",
    description: "Bespoke software solutions tailored to address your organization's unique challenges and requirements",
    icon: <ServerCog className="h-8 w-8 text-[#00b8ff]" />,
    features: [
      "Workflow automation", 
      "Legacy system modernization", 
      "Department-specific tools",
      "Enterprise mobile apps"
    ]
  },
];

// Development process steps
const developmentProcess = [
  {
    step: 1,
    title: "Discovery & Requirements Analysis",
    description: "We work closely with your team to understand business objectives, workflows, pain points, and technical requirements.",
    icon: <ClipboardCheck className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    step: 2,
    title: "Solution Architecture & Design",
    description: "Our architects design a scalable, secure, and efficient solution blueprint aligned with your enterprise infrastructure.",
    icon: <Layers className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    step: 3,
    title: "Agile Development",
    description: "Utilizing modern development practices, we build your solution with regular feedback cycles and iterative improvement.",
    icon: <Code2 className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    step: 4,
    title: "Testing & Quality Assurance",
    description: "Rigorous testing ensures your enterprise solution is reliable, secure, and performs optimally at scale.",
    icon: <ShieldCheck className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    step: 5,
    title: "Deployment & Integration",
    description: "Seamless implementation with your existing systems, including data migration and user training.",
    icon: <PlugZap className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    step: 6,
    title: "Ongoing Support & Evolution",
    description: "Continuous maintenance, monitoring, and enhancements to adapt to your evolving business needs.",
    icon: <Settings className="h-8 w-8 text-[#00b8ff]" />,
  },
];

// Technology stack
const technologyStack = [
  {
    category: "Frontend",
    technologies: ["React", "Angular", "Vue.js", "Next.js", "TypeScript", "Progressive Web Apps"],
    icon: <Globe className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Java", ".NET Core", "Python", "PHP", "Microservices"],
    icon: <ServerCog className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    category: "Database",
    technologies: ["PostgreSQL", "SQL Server", "MongoDB", "Oracle", "Redis", "Elasticsearch"],
    icon: <Database className="h-8 w-8 text-[#00b8ff]" />,
  },
  {
    category: "Cloud & DevOps",
    technologies: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "CI/CD Pipelines"],
    icon: <CloudCog className="h-8 w-8 text-[#00b8ff]" />,
  },
];

// Business benefits
const businessBenefits = [
  {
    title: "Operational Efficiency",
    description: "Streamline workflows and automate manual processes to reduce overhead and improve productivity",
    icon: <TrendingUp className="h-8 w-8 text-[#00b8ff]" />,
    stat: "35%",
    statLabel: "average efficiency improvement"
  },
  {
    title: "Digital Transformation",
    description: "Accelerate your company's digital transformation journey with modern enterprise applications",
    icon: <ArrowUpDown className="h-8 w-8 text-[#00b8ff]" />,
    stat: "70%",
    statLabel: "of Fortune 500 companies prioritizing"
  },
  {
    title: "Data-Driven Decisions",
    description: "Gain valuable insights from your business data to make informed strategic decisions",
    icon: <LineChart className="h-8 w-8 text-[#00b8ff]" />,
    stat: "3x",
    statLabel: "faster decision-making processes"
  },
  {
    title: "Scalable Architecture",
    description: "Build on robust, future-proof foundations that grow with your business needs",
    icon: <Network className="h-8 w-8 text-[#00b8ff]" />,
    stat: "10x",
    statLabel: "growth capacity without rebuilding"
  },
  {
    title: "Enterprise Security",
    description: "Implement industry best practices for data protection and regulatory compliance",
    icon: <Lock className="h-8 w-8 text-[#00b8ff]" />,
    stat: "99.9%",
    statLabel: "uptime with security best practices"
  },
];

// Case studies
const caseStudies = [
  {
    industry: "Healthcare",
    title: "Integrated Patient Management System",
    results: "40% reduction in administrative overhead and improved patient care coordination"
  },
  {
    industry: "Manufacturing",
    title: "End-to-End Production Management Platform",
    results: "28% increase in production efficiency and real-time inventory optimization"
  },
  {
    industry: "Financial Services",
    title: "Compliance & Risk Management Solution",
    results: "65% faster reporting cycles and enhanced regulatory compliance"
  }
];

export default function EnterpriseSolutionsPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <PageTemplate 
      title="Enterprise Software Solutions"
      subtitle="Driving business transformation with scalable, secure enterprise applications"
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
                Transform Your Enterprise with Custom Software Solutions
              </motion.h2>
              <motion.p 
                className="text-white/70 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Build scalable, secure, and integrated applications that streamline operations, enhance productivity, and drive innovation across your organization.
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
            
            {/* Enterprise Visualization */}
            <div className="relative h-64 md:h-80">
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="relative h-full w-full">
                  {/* Central hub */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl bg-gradient-to-r from-[#00b8ff]/20 to-[#0021a7]/20 backdrop-blur-sm border border-white/10 flex items-center justify-center z-20"
                    variants={floatingAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    <Building2 className="h-16 w-16 text-[#00b8ff]" />
                  </motion.div>
                  
                  {/* Connected systems */}
                  <div className="absolute inset-0">
                    {[
                      { icon: <Users className="h-8 w-8 text-[#00b8ff]" />, top: "10%", left: "20%" },
                      { icon: <Database className="h-8 w-8 text-[#00b8ff]" />, top: "25%", left: "80%" },
                      { icon: <ServerCog className="h-8 w-8 text-[#00b8ff]" />, top: "75%", left: "30%" },
                      { icon: <BarChart3 className="h-8 w-8 text-[#00b8ff]" />, top: "60%", left: "75%" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-16 h-16 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                        style={{ top: item.top, left: item.left }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                    ))}
                    
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
                      {[
                        { x1: "20%", y1: "10%", x2: "50%", y2: "50%" },
                        { x1: "80%", y1: "25%", x2: "50%", y2: "50%" },
                        { x1: "30%", y1: "75%", x2: "50%", y2: "50%" },
                        { x1: "75%", y1: "60%", x2: "50%", y2: "50%" },
                      ].map((line, index) => (
                        <motion.line
                          key={index}
                          x1={line.x1}
                          y1={line.y1}
                          x2={line.x2}
                          y2={line.y2}
                          stroke="#00b8ff"
                          strokeWidth="2"
                          strokeOpacity="0.4"
                          strokeDasharray="4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 1 + index * 0.1, duration: 1 }}
                        />
                      ))}
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-t border-white/10">
            {[
              { label: "Enterprise Solutions Delivered", value: "250+" },
              { label: "Years of Industry Experience", value: "15+" },
              { label: "Client Retention Rate", value: "97%" },
              { label: "Average ROI for Clients", value: "320%" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Solutions Section */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Enterprise Software Solutions</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {enterpriseSolutions.map((solution, index) => (
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
                  <p className="text-sm font-medium text-white/80 mb-2">Key Features:</p>
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
      
      {/* Development Process */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Our Development Process</h2>
        
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
      
      {/* Technology Stack */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Enterprise Technology Stack</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologyStack.map((stack, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{stack.icon}</div>
              <h3 className="text-xl font-bold mb-4">{stack.category}</h3>
              <div className="flex flex-wrap gap-2">
                {stack.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-2 py-1 bg-white/10 rounded-md text-sm text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Business Benefits */}
      <motion.div 
        className="mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Business Benefits</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessBenefits.slice(0, 3).map((benefit, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col h-full"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-white/70 mb-6">{benefit.description}</p>
              <div className="mt-auto pt-4 border-t border-white/10 flex items-center">
                <span className="text-2xl font-bold text-[#00b8ff] mr-2">{benefit.stat}</span>
                <span className="text-sm text-white/70">{benefit.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {businessBenefits.slice(3, 5).map((benefit, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col h-full"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-white/70 mb-6">{benefit.description}</p>
              <div className="mt-auto pt-4 border-t border-white/10 flex items-center">
                <span className="text-2xl font-bold text-[#00b8ff] mr-2">{benefit.stat}</span>
                <span className="text-sm text-white/70">{benefit.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Case Studies */}
      <motion.div 
        className="mb-20 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#00b8ff]/5 to-[#0021a7]/5 backdrop-blur-sm"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Success Stories</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-full"
              variants={slideInLeft}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col h-full">
                <span className="text-sm font-medium text-[#00b8ff] mb-2">{study.industry}</span>
                <h3 className="text-xl font-bold mb-4">{study.title}</h3>
                <div className="flex items-center mt-auto pt-4 border-t border-white/10">
                  <CheckCircle2 className="h-5 w-5 text-[#00b8ff] mr-2" />
                  <p className="text-white/80 text-sm">{study.results}</p>
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
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Ready to Transform Your Enterprise?</h2>
            <p className="text-white/70 max-w-xl">
              Schedule a consultation with our enterprise software experts to discuss your business challenges and discover how our custom solutions can drive your digital transformation.
            </p>
          </div>
          <motion.button
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Digital Transformation
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
