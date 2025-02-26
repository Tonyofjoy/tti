"use client"

import { useState } from "react"
import PageTemplate from "@/components/templates/page-template"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { 
  ArrowRight, 
  Code, 
  Database, 
  Cloud, 
  Cpu, 
  Smartphone, 
  Globe, 
  Server, 
  LineChart, 
  BarChart3, 
  Shield, 
  Cog, 
  Layers, 
  MessageSquare, 
  PenTool, 
  Mail, 
  Rocket, 
  Zap,
  Monitor,
  Check
} from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Service categories with their subcategories
const serviceCategories = [
  {
    id: "digital",
    title: "Marketing and Branding",
    description: "Comprehensive digital marketing and brand development solutions",
    icon: Monitor,
    color: "from-orange-500 to-red-600",
    benefits: [
      "Enhanced brand presence",
      "Improved customer engagement",
      "Increased conversion rates",
      "Consistent brand messaging"
    ],
    technologies: [
      "Adobe Creative Suite", "Figma", "WordPress", "Shopify", "HubSpot", "Mailchimp"
    ],
    subcategories: [
      {
        id: "design",
        title: "Digital Design",
        description: "User-centered design for exceptional digital experiences",
        icon: PenTool,
        link: "/services/digital/design",
        details: "Our digital design services create visually stunning, user-centered experiences that engage your audience and reinforce your brand identity. We combine aesthetics with functionality to design interfaces that are intuitive, accessible, and delightful to use."
      },
      {
        id: "brand",
        title: "Brand Development",
        description: "Strategic brand identity and positioning",
        icon: Globe,
        link: "/services/digital/brand",
        details: "Our brand development services help you create a distinctive identity that resonates with your target audience. We develop comprehensive brand strategies, visual identities, and messaging frameworks that communicate your unique value proposition consistently across all channels."
      },
      {
        id: "marketing",
        title: "Digital Marketing",
        description: "Data-driven marketing strategies for growth",
        icon: LineChart,
        link: "/services/digital/marketing",
        details: "Our digital marketing services implement data-driven strategies across multiple channels to reach your target audience effectively. We create campaigns that generate leads, build brand awareness, and drive conversions, with continuous optimization based on performance metrics."
      },
      {
        id: "email-automation",
        title: "Email Automation",
        description: "Automated email campaigns for customer engagement",
        icon: Mail,
        link: "/services/digital/email-automation",
        details: "Our email automation services create personalized, targeted email campaigns that nurture leads and engage customers throughout their journey. We implement automated workflows triggered by user behavior, ensuring timely, relevant communication that drives conversions."
      }
    ]
  },
  {
    id: "application",
    title: "Application Development",
    description: "Custom software solutions tailored to your business needs",
    icon: Code,
    color: "from-blue-500 to-indigo-600",
    benefits: [
      "Accelerated time-to-market",
      "Reduced development costs",
      "Improved user experience",
      "Scalable architecture"
    ],
    technologies: [
      "React", "Next.js", "Node.js", "Flutter", "AWS", "Azure"
    ],
    subcategories: [
      {
        id: "web-apps",
        title: "Web Applications",
        description: "Modern, responsive web applications with cutting-edge technologies",
        icon: Globe,
        link: "/services/application/web-apps",
        details: "Our web application development services deliver high-performance, responsive solutions that work seamlessly across all devices. We leverage modern frameworks and best practices to create applications that are not only visually appealing but also highly functional and scalable."
      },
      {
        id: "mobile-apps",
        title: "Mobile Applications",
        description: "Native and cross-platform mobile apps for iOS and Android",
        icon: Smartphone,
        link: "/services/application/mobile-apps",
        details: "We build native and cross-platform mobile applications that provide exceptional user experiences on iOS and Android devices. Our mobile solutions are designed with performance, usability, and offline capabilities in mind, ensuring your users stay engaged regardless of their connectivity."
      },
      {
        id: "enterprise-solutions",
        title: "Enterprise Solutions",
        description: "Scalable, secure enterprise-grade applications",
        icon: Server,
        link: "/services/application/enterprise-solutions",
        details: "Our enterprise solutions address complex business challenges with robust, secure, and scalable applications. We integrate with your existing systems and workflows to create cohesive solutions that improve operational efficiency and provide valuable business insights."
      },
      {
        id: "rapid-development",
        title: "Rapid Development",
        description: "Accelerated development with modern frameworks and methodologies",
        icon: Rocket,
        link: "/services/application/rapid-development",
        details: "Our rapid development approach combines agile methodologies, modern frameworks, and reusable components to significantly reduce time-to-market. We deliver functional prototypes quickly, allowing for early feedback and iterative improvements throughout the development process."
      }
    ]
  },
  {
    id: "ai",
    title: "AI & Automation",
    description: "Intelligent solutions powered by machine learning and AI",
    icon: Cpu,
    color: "from-purple-500 to-pink-600",
    benefits: [
      "Automated decision-making",
      "Predictive analytics",
      "Enhanced customer experiences",
      "Operational efficiency"
    ],
    technologies: [
      "TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "LangChain"
    ],
    subcategories: [
      {
        id: "solutions",
        title: "AI Solutions",
        description: "Custom AI solutions for business automation and optimization",
        icon: Zap,
        link: "/services/ai/solutions",
        details: "Our AI solutions leverage machine learning and deep learning technologies to automate processes, extract insights from data, and optimize business operations. We develop custom models tailored to your specific business challenges and integrate them seamlessly into your existing workflows."
      },
      {
        id: "conversational",
        title: "Conversational AI",
        description: "Chatbots and virtual assistants for enhanced customer engagement",
        icon: MessageSquare,
        link: "/services/ai/conversational",
        details: "Our conversational AI services create intelligent chatbots and virtual assistants that engage with your customers naturally and effectively. We design conversational experiences that understand context, learn from interactions, and provide helpful responses across multiple channels and languages."
      }
    ]
  },
  {
    id: "cloud",
    title: "Cloud Services",
    description: "Scalable, secure cloud infrastructure and management",
    icon: Cloud,
    color: "from-cyan-500 to-blue-600",
    benefits: [
      "Reduced infrastructure costs",
      "Improved scalability",
      "Enhanced security",
      "Disaster recovery"
    ],
    technologies: [
      "AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform"
    ],
    subcategories: [
      {
        id: "infrastructure",
        title: "Cloud Infrastructure",
        description: "Robust cloud architecture design and implementation",
        icon: Server,
        link: "/services/cloud/infrastructure",
        details: "Our cloud infrastructure services help you design, build, and optimize cloud environments that are secure, scalable, and cost-effective. We create architectures that leverage the best features of your chosen cloud platform while ensuring flexibility and avoiding vendor lock-in."
      },
      {
        id: "operations",
        title: "Cloud Operations",
        description: "Managed cloud services for optimal performance",
        icon: Cog,
        link: "/services/cloud/operations",
        details: "Our cloud operations services provide ongoing management and optimization of your cloud environment. We monitor performance, implement automation, and continuously optimize resources to ensure your applications run efficiently while controlling costs."
      },
      {
        id: "security",
        title: "Cloud Security",
        description: "Comprehensive security solutions for cloud environments",
        icon: Shield,
        link: "/services/cloud/security",
        details: "Our cloud security services implement robust protection for your cloud infrastructure and applications. We assess vulnerabilities, implement security controls, and provide continuous monitoring to protect your data and systems from evolving threats."
      },
      {
        id: "devops",
        title: "DevOps",
        description: "Streamlined development and operations with CI/CD pipelines",
        icon: Layers,
        link: "/services/cloud/devops",
        details: "Our DevOps services implement automated CI/CD pipelines, infrastructure as code, and monitoring solutions that streamline your development and deployment processes. We help your teams collaborate more effectively and deliver software faster with higher quality."
      }
    ]
  },
  {
    id: "data",
    title: "Data Services",
    description: "Transform your data into actionable insights",
    icon: Database,
    color: "from-emerald-500 to-teal-600",
    benefits: [
      "Data-driven decision making",
      "Improved data quality",
      "Centralized data access",
      "Real-time analytics"
    ],
    technologies: [
      "Snowflake", "Databricks", "Power BI", "Tableau", "BigQuery", "Apache Spark"
    ],
    subcategories: [
      {
        id: "architecture",
        title: "Data Architecture",
        description: "Scalable data architecture design and implementation",
        icon: Layers,
        link: "/services/data/architecture",
        details: "Our data architecture services design and implement scalable, efficient data structures that support your analytical and operational needs. We create architectures that organize your data logically, ensure data quality, and enable easy access for various use cases."
      },
      {
        id: "pipeline",
        title: "Data Pipeline",
        description: "Efficient data processing and ETL solutions",
        icon: Zap,
        link: "/services/data/pipeline",
        details: "Our data pipeline services build automated workflows that extract, transform, and load data reliably and efficiently. We implement pipelines that handle both batch and streaming data, ensuring your analytics and operational systems have access to up-to-date, high-quality data."
      },
      {
        id: "business-intelligence",
        title: "Business Intelligence",
        description: "Data visualization and analytics for informed decision-making",
        icon: BarChart3,
        link: "/services/data/business-intelligence",
        details: "Our business intelligence services transform raw data into meaningful insights through interactive dashboards and reports. We help you visualize key metrics, identify trends, and make data-driven decisions that improve business outcomes."
      }
    ]
  }
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);
  const [activeSubcategory, setActiveSubcategory] = useState(serviceCategories[0].subcategories[0].id);
  
  const selectedCategory = serviceCategories.find(category => category.id === activeCategory);
  const selectedSubcategory = selectedCategory?.subcategories.find(sub => sub.id === activeSubcategory);
  
  return (
    <PageTemplate 
      title="Our Services"
      subtitle="Comprehensive technology solutions for your business"
    >
      {/* Hero Section */}
      <section className="mb-16">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0021a7]/80 to-[#00b8ff]/80 p-8 md:p-12"
        >
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Transforming Ideas into Digital Reality</h2>
            <p className="text-lg text-white/90 mb-6">
              We offer a comprehensive suite of technology services designed to help businesses innovate, 
              optimize, and grow in today's digital landscape.
            </p>
            <div className="flex flex-wrap gap-3">
              {serviceCategories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setActiveSubcategory(category.subcategories[0].id);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-white text-[#0021a7]'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <CategoryIcon className="h-4 w-4" /> {category.title}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Service Explorer */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Service Explorer</h2>
            <p className="text-white/70 max-w-2xl">
              Explore our range of specialized services designed to meet your business needs
            </p>
          </div>
        </div>
        
        {/* Tab-based Service Explorer */}
        <div className="border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5">
          {/* Category Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-b border-white/10">
            {serviceCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setActiveSubcategory(category.subcategories[0].id);
                  }}
                  className={`py-4 px-2 text-sm md:text-base font-medium transition-colors flex flex-col items-center gap-2 ${
                    activeCategory === category.id
                      ? "border-b-2 border-[#00b8ff] text-[#00b8ff]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <CategoryIcon className="h-5 w-5" />
                  <span className="text-center">{category.title}</span>
                </button>
              );
            })}
          </div>
          
          {/* Subcategory Tabs */}
          {selectedCategory && (
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10">
              {selectedCategory.subcategories.map((subcategory) => {
                return (
                  <button
                    key={subcategory.id}
                    onClick={() => setActiveSubcategory(subcategory.id)}
                    className={`py-3 px-2 text-sm font-medium transition-colors ${
                      activeSubcategory === subcategory.id
                        ? "border-b-2 border-[#00b8ff] text-[#00b8ff]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {subcategory.title}
                  </button>
                );
              })}
            </div>
          )}
          
          {/* Service Details */}
          {selectedCategory && selectedSubcategory && (
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <h3 className="text-2xl font-bold mb-4 text-white">{selectedSubcategory.title}</h3>
                  <p className="text-white/70 mb-6">{selectedSubcategory.details}</p>
                  
                  <h4 className="font-semibold text-lg mb-2 text-white">Key Benefits</h4>
                  <ul className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedCategory.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-[#00b8ff] flex-shrink-0" />
                        <span className="text-white/70">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-semibold text-lg mb-2 text-white">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedCategory.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 border border-white/10 text-white/80 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={selectedSubcategory.link} 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-[#0021a7] to-[#00b8ff] text-white transition-colors"
                  >
                    Learn More About {selectedSubcategory.title} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="rounded-lg overflow-hidden h-full min-h-[300px] bg-gradient-to-br from-[#0021a7]/30 to-[#00b8ff]/30 backdrop-blur-sm border border-white/10 flex items-center justify-center p-8">
                    <div className="text-white text-center">
                      <div className="mb-4">
                        {selectedSubcategory.icon && <selectedSubcategory.icon className="h-16 w-16 mx-auto text-[#00b8ff] opacity-90" />}
                      </div>
                      <div className="text-xl font-semibold mb-4">
                        {selectedSubcategory.title}
                      </div>
                      <p className="text-white/70">
                        {selectedSubcategory.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Services */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Other {selectedCategory?.title} Services
            </h2>
            <p className="text-white/70 max-w-2xl">
              Explore more services in this category
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategory?.subcategories
            .filter(sub => sub.id !== activeSubcategory)
            .map((subcategory) => (
              <motion.div
                key={subcategory.id}
                variants={fadeIn}
                className="group"
              >
                <Link href={subcategory.link} className="block h-full">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-[#0021a7]/20 to-[#00b8ff]/20">
                        {subcategory.icon && <subcategory.icon className="h-5 w-5 text-[#00b8ff]" />}
                      </div>
                      <h3 className="text-lg font-bold">{subcategory.title}</h3>
                    </div>
                    <p className="text-white/70 mb-4 text-sm">
                      {subcategory.description}
                    </p>
                    <div className="inline-flex items-center text-sm font-medium text-[#00b8ff] group-hover:underline">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Service Process */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Service Process</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A streamlined approach to delivering exceptional results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Discovery",
              description: "We begin by understanding your business goals, challenges, and requirements through in-depth consultation.",
              icon: "🔍"
            },
            {
              step: "02",
              title: "Strategy",
              description: "Our team develops a tailored strategy and roadmap to address your specific needs and objectives.",
              icon: "🧠"
            },
            {
              step: "03",
              title: "Implementation",
              description: "We execute the plan with precision, leveraging our expertise and cutting-edge technologies.",
              icon: "⚙️"
            },
            {
              step: "04",
              title: "Optimization",
              description: "Continuous improvement and refinement to ensure optimal performance and results.",
              icon: "📈"
            }
          ].map((process, index) => (
            <motion.div
              key={process.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.6,
                    delay: index * 0.1
                  } 
                }
              }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 relative"
            >
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-gradient-to-br from-[#0021a7] to-[#00b8ff] flex items-center justify-center text-white font-bold">
                {process.step}
              </div>
              <div className="text-4xl mb-4">{process.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{process.title}</h3>
              <p className="text-white/70">{process.description}</p>
            </motion.div>
          ))}
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
            Ready to transform your business?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90 px-4">
            Let's discuss how our services can help you achieve your goals and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/about/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg bg-white text-[#0021a7] hover:bg-gray-100 transition-colors"
            >
              Schedule a Consultation
            </Link>
            <Link 
              href="/work/case-studies" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              View Our Case Studies
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTemplate>
  );
} 