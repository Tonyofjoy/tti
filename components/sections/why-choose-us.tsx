"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, AnimatePresence, MotionValue } from "framer-motion"
import { 
  Award, 
  Sparkles, 
  Lightbulb, 
  Rocket, 
  Target, 
  Users2, 
  Zap, 
  BarChart3, 
  Layers, 
  Workflow,
  ArrowRight,
  Check,
  Clock,
  Cpu
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Animated number component with improved visuals
const AnimatedStat = ({ 
  value, 
  label, 
  icon: Icon,
  color
}: { 
  value: string; 
  label: string; 
  icon: any;
  color: string;
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-20 blur-xl transition-all duration-500 group-hover:opacity-30 group-hover:blur-xl",
        color
      )} />
      <div className="relative flex items-center gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
        <div className={cn(
          "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
          color
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <div ref={ref} className="text-2xl font-bold">{value}</div>
          <p className="text-sm text-white/60">{label}</p>
        </div>
      </div>
    </motion.div>
  )
}

// 3D Card component for innovative features
const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color,
  delay = 0
}: { 
  title: string; 
  description: string; 
  icon: any;
  color: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group perspective"
    >
      <div className="relative preserve-3d transition-all duration-500 group-hover:my-rotate-y-180 w-full h-full">
        {/* Front of card */}
        <div className="absolute backface-hidden w-full h-full">
          <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm flex flex-col items-center justify-center text-center">
            <div className={cn(
              "w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110",
              color
            )}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute my-rotate-y-180 backface-hidden w-full h-full">
          <div className="h-full p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center">
            <p className="text-white/80 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Interactive process step component
const ProcessStep = ({ 
  step, 
  title, 
  description, 
  isActive, 
  onClick 
}: { 
  step: number; 
  title: string; 
  description: string; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer rounded-xl transition-all duration-300 overflow-hidden",
        isActive 
          ? "bg-gradient-to-r from-[#0021a7]/20 to-[#00b8ff]/10 border border-[#00b8ff]/30" 
          : "bg-white/[0.03] border border-white/10 hover:border-white/20"
      )}
      whileHover={{ x: isActive ? 0 : 5 }}
    >
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold",
            isActive 
              ? "bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white" 
              : "bg-white/10 text-white/70"
          )}>
            {step}
          </div>
          <div className="flex-grow">
            <h4 className="text-lg font-bold">{title}</h4>
            {isActive && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-white/60 mt-2 text-sm"
              >
                {description}
              </motion.p>
            )}
          </div>
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
            isActive ? "bg-[#00b8ff]/20" : "bg-white/5"
          )}>
            <Check className={cn(
              "h-4 w-4 transition-opacity",
              isActive ? "opacity-100 text-[#00b8ff]" : "opacity-40"
            )} />
          </div>
        </div>
      </div>
      {isActive && (
        <motion.div 
          className="h-1 bg-gradient-to-r from-[#0021a7] to-[#00b8ff]"
          layoutId="activeProcessIndicator"
        />
      )}
    </motion.div>
  )
}

// Testimonial component
const ClientQuote = ({ 
  quote, 
  author, 
  role, 
  company 
}: { 
  quote: string; 
  author: string; 
  role: string; 
  company: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-6"
    >
      <div className="mb-4 text-[#00b8ff]">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 11L8 17H5L7 11H5V8H10V11ZM19 11L17 17H14L16 11H14V8H19V11Z" fill="currentColor" />
        </svg>
      </div>
      <p className="text-white/80 italic mb-4">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0021a7] to-[#00b8ff] flex items-center justify-center text-white font-bold">
          {author.charAt(0)}
        </div>
        <div>
          <div className="font-semibold">{author}</div>
          <div className="text-sm text-white/60">{role}, {company}</div>
        </div>
      </div>
    </motion.div>
  )
}

// Updated innovative features
const innovativeFeatures = [
  {
    icon: Lightbulb,
    title: "AI-Powered Solutions",
    description: "Cutting-edge artificial intelligence that adapts to your business needs and evolves with your growth",
    color: "bg-gradient-to-r from-amber-500 to-orange-600"
  },
  {
    icon: Rocket,
    title: "Rapid Development",
    description: "Accelerated delivery without compromising quality through our optimized agile methodology",
    color: "bg-gradient-to-r from-[#0021a7] to-[#00b8ff]"
  },
  {
    icon: Target,
    title: "Strategic Approach",
    description: "Data-driven strategies aligned with your business objectives for maximum ROI",
    color: "bg-gradient-to-r from-emerald-500 to-teal-600"
  },
  {
    icon: Cpu,
    title: "Scalable Architecture",
    description: "Future-proof solutions designed to scale seamlessly with your business growth",
    color: "bg-gradient-to-r from-violet-600 to-purple-700"
  },
  {
    icon: Users2,
    title: "Expert Team",
    description: "Seasoned professionals with specialized expertise across multiple technology domains",
    color: "bg-gradient-to-r from-rose-500 to-pink-600"
  },
  {
    icon: Workflow,
    title: "Seamless Integration",
    description: "Smooth integration with your existing systems and third-party services",
    color: "bg-gradient-to-r from-cyan-500 to-blue-600"
  },
]

// Updated process steps
const enhancedProcess = [
  {
    title: "Discovery & Strategy",
    description: "We begin with a comprehensive analysis of your business needs, market position, and technology landscape to develop a strategic roadmap.",
  },
  {
    title: "Design & Prototyping",
    description: "Our design team creates intuitive user experiences and rapid prototypes for validation before full development begins.",
  },
  {
    title: "Agile Development",
    description: "Using agile methodologies, we build your solution in iterative cycles with continuous feedback and adaptation.",
  },
  {
    title: "Testing & Refinement",
    description: "Rigorous quality assurance and user testing ensures your solution is robust, secure, and user-friendly.",
  },
  {
    title: "Deployment & Launch",
    description: "Seamless deployment with zero downtime, followed by a strategic launch plan to maximize adoption.",
  },
  {
    title: "Continuous Improvement",
    description: "Ongoing support, monitoring, and iterative enhancements to keep your solution at the cutting edge.",
  },
]

// Client testimonials
const clientTestimonials = [
  {
    quote: "The team delivered a transformative solution that exceeded our expectations and drove a 40% increase in operational efficiency.",
    author: "Sarah Johnson",
    role: "CTO",
    company: "Global Innovations Inc."
  },
  {
    quote: "Their strategic approach and technical expertise helped us launch our platform in half the expected time with outstanding results.",
    author: "Michael Chen",
    role: "Director of Digital",
    company: "Nexus Enterprises"
  },
  {
    quote: "We've worked with many technology partners, but none have delivered the level of innovation and reliability we've experienced here.",
    author: "Emma Williams",
    role: "VP of Operations",
    company: "Elevate Solutions"
  }
]

const WhyChooseUs = () => {
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % clientTestimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0021a7] rounded-full opacity-20 filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00b8ff] rounded-full opacity-10 filter blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-purple-600 rounded-full opacity-10 filter blur-[80px] animate-pulse" style={{ animationDelay: "4s" }} />
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Innovative section header */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles className="h-4 w-4 text-[#00b8ff]" />
              <span className="text-sm font-medium">Transforming Ideas into Digital Reality</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Why Leading Companies 
              <span className="block bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                Choose Our Expertise
              </span>
            </h2>
            
            <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
              We combine cutting-edge technology with strategic thinking to deliver solutions that drive real business growth and competitive advantage.
            </p>
          </motion.div>
        </div>

        {/* Key metrics with improved visuals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <AnimatedStat 
            value="98%" 
            label="Client satisfaction rate" 
            icon={BarChart3}
            color="bg-gradient-to-r from-emerald-500 to-teal-600"
          />
          <AnimatedStat 
            value="200+" 
            label="Projects delivered" 
            icon={Layers}
            color="bg-gradient-to-r from-[#0021a7] to-[#00b8ff]"
          />
          <AnimatedStat 
            value="15+" 
            label="Years of expertise" 
            icon={Clock}
            color="bg-gradient-to-r from-amber-500 to-orange-600"
          />
          <AnimatedStat 
            value="40+" 
            label="Technology experts" 
            icon={Users2}
            color="bg-gradient-to-r from-violet-600 to-purple-700"
          />
        </div>

        {/* Innovative features with 3D cards */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Our Innovative Approach
            </motion.h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Discover how our unique capabilities set us apart and drive exceptional results for our clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 h-[250px]">
            {innovativeFeatures.map((feature, index) => (
              <FeatureCard 
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Enhanced process visualization */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Our Proven Process
            </motion.h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              A systematic approach designed to deliver exceptional results with predictable outcomes
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              {enhancedProcess.map((process, index) => (
                <ProcessStep 
                  key={process.title}
                  step={index + 1}
                  title={process.title}
                  description={process.description}
                  isActive={activeProcess === index}
                  onClick={() => setActiveProcess(index)}
                />
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0021a7]/20 to-[#00b8ff]/10 rounded-2xl opacity-30 blur-xl" />
              <div className="relative h-full flex items-center justify-center p-8 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProcess}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#0021a7] to-[#00b8ff] flex items-center justify-center">
                      <span className="text-2xl font-bold">{activeProcess + 1}</span>
                    </div>
                    <h4 className="text-2xl font-bold mb-4">{enhancedProcess[activeProcess].title}</h4>
                    <p className="text-white/70 mb-6">{enhancedProcess[activeProcess].description}</p>
                    
                    <div className="flex justify-center gap-2 mt-8">
                      {enhancedProcess.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveProcess(index)}
                          className={cn(
                            "w-3 h-3 rounded-full transition-all",
                            activeProcess === index 
                              ? "bg-[#00b8ff] scale-125" 
                              : "bg-white/20 hover:bg-white/40"
                          )}
                          aria-label={`Go to step ${index + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        
        {/* Client testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              What Our Clients Say
            </motion.h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Real feedback from organizations we've helped transform
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <ClientQuote 
                key={activeTestimonial}
                quote={clientTestimonials[activeTestimonial].quote}
                author={clientTestimonials[activeTestimonial].author}
                role={clientTestimonials[activeTestimonial].role}
                company={clientTestimonials[activeTestimonial].company}
              />
            </AnimatePresence>
            
            <div className="flex justify-center gap-2 mt-6">
              {clientTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeTestimonial === index 
                      ? "bg-[#00b8ff] w-6" 
                      : "bg-white/20 hover:bg-white/40"
                  )}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 sm:pr-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0021a7] to-[#00b8ff] text-white font-medium">
              Ready to Transform Your Business?
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="text-white/80">Schedule a strategic consultation</span>
              <ArrowRight className="h-4 w-4 text-[#00b8ff]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Add these CSS classes to your global CSS file
const globalCssAdditions = `
.perspective {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.my-rotate-y-180 {
  transform: rotateY(180deg);
}

.group:hover .group-hover\\:my-rotate-y-180 {
  transform: rotateY(180deg);
}
`

export default WhyChooseUs

