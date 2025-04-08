"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import PageTemplate from "@/components/templates/page-template"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Code2, Database, Globe, LineChart, Rocket, Server, Shield, Smartphone, Monitor, Cpu, Cloud, CheckCircle2, Calendar, TrendingUp, Users, Zap, LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

// Define case study type
interface CaseStudy {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  client: string;
  duration: string;
  year: string;
  stats: {
    improvement: string;
    timeframe: string;
    impact: string;
  };
  technologies: string[];
  icon: LucideIcon;
  color: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  testimonial: {
    quote: string;
    author: string;
  };
}

// Case studies data (same as in the main page)
const caseStudies: CaseStudy[] = [
  {
    id: "enterprise-digital-transformation",
    title: "Enterprise Digital Transformation",
    description: "Complete digital overhaul for Fortune 500 company with cloud migration and process automation",
    fullDescription: "A Fortune 500 manufacturing company was struggling with outdated legacy systems that were hindering productivity and growth. We implemented a comprehensive digital transformation strategy that included cloud migration, process automation, and a modern microservices architecture.",
    image: "/Website_image/Website/Trang chủ/366x192/Enterprise.png",
    category: "Enterprise Solutions",
    client: "Global Manufacturing Leader",
    duration: "12 Months",
    year: "2022",
    stats: {
      improvement: "200% Efficiency Increase",
      timeframe: "12 Months",
      impact: "$2M Cost Savings"
    },
    technologies: ["Cloud Architecture", "AI Integration", "Process Automation", "Microservices", "DevOps"],
    icon: Globe,
    color: "from-blue-500 to-indigo-600",
    challenges: [
      "Legacy systems with high maintenance costs",
      "Siloed data across departments",
      "Manual processes causing delays and errors",
      "Difficulty scaling operations to meet demand"
    ],
    solutions: [
      "Cloud migration to AWS with optimized infrastructure",
      "Custom microservices architecture for core business processes",
      "AI-powered automation of repetitive tasks",
      "Centralized data platform with real-time analytics",
      "DevOps implementation for continuous delivery"
    ],
    results: [
      "200% increase in operational efficiency",
      "$2M annual cost savings from reduced infrastructure",
      "75% reduction in system downtime",
      "90% faster deployment of new features",
      "Improved data-driven decision making across departments"
    ],
    testimonial: {
      quote: "The digital transformation initiative has revolutionized how we operate. We've seen dramatic improvements in efficiency and our ability to innovate quickly.",
      author: "CTO, Global Manufacturing Leader"
    }
  },
  {
    id: "ai-powered-analytics",
    title: "AI-Powered Analytics Platform",
    description: "Machine learning solution for data-driven decisions with real-time insights and predictive modeling",
    fullDescription: "A leading financial services company needed to leverage their vast data resources to improve decision-making and customer insights. We developed a comprehensive AI-powered analytics platform that transformed raw data into actionable intelligence.",
    image: "/Website_image/Website/Trang chủ/366x192/AI-Powered.png",
    category: "AI & Analytics",
    client: "Financial Services Provider",
    duration: "6 Months",
    year: "2023",
    stats: {
      improvement: "85% Faster Analysis",
      timeframe: "6 Months",
      impact: "3x ROI"
    },
    technologies: ["Machine Learning", "Big Data", "Real-time Analytics", "Python", "TensorFlow"],
    icon: LineChart,
    color: "from-purple-500 to-pink-600",
    challenges: [
      "Massive volumes of unstructured data",
      "Slow, manual reporting processes",
      "Inability to predict market trends",
      "Limited customer segmentation capabilities"
    ],
    solutions: [
      "Custom machine learning models for predictive analytics",
      "Real-time data processing pipeline",
      "Interactive dashboards for business intelligence",
      "Automated reporting and anomaly detection",
      "Customer segmentation and behavior analysis"
    ],
    results: [
      "85% faster data analysis and reporting",
      "3x return on investment within first year",
      "Identified $4.5M in new revenue opportunities",
      "42% improvement in customer targeting accuracy",
      "Reduced risk exposure through predictive modeling"
    ],
    testimonial: {
      quote: "This analytics platform has transformed how we understand our customers and market. The predictive capabilities have given us a significant competitive advantage.",
      author: "Chief Data Officer, Financial Services Provider"
    }
  },
  {
    id: "secure-banking-infrastructure",
    title: "Secure Banking Infrastructure",
    description: "Modern banking platform with enhanced security protocols and seamless API integrations",
    fullDescription: "A regional bank was facing increasing security threats and integration challenges with their legacy banking systems. We developed a secure, modern banking infrastructure that enhanced protection while enabling seamless integration with fintech partners.",
    image: "/Website_image/Website/Trang chủ/366x192/Secure Banking.png",
    category: "FinTech",
    client: "Regional Banking Institution",
    duration: "18 Months",
    year: "2022",
    stats: {
      improvement: "99.99% Uptime",
      timeframe: "18 Months",
      impact: "Zero Security Breaches"
    },
    technologies: ["Blockchain", "Cloud Security", "API Integration", "OAuth 2.0", "Microservices"],
    icon: Shield,
    color: "from-emerald-500 to-teal-600",
    challenges: [
      "Increasing cybersecurity threats",
      "Legacy systems with limited integration capabilities",
      "Regulatory compliance requirements",
      "Need for modern banking features"
    ],
    solutions: [
      "Zero-trust security architecture implementation",
      "Secure API gateway for fintech integrations",
      "Blockchain-based transaction verification",
      "Microservices architecture for banking functions",
      "Comprehensive compliance monitoring and reporting"
    ],
    results: [
      "99.99% system uptime since deployment",
      "Zero security breaches in high-risk environment",
      "Seamless integration with 15+ fintech partners",
      "Full regulatory compliance with automated reporting",
      "Enabled launch of 8 new digital banking products"
    ],
    testimonial: {
      quote: "The new banking infrastructure has given us peace of mind regarding security while allowing us to innovate and partner with fintech companies like never before.",
      author: "CIO, Regional Banking Institution"
    }
  },
  {
    id: "mobile-commerce-platform",
    title: "Mobile Commerce Platform",
    description: "Cross-platform retail solution with AR features and seamless payment processing",
    fullDescription: "A retail chain wanted to transform their customer experience with an innovative mobile commerce platform. We developed a cross-platform solution with augmented reality features that revolutionized how customers shop both online and in-store.",
    image: "/Website_image/Website/Trang chủ/366x192/Mobile Commerce.png",
    category: "Mobile Development",
    client: "National Retail Chain",
    duration: "9 Months",
    year: "2023",
    stats: {
      improvement: "150% User Engagement",
      timeframe: "9 Months",
      impact: "2M+ Downloads"
    },
    technologies: ["React Native", "AR Kit", "Payment Integration", "GraphQL", "Firebase"],
    icon: Smartphone,
    color: "from-orange-500 to-red-600",
    challenges: [
      "Fragmented customer experience across channels",
      "Limited mobile engagement",
      "Complex inventory management",
      "Payment processing friction"
    ],
    solutions: [
      "Cross-platform mobile app with React Native",
      "AR product visualization features",
      "Seamless payment processing integration",
      "Real-time inventory synchronization",
      "Personalized recommendations engine"
    ],
    results: [
      "150% increase in mobile user engagement",
      "2M+ app downloads in first year",
      "35% higher average order value through AR features",
      "28% reduction in cart abandonment",
      "42% of in-store purchases influenced by mobile app"
    ],
    testimonial: {
      quote: "The mobile platform has transformed our relationship with customers. The AR features in particular have created an engaging shopping experience that bridges online and in-store.",
      author: "VP of Digital, National Retail Chain"
    }
  },
  {
    id: "saas-application-modernization",
    title: "SaaS Application Modernization",
    description: "Legacy system transformation with modern architecture and improved developer experience",
    fullDescription: "A growing SaaS company was struggling with an outdated codebase that was limiting their ability to add features and scale. We completely modernized their application architecture while maintaining business continuity throughout the transition.",
    image: "/Website_image/Website/Trang chủ/366x192/SaaS Application.png",
    category: "Cloud Solutions",
    client: "B2B SaaS Provider",
    duration: "8 Months",
    year: "2022",
    stats: {
      improvement: "3x Development Speed",
      timeframe: "8 Months",
      impact: "38% User Retention Increase"
    },
    technologies: ["React", "GraphQL", "Node.js", "Docker", "AWS"],
    icon: Cloud,
    color: "from-cyan-500 to-blue-600",
    challenges: [
      "Monolithic legacy codebase",
      "Slow development cycles",
      "Scaling limitations",
      "Poor developer experience"
    ],
    solutions: [
      "Microservices architecture implementation",
      "Modern React frontend with component library",
      "GraphQL API layer for flexible data fetching",
      "Containerized deployment with Docker and Kubernetes",
      "Comprehensive CI/CD pipeline"
    ],
    results: [
      "3x faster development and deployment cycles",
      "38% increase in user retention",
      "65% reduction in infrastructure costs",
      "90% improvement in system scalability",
      "Significantly improved developer satisfaction and recruitment"
    ],
    testimonial: {
      quote: "The modernization of our platform has been transformative. We can now ship features in days instead of months, and our customers are noticing the improved performance and reliability.",
      author: "CEO, B2B SaaS Provider"
    }
  },
  {
    id: "ecommerce-platform-transformation",
    title: "E-commerce Platform Transformation",
    description: "Complete redesign with modern tech stack and optimized conversion funnel",
    fullDescription: "An established online retailer was experiencing performance issues and declining conversion rates with their aging e-commerce platform. We delivered a complete transformation using modern technologies that dramatically improved performance and user experience.",
    image: "/Website_image/Website/Trang chủ/366x192/E-commerce Platform.png",
    category: "Web Development",
    client: "Online Retail Company",
    duration: "5 Months",
    year: "2023",
    stats: {
      improvement: "64% Conversion Rate",
      timeframe: "5 Months",
      impact: "82% Performance Boost"
    },
    technologies: ["Next.js", "Tailwind CSS", "Stripe", "Sanity.io", "Vercel"],
    icon: Monitor,
    color: "from-indigo-500 to-violet-600",
    challenges: [
      "Slow page load times",
      "Poor mobile experience",
      "Complex checkout process",
      "Limited content management capabilities",
      "Difficulty implementing new features"
    ],
    solutions: [
      "Next.js frontend with static generation and ISR",
      "Responsive design with Tailwind CSS",
      "Streamlined checkout with Stripe integration",
      "Headless CMS implementation with Sanity.io",
      "Edge-optimized deployment on Vercel"
    ],
    results: [
      "64% increase in conversion rate",
      "82% improvement in core web vitals",
      "47% increase in mobile traffic and engagement",
      "35% reduction in cart abandonment",
      "Empowered marketing team with flexible content management"
    ],
    testimonial: {
      quote: "The new platform has exceeded our expectations in every way. The performance improvements alone have had a dramatic impact on our bottom line.",
      author: "Director of E-commerce, Online Retail Company"
    }
  }
];

// Function to render tech badge
function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10 hover:bg-white/20 transition-colors">
      {name}
    </span>
  );
}

export default function CaseStudyDetailPage() {
  const params = useParams();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [relatedCaseStudies, setRelatedCaseStudies] = useState<CaseStudy[]>([]);
  
  useEffect(() => {
    // Find the case study by ID
    const study = caseStudies.find(study => study.id === params.id);
    if (study) {
      setCaseStudy(study);
      
      // Find related case studies (different from current, max 3)
      const related = caseStudies
        .filter(s => s.id !== study.id)
        .sort(() => 0.5 - Math.random()) // Simple random sort
        .slice(0, 3);
      setRelatedCaseStudies(related);
    }
  }, [params.id]);
  
  if (!caseStudy) {
    return (
      <PageTemplate title="Case Study" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="h-12 w-12 rounded-full border-t-2 border-[#00b8ff] animate-spin"></div>
        </div>
      </PageTemplate>
    );
  }
  
  const IconComponent = caseStudy.icon;
  
  return (
    <PageTemplate 
      title={caseStudy.title}
      subtitle={caseStudy.category}
    >
      {/* Back Link */}
      <div className="mb-8">
        <Link 
          href="/work/case-studies" 
          className="inline-flex items-center text-white/70 hover:text-[#00b8ff] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Case Studies
        </Link>
      </div>
      
      {/* Hero Section */}
      <section className="mb-16">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${caseStudy.color} p-8 md:p-12`}
        >
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black/20 text-white mb-6">
              <IconComponent className="h-4 w-4 mr-2" /> {caseStudy.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">{caseStudy.title}</h1>
            <p className="text-xl text-white/90 mb-6">
              {caseStudy.fullDescription}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Calendar className="h-5 w-5 text-white/80" />
                <div>
                  <div className="text-sm text-white/60">Duration</div>
                  <div className="font-medium">{caseStudy.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Users className="h-5 w-5 text-white/80" />
                <div>
                  <div className="text-sm text-white/60">Client</div>
                  <div className="font-medium">{caseStudy.client}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white/80" />
                <div>
                  <div className="text-sm text-white/60">Year</div>
                  <div className="font-medium">{caseStudy.year}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Key Results Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Key Results</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Measurable outcomes and impact delivered through our solution
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(caseStudy.stats).map(([key, value]) => (
            <motion.div
              key={key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#0021a7]/20 to-[#00b8ff]/20 mb-4">
                {key === 'improvement' && <TrendingUp className="h-8 w-8 text-[#00b8ff]" />}
                {key === 'timeframe' && <Calendar className="h-8 w-8 text-[#00b8ff]" />}
                {key === 'impact' && <Zap className="h-8 w-8 text-[#00b8ff]" />}
              </div>
              <div className="text-2xl font-bold text-white mb-2">{value}</div>
              <div className="text-white/60">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Challenge and Solution Section */}
      <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Challenges */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideIn}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
              <Shield className="h-5 w-5 text-red-400" />
            </div>
            Challenges
          </h2>
          <div className="space-y-4">
            {caseStudy.challenges.map((challenge: string, index: number) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-white/80">{challenge}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Solutions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideIn}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
              <Zap className="h-5 w-5 text-emerald-400" />
            </div>
            Our Solution
          </h2>
          <div className="space-y-4">
            {caseStudy.solutions.map((solution: string, index: number) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <p className="text-white/80">{solution}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Technologies Used */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Technologies Used</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The tech stack that powered this solution
          </p>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex flex-wrap justify-center gap-3"
        >
          {caseStudy.technologies.map((tech: string) => (
            <div 
              key={tech}
              className="px-5 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <span className="text-white font-medium">{tech}</span>
            </div>
          ))}
        </motion.div>
      </section>
      
      {/* Results Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Results & Impact</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The measurable outcomes achieved through our solution
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-[#0021a7]/20 to-[#00b8ff]/20 rounded-2xl p-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                {caseStudy.results.map((result: string, index: number) => (
                  <motion.div 
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { 
                        opacity: 1, 
                        x: 0, 
                        transition: { 
                          duration: 0.4,
                          delay: index * 0.1
                        } 
                      }
                    }}
                    className="flex items-start gap-3"
                  >
                    <div className="h-6 w-6 rounded-full bg-[#00b8ff]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#00b8ff]" />
                    </div>
                    <p className="text-white/90 font-medium">{result}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-white/10 rounded-xl p-6 border border-white/10 max-w-md"
              >
                <div className="text-[#00b8ff] text-4xl font-serif mb-4">"</div>
                <blockquote className="text-white/90 text-lg italic mb-6">
                  {caseStudy.testimonial.quote}
                </blockquote>
                <div className="text-white font-medium">{caseStudy.testimonial.author}</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Case Studies */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Related Case Studies</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore more success stories from our portfolio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedCaseStudies.map((study) => {
            const StudyIcon = study.icon;
            return (
              <motion.div
                key={study.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="group flex flex-col overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${study.color} opacity-40`}></div>
                  
                  {/* Background image */}
                  <Image 
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover object-center opacity-60 mix-blend-overlay"
                  />
                  
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/30 text-white">
                      {study.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00b8ff] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-white/70 mb-4 line-clamp-2">
                    {study.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Link 
                      href={`/work/case-studies/${study.id}`}
                      className="inline-flex items-center text-[#00b8ff] hover:text-white transition-colors"
                    >
                      View Case Study <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="rounded-xl bg-gradient-to-r from-[#0021a7] to-[#00b8ff] p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-5 text-white">
            Ready to achieve similar results?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90 px-4">
            Let's discuss how our expertise can help you overcome challenges and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg bg-white text-[#0021a7] hover:bg-gray-100 transition-colors"
            >
              Schedule a Consultation
            </Link>
            <Link 
              href="/services" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTemplate>
  );
} 