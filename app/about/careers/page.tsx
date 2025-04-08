"use client"

import { motion } from "framer-motion"
import { ArrowRight, Briefcase, Users, Lightbulb, Code, BarChart, Megaphone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

// Job position type
interface JobPosition {
  id: string
  title: string
  department: string
  location: string
  description: string
  requirements: string[]
  icon: string
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

// Map icon strings to components
const iconMap = {
  Briefcase: Briefcase,
  Users: Users,
  Lightbulb: Lightbulb,
  Code: Code,
  BarChart: BarChart,
  Megaphone: Megaphone
}

// Benefits data
const benefits = [
  {
    title: "Flexible Work Environment",
    description: "Work remotely, in-office, or hybrid. We focus on results, not where you work from.",
    icon: <Users className="h-6 w-6 text-[#00b8ff]" />
  },
  {
    title: "Learning & Development",
    description: "We invest in your growth with dedicated training budgets, learning programs, and mentorship.",
    icon: <Lightbulb className="h-6 w-6 text-[#00b8ff]" />
  },
  {
    title: "Competitive Compensation",
    description: "Receive a salary that values your expertise, plus bonuses, equity options, and comprehensive benefits.",
    icon: <BarChart className="h-6 w-6 text-[#00b8ff]" />
  },
  {
    title: "Cutting-Edge Projects",
    description: "Work with the latest technologies on projects that are changing how businesses operate.",
    icon: <Code className="h-6 w-6 text-[#00b8ff]" />
  }
]

export default function CareersPage() {
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  
  useEffect(() => {
    const fetchJobPositions = async () => {
      try {
        console.log('Careers page: Fetching job positions...');
        const response = await fetch('/api/jobpositions');
        console.log('Careers page: Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Careers page: Received job positions:', data);
          console.log('Careers page: Number of positions:', Array.isArray(data) ? data.length : 'not an array');
          
          if (Array.isArray(data) && data.length > 0) {
            console.log('Careers page: Setting job positions with API data');
            setJobPositions(data);
          } else {
            console.log('Careers page: No positions found or data is not an array with items, using fallback data');
            // Generate unique IDs for fallback positions to avoid conflicts
            const timestamp = Date.now();
            // Fallback to default data if API returns empty array or invalid data
            setJobPositions([
              {
                id: `fallback-1-${timestamp}`,
                title: "Senior AI Engineer",
                department: "Engineering",
                location: "London, UK (Hybrid)",
                description: "Lead the development of cutting-edge AI solutions for enterprise clients.",
                requirements: ["5+ years experience in ML/AI", "Strong Python skills", "Experience with TensorFlow or PyTorch"],
                icon: "Briefcase"
              },
              {
                id: `fallback-2-${timestamp}`,
                title: "UX/UI Designer",
                department: "Design",
                location: "Remote (UK-based)",
                description: "Create intuitive and engaging user experiences for our digital products.",
                requirements: ["3+ years in UX/UI design", "Proficiency in Figma", "Portfolio of digital products"],
                icon: "Users"
              },
              {
                id: `fallback-3-${timestamp}`,
                title: "Technical Project Manager",
                department: "Project Management",
                location: "London, UK",
                description: "Oversee the successful delivery of complex technical projects for our clients.",
                requirements: ["PMP or Agile certification", "5+ years managing tech projects", "Client-facing experience"],
                icon: "Lightbulb"
              }
            ]);
          }
        } else {
          console.error('Careers page: Response not OK:', response.status, response.statusText);
          // Attempt to get error message from response
          try {
            const errorData = await response.json();
            console.error('Careers page: Error details:', errorData);
          } catch (e) {
            console.error('Careers page: Could not parse error response');
          }
          
          setError('Failed to load job positions');
          // Generate unique IDs for fallback positions
          const timestamp = Date.now();
          // Use default data as fallback
          setJobPositions([
            {
              id: `fallback-1-${timestamp}`,
              title: "Senior AI Engineer",
              department: "Engineering",
              location: "London, UK (Hybrid)",
              description: "Lead the development of cutting-edge AI solutions for enterprise clients.",
              requirements: ["5+ years experience in ML/AI", "Strong Python skills", "Experience with TensorFlow or PyTorch"],
              icon: "Briefcase"
            },
            {
              id: `fallback-2-${timestamp}`,
              title: "UX/UI Designer",
              department: "Design",
              location: "Remote (UK-based)",
              description: "Create intuitive and engaging user experiences for our digital products.",
              requirements: ["3+ years in UX/UI design", "Proficiency in Figma", "Portfolio of digital products"],
              icon: "Users"
            },
            {
              id: `fallback-3-${timestamp}`,
              title: "Technical Project Manager",
              department: "Project Management",
              location: "London, UK",
              description: "Oversee the successful delivery of complex technical projects for our clients.",
              requirements: ["PMP or Agile certification", "5+ years managing tech projects", "Client-facing experience"],
              icon: "Lightbulb"
            }
          ]);
        }
      } catch (error) {
        console.error('Careers page: Error fetching job positions:', error);
        setError('Failed to load job positions');
        // Generate unique IDs for fallback positions
        const timestamp = Date.now();
        // Use default data as fallback
        setJobPositions([
          {
            id: `fallback-1-${timestamp}`,
            title: "Senior AI Engineer",
            department: "Engineering",
            location: "London, UK (Hybrid)",
            description: "Lead the development of cutting-edge AI solutions for enterprise clients.",
            requirements: ["5+ years experience in ML/AI", "Strong Python skills", "Experience with TensorFlow or PyTorch"],
            icon: "Briefcase"
          },
          {
            id: `fallback-2-${timestamp}`,
            title: "UX/UI Designer",
            department: "Design",
            location: "Remote (UK-based)",
            description: "Create intuitive and engaging user experiences for our digital products.",
            requirements: ["3+ years in UX/UI design", "Proficiency in Figma", "Portfolio of digital products"],
            icon: "Users"
          },
          {
            id: `fallback-3-${timestamp}`,
            title: "Technical Project Manager",
            department: "Project Management",
            location: "London, UK",
            description: "Oversee the successful delivery of complex technical projects for our clients.",
            requirements: ["PMP or Agile certification", "5+ years managing tech projects", "Client-facing experience"],
            icon: "Lightbulb"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobPositions();
  }, []);
  
  // Helper function to render the correct icon component
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Briefcase
    return <IconComponent className="h-5 w-5 text-[#00b8ff]" />
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-black">
      {/* Hero Section */}
      <section className="relative mb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-slate-950/90 z-0" />
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Join Our Team of Innovators
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Help us shape the future of technology and deliver transformative solutions for businesses worldwide.
            </p>
            <div className="flex justify-center">
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link 
                  href="#openings"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium hover:opacity-90 transition-opacity"
                >
                  View Open Positions <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Culture Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-xl overflow-hidden max-w-5xl mx-auto aspect-[16/9] shadow-2xl shadow-[#00b8ff]/10"
          >
            <Image
              src="/Website_image/Website/About/Nhóm.png"
              alt="Team collaboration at Tony Tech Insights"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Culture</h3>
              <p className="text-white/80 max-w-lg mb-6">
                We foster an environment of innovation, collaboration, and continuous growth.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Why Join Us Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Why Join Tony Tech Insights?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              We offer more than just a job – we provide a career with purpose, growth, and impact.
            </p>
          </motion.div>
          
          {/* Benefits Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemFadeIn}
                className="bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-white/70">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Open Positions Section */}
      <section id="openings" className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Current Openings
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Explore our open positions and find the role where you can make an impact.
            </p>
          </motion.div>
          
          {/* Job Listings */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6 max-w-4xl mx-auto"
          >
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#00b8ff] border-r-transparent"></div>
                <p className="mt-4 text-white/70">Loading job openings...</p>
              </div>
            ) : jobPositions.length === 0 ? (
              <div className="text-center py-12 bg-white/5 rounded-xl">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-white/40" />
                <p className="text-white/70">No open positions at the moment. Please check back later!</p>
              </div>
            ) : (
              jobPositions.map((job, index) => (
                <motion.div
                  key={job.id}
                  variants={itemFadeIn}
                  className="bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-white/5 rounded-lg">
                          {renderIcon(job.icon)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-sm bg-white/10 text-white/70 px-2 py-1 rounded-full">
                              {job.department}
                            </span>
                            <span className="text-sm bg-white/10 text-white/70 px-2 py-1 rounded-full">
                              {job.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-white/80 mb-4">
                        {job.description}
                      </p>
                      
                      <div className="space-y-1 mb-4">
                        <h4 className="text-sm font-semibold text-white/90">Key Requirements:</h4>
                        <ul className="list-disc list-inside text-white/70 text-sm">
                          {job.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Link 
                          href={`/about/careers/apply?position=${encodeURIComponent(job.title)}`}
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium hover:opacity-90 transition-opacity"
                        >
                          Apply Now <ArrowRight className="h-4 w-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
