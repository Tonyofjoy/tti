"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion"
import dynamic from 'next/dynamic'
import Image from "next/image"
import * as THREE from "three"
import {
  Zap,
  Clock,
  LineChart,
  Code,
  Layers,
  Database,
  Settings,
  Box,
  ArrowRight,
  CheckCircle2,
  Puzzle,
  Rocket,
  PieChart,
  RefreshCw,
  FlaskConical,
  Gauge,
  BarChart,
  LucideProps,
  Monitor,
  GitBranch,
  Cpu,
  Shield,
  Users
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Create a named fallback component
const RapidDevFallback = () => (
  <div className="flex items-center justify-center h-full flex-col">
    <Rocket className="h-16 w-16 text-indigo-400" />
    <p className="text-indigo-300 mt-4">Interactive Rapid Development Demo</p>
  </div>
);
RapidDevFallback.displayName = 'RapidDevFallback';

// Create a named loading component
const LoadingComponent = () => (
  <div className="flex items-center justify-center h-full">
    <div className="h-32 w-32 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
  </div>
);
LoadingComponent.displayName = 'LoadingComponent';

// Dynamically import 3D components to avoid SSR issues
const RapidDevExperience = dynamic(
  () => import('./rapid-dev-experience').catch(() => {
    console.error('Failed to load rapid-dev-experience component');
    return () => <RapidDevFallback />;
  }), 
  { 
    ssr: false, 
    loading: () => <LoadingComponent />
  }
);
RapidDevExperience.displayName = 'DynamicRapidDevExperience';

// Define particle type
interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
}

// Simplified particle flow background component
function ParticleFlow() {
  const particleCount = 100; // Reduced from 200
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.2 + 0.1
    }));
    setParticles(newParticles);
    
    const interval = setInterval(() => {
      setParticles(current => 
        current.map(particle => ({
          ...particle,
          y: particle.y < 100 ? particle.y + particle.speed : 0
        }))
      );
    }, 100); // Slowed down from 50ms to 100ms
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 z-0 pointer-events-none">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-cyan-400 opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
}
ParticleFlow.displayName = 'ParticleFlow';

// Rapid development methodologies
const rapidMethodologies = [
  {
    title: "Agile Development",
    description: "Iterative approach with sprints, continuous feedback, and adaptive planning",
    icon: <RefreshCw className="h-8 w-8 text-blue-400" />,
    technologies: ["Scrum", "Kanban", "Sprint Planning", "Daily Stand-ups", "Retrospectives"],
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Low-Code Platforms",
    description: "Visual development environments that accelerate application delivery",
    icon: <Puzzle className="h-8 w-8 text-purple-400" />,
    technologies: ["Drag-and-drop UI", "Pre-built templates", "Visual workflows", "One-click deployment", "AI assistance"],
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "DevOps Integration",
    description: "Automated pipelines for continuous integration and deployment",
    icon: <Settings className="h-8 w-8 text-cyan-400" />,
    technologies: ["CI/CD", "Containerization", "Infrastructure as Code", "Monitoring", "Auto-scaling"],
    color: "from-cyan-500 to-emerald-500"
  },
  {
    title: "Component Libraries",
    description: "Pre-built, reusable components that accelerate frontend and backend development",
    icon: <Layers className="h-8 w-8 text-emerald-400" />,
    technologies: ["UI Component Systems", "API Connectors", "Authentication Modules", "Payment Systems", "Analytics"],
    color: "from-emerald-500 to-blue-500"
  }
]

// Rapid development features
const rapidFeatures = [
  {
    title: "Accelerated Time-to-Market",
    description: "Launch products and features in a fraction of traditional development timelines with optimized workflows and ready-made components",
    icon: <Clock className="h-6 w-6 text-blue-400" />
  },
  {
    title: "Cost Efficiency",
    description: "Reduce development costs with optimized processes, fewer resource requirements, and reusable architecture patterns",
    icon: <PieChart className="h-6 w-6 text-green-400" />
  },
  {
    title: "Business Adaptability",
    description: "Quickly pivot and adapt applications based on market feedback with flexible architectures and component-based design",
    icon: <FlaskConical className="h-6 w-6 text-purple-400" />
  },
  {
    title: "Prototype-to-Production",
    description: "Seamlessly transform prototypes into production-ready applications with minimal rework using modern CI/CD workflows",
    icon: <Rocket className="h-6 w-6 text-orange-400" />
  },
  {
    title: "Scalable Architecture",
    description: "Built-in patterns for scaling applications as user demands and feature sets grow with cloud-native approaches",
    icon: <LineChart className="h-6 w-6 text-red-400" />
  },
  {
    title: "Cross-platform Deployment",
    description: "Deploy to web, mobile, and desktop from a single codebase with progressive web app techniques and native bridges",
    icon: <Box className="h-6 w-6 text-indigo-400" />
  }
]

// Case studies
const caseStudies = [
  {
    title: "FinTech Startup Launch",
    description: "Reduced development time from 12 months to 10 weeks for a complete banking platform with secure user authentication and payment processing",
    metrics: [
      { label: "Time Saved", value: "75%" },
      { label: "Cost Reduction", value: "68%" }
    ],
    technologies: ["React", "Node.js", "Low-Code API Integration", "CI/CD", "Component Library"],
    image: "/images/fintech-case.jpg"
  },
  {
    title: "Healthcare Solution",
    description: "Patient management system developed and deployed in just 6 weeks with full HIPAA compliance and real-time data synchronization",
    metrics: [
      { label: "Dev Sprints", value: "3 total" },
      { label: "Compliance", value: "100%" }
    ],
    technologies: ["Next.js", "Tailwind CSS", "Low-Code Auth", "FHIR API", "Vercel"],
    image: "/images/healthcare-case.jpg"
  },
  {
    title: "Retail Transformation",
    description: "Omnichannel retail platform with inventory management, POS integration, and customer portal created in 12 weeks with real-time updates",
    metrics: [
      { label: "Legacy Migration", value: "Complete" },
      { label: "Revenue Impact", value: "+42%" }
    ],
    technologies: ["Progressive Web App", "GraphQL", "Micro-frontends", "UI Component System", "Netlify"],
    image: "/images/retail-case.jpg"
  }
]

// Advanced code simulator to demonstrate rapid development concepts
function AnimatedCodeEditor() {
  const [selectedFile, setSelectedFile] = useState(0);
  const codeFiles = [
    {
      name: "RapidApp.tsx",
      language: "typescript",
      code: [
        "import { useState, useEffect } from 'react';",
        "import { motion, AnimatePresence } from 'framer-motion';",
        "import { useAuth } from './hooks/useAuth';",
        "import { useLowCodeComponents } from './generators/componentLib';",
        "import { AppShell, Navigation, ContentArea } from './layout';",
        "import { Dashboard, Analytics, Settings } from './views';",
        "",
        "export function RapidApp() {",
        "  const { user, isLoading } = useAuth();",
        "  const { generateComponent } = useLowCodeComponents();",
        "  const [view, setView] = useState('dashboard');",
        "",
        "  // Dynamically generate component based on schema",
        "  const DynamicForm = generateComponent({",
        "    type: 'form',",
        "    fields: [",
        "      { name: 'name', type: 'text', validation: 'required' },",
        "      { name: 'email', type: 'email', validation: 'email|required' },",
        "      { name: 'plan', type: 'select', options: ['Free', 'Pro', 'Enterprise'] }",
        "    ],",
        "    onSubmit: 'api.users.create'",
        "  });",
        "",
        "  // Auto-generate UI from data model",
        "  useEffect(() => {",
        "    if (user) {",
        "      api.logs.track('user_login', { userId: user.id });",
        "    }",
        "  }, [user]);",
        "",
        "  return (",
        "    <AppShell>",
        "      <Navigation onViewChange={setView} />",
        "      <ContentArea>",
        "        <AnimatePresence mode=\"wait\">",
        "          {isLoading ? (",
        "            <motion.div",
        "              key=\"loading\"",
        "              initial={{ opacity: 0 }}",
        "              animate={{ opacity: 1 }}",
        "              exit={{ opacity: 0 }}",
        "            >",
        "              <LoadingSpinner />",
        "            </motion.div>",
        "          ) : (",
        "            <motion.div",
        "              key={view}",
        "              initial={{ opacity: 0, x: 20 }}",
        "              animate={{ opacity: 1, x: 0 }}",
        "              exit={{ opacity: 0, x: -20 }}",
        "              transition={{ duration: 0.3 }}",
        "            >",
        "              {view === 'dashboard' && <Dashboard />}",
        "              {view === 'analytics' && <Analytics />}",
        "              {view === 'settings' && <Settings />}",
        "              {view === 'new-user' && <DynamicForm />}",
        "            </motion.div>",
        "          )}",
        "        </AnimatePresence>",
        "      </ContentArea>",
        "    </AppShell>",
        "  );",
        "}"
      ]
    },
    {
      name: "schema.yaml",
      language: "yaml",
      code: [
        "# Low-Code Application Schema",
        "name: Customer Portal",
        "version: 1.0.0",
        "database:",
        "  - name: users",
        "    fields:",
        "      - name: id",
        "        type: uuid",
        "        primary: true",
        "      - name: email",
        "        type: string",
        "        unique: true",
        "      - name: name",
        "        type: string",
        "      - name: role",
        "        type: enum",
        "        values: [user, admin, editor]",
        "",
        "  - name: products",
        "    fields:",
        "      - name: id",
        "        type: uuid",
        "        primary: true",
        "      - name: name",
        "        type: string",
        "      - name: price",
        "        type: decimal",
        "      - name: category",
        "        type: reference",
        "        references: categories.id",
        "",
        "pages:",
        "  - path: /dashboard",
        "    component: Dashboard",
        "    layout: MainLayout",
        "    access: [user, admin]",
        "    elements:",
        "      - type: DataTable",
        "        source: users",
        "        columns: [name, email, role]",
        "        actions: [edit, delete]",
        "",
        "  - path: /products",
        "    component: ProductList",
        "    layout: MainLayout",
        "    access: [user, admin]",
        "    elements:",
        "      - type: FilterableGrid",
        "        source: products",
        "        filters: [category, price]",
        "",
        "api:",
        "  - path: /api/users",
        "    methods: [GET, POST, PUT, DELETE]",
        "    source: users",
        "    middleware: [auth]",
        "",
        "deployment:",
        "  provider: vercel",
        "  environment: production",
        "  regions: [us-east-1, eu-west-1]"
      ]
    }
  ];

  // Animation to simulate typing code
  const [typedCode, setTypedCode] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;
    
    const selectedCode = codeFiles[selectedFile].code;
    if (currentLine >= selectedCode.length) {
      setIsTyping(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setTypedCode(prev => [...prev, selectedCode[currentLine]]);
      setCurrentLine(prev => prev + 1);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentLine, selectedFile, isTyping]);

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-xl">
      <div className="flex items-center bg-slate-800 px-4 py-2 border-b border-slate-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex ml-4 space-x-2">
          {codeFiles.map((file, idx) => (
            <button
              key={file.name}
              onClick={() => {
                setSelectedFile(idx);
                setTypedCode([]);
                setCurrentLine(0);
                setIsTyping(true);
              }}
              className={`px-3 py-1 text-xs rounded-t-md transition-colors ${
                selectedFile === idx ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700/50'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 font-mono text-sm overflow-auto max-h-[400px] bg-gradient-to-br from-slate-900 to-slate-800">
        <pre className="text-slate-300">
          {typedCode.map((line, idx) => (
            <div key={idx} className="line">
              <span className="mr-4 text-slate-600">{idx + 1}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-indigo-300"
              >
                {line}
              </motion.span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

// Visual representation of rapid development cycle
function DevelopmentCycle() {
  const [activePhase, setActivePhase] = useState(0);
  const phases = [
    { name: "Discovery", icon: <FlaskConical className="h-6 w-6" /> },
    { name: "Design", icon: <Puzzle className="h-6 w-6" /> },
    { name: "Development", icon: <Code className="h-6 w-6" /> },
    { name: "Testing", icon: <CheckCircle2 className="h-6 w-6" /> },
    { name: "Deployment", icon: <Rocket className="h-6 w-6" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase(current => (current + 1) % phases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-around w-full py-10 my-8">
      {phases.map((phase, index) => (
        <motion.div
          key={phase.name}
          className={`flex flex-col items-center ${
            index === activePhase ? 'scale-125 text-cyan-400' : 'text-white/60'
          } transition-all duration-300`}
          animate={{ 
            scale: index === activePhase ? 1.25 : 1,
            opacity: index === activePhase ? 1 : 0.6
          }}
        >
          <div className="bg-white/5 p-4 rounded-full mb-3 border border-white/10">
            {phase.icon}
          </div>
          <span className="text-sm font-medium">{phase.name}</span>
          {index === activePhase && (
            <motion.div
              className="h-1 w-6 bg-cyan-400 mt-2 rounded-full"
              layoutId="activeIndicator"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.div>
      ))}
      <div className="absolute h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 w-[80%] top-[40px] -z-10"></div>
    </div>
  );
}

// Development time comparison chart
function TimeComparisonChart() {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4">Development Time Comparison</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-slate-400 mb-1">
            <span>Traditional Development</span>
            <span>6-12 months</span>
          </div>
          <div className="h-6 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-slate-500 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm text-slate-400 mb-1">
            <span>Agile Development</span>
            <span>3-6 months</span>
          </div>
          <div className="h-6 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm text-slate-400 mb-1">
            <span>Low-Code Development</span>
            <span>1-3 months</span>
          </div>
          <div className="h-6 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm text-slate-400 mb-1">
            <span>Our Rapid Development</span>
            <span>2-10 weeks</span>
          </div>
          <div className="h-6 bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '15%' }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 mr-2 mb-2">
      {name}
    </span>
  )
}

function Workflow({ className, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </svg>
  )
}

// Define CodeBlock component with display name
const CodeBlock = ({ language, filename, code, active }: {
  language: string;
  filename: string;
  code: string;
  active: boolean;
}) => {
  return (
    <div className={`bg-slate-950 rounded-lg border border-slate-800 overflow-hidden transition-all duration-500 ${active ? 'shadow-lg shadow-indigo-500/20' : 'opacity-50'}`}>
      <div className="px-4 py-2 bg-slate-900 text-slate-400 text-xs font-mono flex justify-between items-center border-b border-slate-800">
        <span>{filename}</span>
        <span className="text-indigo-400">{language}</span>
      </div>
      <pre className="p-4 text-xs md:text-sm text-slate-300 font-mono overflow-auto max-h-[300px]">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Set display name
CodeBlock.displayName = 'CodeBlock';

export default function RapidDevelopmentPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Particle background */}
      <ParticleFlow />
      
      {/* Hero Section */}
      <section ref={ref} className="relative py-20 overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="container mx-auto px-4 pb-12 pt-20 relative z-10"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Rapid Development Solutions
              </motion.h1>
              <motion.p 
                className="text-xl text-slate-300 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Accelerate your project delivery with our cutting-edge rapid development methodologies and tools. Build better applications in a fraction of the time.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a href="#contact" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2">
                  Start Your Project <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#methodologies" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all">
                  Explore Methodologies
                </a>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4 text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  Up to 5x faster delivery
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  60%+ cost reduction
                </span>
              </motion.div>
            </div>
            
            <div className="md:w-1/2 h-[400px] relative">
              <div className="rounded-xl overflow-hidden h-full w-full border border-slate-700 shadow-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur">
                {/* 3D Experience */}
                <Suspense fallback={<div className="h-full w-full flex items-center justify-center">Loading 3D Experience...</div>}>
                  <RapidDevExperience />
                </Suspense>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Development Cycle Visualization */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Streamlined Development Cycle</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Our rapid development approach optimizes every stage of the development lifecycle, 
              eliminating bottlenecks and reducing delivery time.
            </p>
          </div>
          
          <DevelopmentCycle />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <TimeComparisonChart />
            
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-500/20 p-1.5 rounded-full">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Rapid Time-to-Market</h4>
                    <p className="text-slate-300 text-sm">Launch MVP and iterate quickly based on market feedback</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-500/20 p-1.5 rounded-full">
                    <PieChart className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Resource Optimization</h4>
                    <p className="text-slate-300 text-sm">Reduce development costs and optimize team efficiency</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-purple-500/20 p-1.5 rounded-full">
                    <GitBranch className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Parallel Development</h4>
                    <p className="text-slate-300 text-sm">Work on multiple features simultaneously without conflicts</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-yellow-500/20 p-1.5 rounded-full">
                    <Zap className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Adaptability</h4>
                    <p className="text-slate-300 text-sm">Quickly adjust to changing requirements and market conditions</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Rapid Development Methodologies */}
      <section id="methodologies" className="py-20 bg-slate-800 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Rapid Development Methodologies
            </motion.h2>
            <motion.p 
              className="text-xl text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Combining proven approaches to accelerate development while maintaining quality and scalability
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rapidMethodologies.map((method, index) => (
              <motion.div
                key={method.title}
                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg hover:shadow-xl transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-2 w-full bg-gradient-to-r ${method.color}`}></div>
                <div className="p-6">
                  <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                  <p className="text-slate-300 mb-4 text-sm">{method.description}</p>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-slate-400 mb-2">Technologies & Tools</h4>
                    <div className="flex flex-wrap">
                      {method.technologies.map(tech => (
                        <TechBadge key={tech} name={tech} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Code Demo Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Low-Code & No-Code Integration
              </motion.h2>
              <motion.p 
                className="text-xl text-slate-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Our approach leverages the power of low-code platforms while maintaining the flexibility of custom code when needed. This hybrid model allows for the best of both worlds:
              </motion.p>
              
              <ul className="space-y-4">
                {[
                  {
                    icon: <Puzzle className="h-5 w-5 text-purple-400" />,
                    title: "Visual Development",
                    description: "Drag-and-drop interfaces for rapid UI creation"
                  },
                  {
                    icon: <Code className="h-5 w-5 text-blue-400" />,
                    title: "Custom Code Integration",
                    description: "Extend functionality with custom code when needed"
                  },
                  {
                    icon: <Database className="h-5 w-5 text-cyan-400" />,
                    title: "Auto-generated APIs",
                    description: "Instant API creation from data models"
                  },
                  {
                    icon: <Shield className="h-5 w-5 text-red-400" />,
                    title: "Built-in Security",
                    description: "Security patterns and compliance baked in"
                  }
                ].map((item, index) => (
                  <motion.li 
                    key={item.title}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="mt-1 bg-white/10 p-1.5 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-slate-300 text-sm">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-1/2">
              <AnimatedCodeEditor />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-20 bg-slate-900 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Key Features of Our Rapid Development
            </motion.h2>
            <motion.p 
              className="text-xl text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Delivering tangible business value through accelerated development without compromising quality
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rapidFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:bg-slate-800 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="rounded-full bg-white/5 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Success Stories
            </motion.h2>
            <motion.p 
              className="text-xl text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Real-world examples of how our rapid development approach delivered exceptional results
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 shadow-lg group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-48 bg-slate-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60"></div>
                  
                  {/* This is a placeholder - in a real implementation, you'd use actual images */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-cyan-500/20">
                    {index === 0 && <Cpu className="h-16 w-16 text-indigo-300" />}
                    {index === 1 && <Users className="h-16 w-16 text-cyan-300" />}
                    {index === 2 && <Box className="h-16 w-16 text-emerald-300" />}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-xl font-bold text-white">{study.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-300 mb-6 text-sm">{study.description}</p>
                  
                  <div className="flex justify-between mb-6">
                    {study.metrics.map(metric => (
                      <div key={metric.label} className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">{metric.value}</div>
                        <div className="text-sm text-slate-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap">
                      {study.technologies.map(tech => (
                        <TechBadge key={tech} name={tech} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a href="#contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all">
              Discuss Your Project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-indigo-900/50 to-cyan-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Accelerate Your Development?
            </motion.h2>
            <motion.p 
              className="text-xl text-slate-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Let's discuss how our rapid development solutions can help you bring your ideas to life faster.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="/contact" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                Schedule a Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/services" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                View All Services
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
