"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion"
import dynamic from 'next/dynamic'
import Image from "next/image"
import * as THREE from "three"
import {
  Code,
  Layers,
  Database,
  Server,
  Smartphone,
  Globe,
  Box,
  ArrowRight,
  CloudLightning,
  ShieldCheck,
  Zap,
  Cpu,
  BarChart,
  UserPlus,
  Cloud,
  RocketIcon,
  Braces,
  FileCode2,
  LucideProps,
  RefreshCw,
  CheckCircle2,
  Monitor
} from "lucide-react"

// Dynamically import 3D components to avoid SSR issues
const WebExperience = dynamic(() => import('./web-experience').catch(() => () => (
  <div className="flex items-center justify-center h-full">
    <Monitor className="h-16 w-16 text-indigo-400" />
    <p className="text-indigo-300 mt-4">Interactive 3D Experience</p>
  </div>
)), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-full">
    <div className="h-32 w-32 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
  </div>
)});

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
          className="absolute rounded-full bg-blue-400 opacity-60"
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

// Web technologies data
const webTechnologies = [
  {
    title: "Modern Frontend Frameworks",
    description: "Building responsive and interactive user interfaces with the latest web technologies",
    icon: <Layers className="h-8 w-8 text-indigo-400" />,
    technologies: ["React", "Next.js", "Vue", "Svelte", "Tailwind CSS"],
    color: "from-indigo-500 to-blue-500"
  },
  {
    title: "Backend & API Architecture",
    description: "Scalable and maintainable backend solutions to power your web applications",
    icon: <Server className="h-8 w-8 text-blue-400" />,
    technologies: ["Node.js", "Express", "GraphQL", "REST APIs", "Python/Django"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Database & Storage Solutions",
    description: "Optimized data persistence strategies for your application needs",
    icon: <Database className="h-8 w-8 text-cyan-400" />,
    technologies: ["MongoDB", "PostgreSQL", "Redis", "Firebase", "AWS S3"],
    color: "from-cyan-500 to-emerald-500"
  },
  {
    title: "DevOps & Deployment",
    description: "Streamlined workflows for continuous integration and delivery",
    icon: <Globe className="h-8 w-8 text-emerald-400" />,
    technologies: ["Docker", "Kubernetes", "GitHub Actions", "Vercel", "AWS/Azure"],
    color: "from-emerald-500 to-indigo-500"
  }
]

// Web application features with updated icons and descriptions
const webFeatures = [
  {
    title: "Progressive Web Apps",
    description: "Web applications with offline capabilities and app-like experiences using service workers and modern caching",
    icon: <Smartphone className="h-6 w-6 text-purple-400" />
  },
  {
    title: "Serverless Architecture",
    description: "Reduced infrastructure management with cutting-edge function-as-a-service and edge computing solutions",
    icon: <Cloud className="h-6 w-6 text-blue-400" />
  },
  {
    title: "Real-time Collaboration",
    description: "Enable instant updates and multi-user interactions using WebSockets, CRDTs, and server-sent events",
    icon: <Zap className="h-6 w-6 text-yellow-400" />
  },
  {
    title: "API-first Design",
    description: "Modern interfaces built with GraphQL, REST, and tRPC for seamless integration across platforms",
    icon: <Braces className="h-6 w-6 text-pink-400" />
  },
  {
    title: "Micro-frontend Architecture",
    description: "Modular frontend components that enable independent development, testing, and deployment",
    icon: <Box className="h-6 w-6 text-green-400" />
  },
  {
    title: "AI & ML Integration",
    description: "Smart features powered by client and server-side AI models and state-of-the-art machine learning APIs",
    icon: <Cpu className="h-6 w-6 text-red-400" />
  }
]

// Case studies
const caseStudies = [
  {
    title: "E-commerce Platform Transformation",
    description: "Complete redesign with Next.js, Tailwind CSS, and Stripe integration resulting in 64% conversion improvement",
    metrics: [
      { label: "Performance", value: "+82%" },
      { label: "Mobile Traffic", value: "+47%" }
    ],
    technologies: ["Next.js", "Tailwind CSS", "Stripe", "Sanity.io", "Vercel"],
    image: "/images/ecommerce-case.jpg"
  },
  {
    title: "SaaS Application Modernization",
    description: "Legacy system transformation with React, GraphQL, and microservices architecture",
    metrics: [
      { label: "Dev Speed", value: "3x faster" },
      { label: "User Retention", value: "+38%" }
    ],
    technologies: ["React", "GraphQL", "Node.js", "Docker", "AWS"],
    image: "/images/saas-case.jpg"
  },
  {
    title: "Startup MVP Development",
    description: "Rapid development of scalable fintech platform with authentication, payments, and real-time features",
    metrics: [
      { label: "Time to Market", value: "10 weeks" },
      { label: "Initial Users", value: "5,000+" }
    ],
    technologies: ["Vue.js", "Firebase", "Stripe Connect", "TailwindCSS", "Netlify"],
    image: "/images/startup-case.jpg"
  }
]

// Advanced code editor with syntax highlighting
function AnimatedCodeEditor() {
  const [selectedFile, setSelectedFile] = useState(0);
  const codeFiles = [
    {
      name: "App.tsx",
      language: "typescript",
      code: [
        "import { useState, useEffect, Suspense } from 'react';",
        "import { motion, AnimatePresence } from 'framer-motion';",
        "import { Canvas } from '@react-three/fiber';",
        "import { Environment, ContactShadows } from '@react-three/drei';",
        "import { fetchData } from './api';",
        "import { ProductDisplay } from './components/ProductDisplay';",
        "import { LoadingSpinner } from './components/ui/LoadingSpinner';",
        "",
        "export function App() {",
        "  const [products, setProducts] = useState([]);",
        "  const [loading, setLoading] = useState(true);",
        "",
        "  useEffect(() => {",
        "    fetchData().then(result => {",
        "      setProducts(result);",
        "      setLoading(false);",
        "    });",
        "  }, []);",
        "",
        "  return (",
        "    <div className=\"h-screen w-full bg-gradient-to-b from-slate-900 to-indigo-900\">",
        "      <AnimatePresence>",
        "        {loading ? (",
        "          <motion.div",
        "            key=\"loading\"",
        "            initial={{ opacity: 0 }}",
        "            animate={{ opacity: 1 }}",
        "            exit={{ opacity: 0 }}",
        "          >",
        "            <LoadingSpinner />",
        "          </motion.div>",
        "        ) : (",
        "          <motion.div",
        "            className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8\"",
        "            initial={{ opacity: 0, y: 20 }}",
        "            animate={{ opacity: 1, y: 0 }}",
        "            transition={{ staggerChildren: 0.1 }}",
        "          >",
        "            {products.map(product => (",
        "              <motion.div",
        "                key={product.id}",
        "                initial={{ opacity: 0, scale: 0.9 }}",
        "                animate={{ opacity: 1, scale: 1 }}",
        "                whileHover={{ scale: 1.05, y: -5 }}",
        "                className=\"relative h-[400px] rounded-xl overflow-hidden\"",
        "              >",
        "                <Suspense fallback={<LoadingSpinner />}>",
        "                  <Canvas>",
        "                    <ambientLight intensity={0.5} />",
        "                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />",
        "                    <ProductDisplay product={product} />",
        "                    <Environment preset=\"city\" />",
        "                    <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />",
        "                  </Canvas>",
        "                </Suspense>",
        "                <div className=\"absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm\">",
        "                  <h3 className=\"text-white text-xl font-bold\">{product.name}</h3>",
        "                  <p className=\"text-white/70\">${product.price}</p>",
        "                </div>",
        "              </motion.div>",
        "            ))}",
        "          </motion.div>",
        "        )}",
        "      </AnimatePresence>",
        "    </div>",
        "  );",
        "}",
      ],
    },
    {
      name: "ProductDisplay.tsx",
      language: "typescript",
      code: [
        "import { useRef } from 'react';",
        "import { useFrame } from '@react-three/fiber';",
        "import { useGLTF } from '@react-three/drei';",
        "",
        "export function ProductDisplay({ product }) {",
        "  const modelRef = useRef();",
        "  const { scene } = useGLTF(product.modelUrl);",
        "",
        "  useFrame((state) => {",
        "    const t = state.clock.getElapsedTime();",
        "    modelRef.current.rotation.y = Math.sin(t / 2) * 0.5;",
        "    modelRef.current.position.y = Math.sin(t) * 0.1;",
        "  });",
        "",
        "  return (",
        "    <primitive",
        "      ref={modelRef}",
        "      object={scene}",
        "      scale={product.scale || 1}",
        "      position={[0, 0, 0]}",
        "    />",
        "  );",
        "}",
      ],
    },
    {
      name: "api.ts",
      language: "typescript",
      code: [
        "import { Product } from './types';",
        "",
        "const API_URL = 'https://api.example.com/products';",
        "",
        "export async function fetchData(): Promise<Product[]> {",
        "  try {",
        "    const response = await fetch(API_URL);",
        "    ",
        "    if (!response.ok) {",
        "      throw new Error(`API request failed: ${response.status}`);",
        "    }",
        "",
        "    const data = await response.json();",
        "    return data.products;",
        "  } catch (error) {",
        "    console.error('Error fetching products:', error);",
        "    return [];",
        "  }",
        "}",
      ],
    },
  ];

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl shadow-indigo-500/20">
      <div className="flex items-center bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex space-x-2 mr-4">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex space-x-2">
          {codeFiles.map((file, index) => (
            <button
              key={index}
              className={`px-3 py-1 text-xs rounded-t-md transition-colors ${
                selectedFile === index
                  ? "bg-gray-700 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700/50"
              }`}
              onClick={() => setSelectedFile(index)}
            >
              {file.name}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 font-mono text-sm overflow-auto max-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFile}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-1">
              {codeFiles[selectedFile].code.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.01, duration: 0.2 }}
                  className="flex"
                >
                  <span className="text-gray-500 w-10 text-right mr-4 select-none">
                    {index + 1}
                  </span>
                  <span
                    className={
                      line.includes("import") || line.includes("export")
                        ? "text-purple-400"
                        : line.includes("function") || line.includes("=>")
                        ? "text-blue-400"
                        : line.includes("const") ||
                          line.includes("let") ||
                          line.includes("var") ||
                          line.includes("useState") ||
                          line.includes("useEffect") ||
                          line.includes("useRef") ||
                          line.includes("useFrame")
                        ? "text-cyan-400"
                        : line.includes("return")
                        ? "text-green-400"
                        : line.includes("<motion") ||
                          line.includes("</motion") ||
                          line.includes("<Canvas") ||
                          line.includes("</Canvas") ||
                          line.includes("<Suspense") ||
                          line.includes("</Suspense")
                        ? "text-yellow-400"
                        : line.includes("initial") ||
                          line.includes("animate") ||
                          line.includes("exit") ||
                          line.includes("transition") ||
                          line.includes("whileHover")
                        ? "text-pink-400"
                        : line.includes("className")
                        ? "text-orange-400"
                        : line.includes("async") || line.includes("await") || line.includes("Promise")
                        ? "text-amber-400"
                        : line.match(/"[^"]*"|'[^']*'/)
                        ? "text-green-300"
                        : "text-gray-300"
                    }
                  >
                    {line}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Technology Badge Component
function TechBadge({ name }: { name: string }) {
  return (
    <div className="px-3 py-1 bg-indigo-500/20 rounded-full text-xs font-medium text-indigo-300 border border-indigo-500/30">
      {name}
    </div>
  );
}

export default function WebAppsPage() {
  const [selectedTech, setSelectedTech] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const featuresY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const featuresOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  const caseStudiesY = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);
  const caseStudiesOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  
  return (
    <main className="bg-gradient-to-b from-[#030712] via-[#0f1c3f] to-[#0f172a] text-white min-h-screen" ref={containerRef}>
      {/* Particle background */}
      <ParticleFlow />
      
      {/* Hero section */}
      <section className="relative pt-24 pb-40 overflow-hidden">
        {/* Gradient background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-blue-500/20 rounded-full filter blur-[120px] opacity-50"></div>
          <div className="absolute bottom-40 left-20 w-[250px] h-[250px] bg-purple-500/20 rounded-full filter blur-[100px] opacity-30"></div>
          <div className="absolute top-60 left-1/3 w-[200px] h-[200px] bg-cyan-500/20 rounded-full filter blur-[80px] opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-1 mb-6 text-sm font-medium bg-indigo-500/20 text-indigo-300 rounded-full">
                  Web Application Development
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    Next-Generation
                  </span> Web Applications
                </h1>
                <p className="text-lg text-white/80 mb-6">
                  Build responsive, user-friendly web applications that deliver exceptional experiences. Our full-stack development approach ensures your applications are robust, secure, and scalable.
                </p>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 h-[450px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-full"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <WebExperience />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technologies section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-indigo-500/20 text-indigo-300 rounded-full">
              Our Tech Stack
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Cutting-Edge Technologies
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We leverage the latest web technologies to create scalable, performant, and feature-rich applications.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {webTechnologies.map((tech, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer relative overflow-hidden rounded-xl p-6 ${selectedTech === index ? 'bg-gradient-to-br ' + tech.color + ' ring-2 ring-white/20' : 'bg-white/5 hover:bg-white/10'} transition-all duration-300`}
                onClick={() => setSelectedTech(index)}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
                <p className={`text-sm ${selectedTech === index ? 'text-white/90' : 'text-gray-400'} mb-4`}>
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedTech}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 rounded-xl p-6 mb-12"
            >
              <div className="flex flex-wrap gap-3 mb-8">
                {webTechnologies[selectedTech].technologies.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-lg border border-indigo-500/30 text-white"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
              
              <div className="lg:flex gap-8 items-center">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <AnimatedCodeEditor />
                </div>
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                    {webTechnologies[selectedTech].title} Benefits
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Improved performance and user experience",
                      "Better developer productivity and code quality",
                      "Seamless integration with existing systems",
                      "Future-proof architecture and scalability",
                      "Enhanced security and reliability"
                    ].map((benefit, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1">
                          <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                        </div>
                        <p className="text-gray-300">{benefit}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-20 bg-gradient-to-b from-[#0f172a] to-[#0f1c3f]">
        <motion.div
          className="container mx-auto px-4"
          style={{ opacity: featuresOpacity, y: featuresY }}
        >
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-indigo-500/20 text-indigo-300 rounded-full">
              Key Capabilities
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Modern Web Application Features
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our web applications leverage advanced technologies to deliver exceptional user experiences and business value.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-6 h-full transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-indigo-500/20 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                
                <motion.div 
                  className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredFeature === index ? "100%" : "20%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Case studies section */}
      <section className="py-20 bg-[#0f1c3f]">
        <motion.div
          className="container mx-auto px-4"
          style={{ opacity: caseStudiesOpacity, y: caseStudiesY }}
        >
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-indigo-500/20 text-indigo-300 rounded-full">
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Recent Web Application Projects
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore how we've helped businesses transform their web presence with innovative solutions.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden h-full transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 bg-gray-800 relative overflow-hidden">
                  {/* Placeholder image gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    index === 0 ? 'from-blue-500/40 to-indigo-600/40' : 
                    index === 1 ? 'from-purple-500/40 to-pink-600/40' : 
                    'from-emerald-500/40 to-cyan-600/40'
                  } opacity-80`}></div>
                  
                  {/* Icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {index === 0 ? (
                      <ShoppingCart className="h-20 w-20 text-white/40" />
                    ) : index === 1 ? (
                      <Layers className="h-20 w-20 text-white/40" />
                    ) : (
                      <Rocket className="h-20 w-20 text-white/40" />
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                  <p className="text-gray-400 mb-4">{study.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.technologies.map((tech, i) => (
                      <TechBadge key={i} name={tech} />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/10">
                    {study.metrics.map((metric, i) => (
                      <div key={i}>
                        <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                          {metric.value}
                        </p>
                        <p className="text-gray-400 text-sm">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    className="w-full mt-4 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Case Study <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 bg-gradient-to-b from-[#0f1c3f] to-[#030712]">
        <div className="container mx-auto px-4">
          <motion.div
            className="relative bg-gradient-to-r from-indigo-900/50 to-blue-900/50 rounded-2xl p-8 md:p-12 overflow-hidden border border-indigo-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full filter blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-[200px] h-[200px] bg-indigo-500/10 rounded-full filter blur-[50px]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Web Application?</h2>
                <p className="text-gray-300 max-w-2xl">
                  Let's discuss how our cutting-edge web application development services can help you achieve your business goals.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-indigo-500"></div>
                    <span className="text-sm text-gray-300">Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-indigo-500"></div>
                    <span className="text-sm text-gray-300">Technical Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-indigo-500"></div>
                    <span className="text-sm text-gray-300">Custom Solution Design</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

// Missing components
function ShoppingCart({ className, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function Rocket({ className, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
