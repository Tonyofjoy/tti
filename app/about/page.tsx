"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import PageTemplate from "@/components/templates/page-template"
import { HeartHandshake, Code2, Shield, Rocket, Users, Target, Heart } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Team data
interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
  department: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Tony Dang",
    role: "CEO & Founder",
    bio: "Tony has over 15 years of experience in technology leadership. Before founding Tony Tech Insights, he led digital transformation initiatives at Fortune 500 companies. His vision drives our company's innovation and growth strategy.",
    image: "/Website_image/Website/About/Duong Dang.jpg",
    department: "Leadership",
    social: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
    },
  },
  {
    id: 2,
    name: "Hung Ho",
    role: "CMO & Co-Founder",
    bio: "Hung brings 12+ years of software architecture experience. He specializes in cloud infrastructure and AI integration, ensuring our technical solutions are cutting-edge and scalable for enterprises of all sizes.",
    image: "/Website_image/Website/About/Hung Ho.jpg",
    department: "Leadership",
    social: {
      linkedin: "https://linkedin.com/in/davidchen",
    },
  },
  {
    id: 3,
    name: "Linh Nguyen",
    role: "Marketing Executive",
    bio: "Linh is an expert in marketing with particular focus on digital marketing. She leads our marketing team in creating robust, scalable applications that exceed client expectations.",
    image: "/Website_image/Website/About/Linh.jpg",
    department: "Marketing",
    social: {
      linkedin: "https://linkedin.com/in/michaelrodriguez",
    },
  },
  {
    id: 4,
    name: "Duyen Dong",
    role: "Graphic Designer",
    bio: "Duyen combines artistic talent with user-centered design principles to create intuitive, engaging interfaces. Her work has helped our clients achieve significant improvements in user engagement and conversion rates.",
    image: "/Website_image/Website/About/Duyen (2).jpg",
    department: "Design",
    social: {
      linkedin: "https://linkedin.com/in/emilywong",
    },
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Data Scientist",
    bio: "James specializes in machine learning and predictive analytics. He helps our clients transform their data into actionable insights that drive business growth and operational efficiency.",
    image: "/images/team/tony info.jpg",
    department: "Design",
    social: {
      linkedin: "https://linkedin.com/in/jameswilson",
    },
  },
  {
    id: 6,
    name: "Jason Olana",
    role: "Client Success Manager",
    bio: "Sophia excels at coordinating complex projects and ensuring timely delivery. Her methodical approach and communication skills keep our projects on track and clients informed at every stage.",
    image: "/images/team/tony info.jpg",
    department: "Sales",
    social: {
      linkedin: "https://linkedin.com/in/sophiapatel",
    },
  },
  {
    id: 7,
    name: "Truong Nguyen",
    role: "Fullstack Developer",
    bio: "Truong is an expert in fullstack development with particular focus on React and Node.js. He leads our development team in creating robust, scalable applications that exceed client expectations.",
    image: "/images/team/tony info.jpg",
    department: "Development",
    social: {
      linkedin: "https://linkedin.com/in/robertkim",
    },
  },
  {
    id: 8,
    name: "Huynh Nguyen",
    role: "DevOps Engineer",
    bio: "Huynh is an expert in DevOps with particular focus on CI/CD pipelines and cloud infrastructure. He ensures our development processes are efficient and our deployments are seamless and reliable.",
    image: "/images/team/tony info.jpg",
    department: "Development",
    social: {
      linkedin: "https://linkedin.com/in/lisathompson",
    },
  },
]

// Process steps data
const processSteps = [
  {
    icon: HeartHandshake,
    title: "Discovery & Planning",
    description: "We begin with a deep dive into your business needs and objectives",
    details: [
      "Requirements gathering and analysis",
      "Strategic planning and roadmap creation",
      "Technology stack evaluation",
      "Project scope definition"
    ]
  },
  {
    icon: Code2,
    title: "Design & Development",
    description: "Our expert team crafts tailored solutions using cutting-edge technologies",
    details: [
      "Architecture design and planning",
      "UI/UX design and prototyping",
      "Agile development methodology",
      "Regular progress updates"
    ]
  },
  {
    icon: Shield,
    title: "Testing & Quality Assurance",
    description: "Rigorous testing ensures your solution meets the highest standards",
    details: [
      "Comprehensive testing strategy",
      "Performance optimization",
      "Security testing and validation",
      "User acceptance testing"
    ]
  },
  {
    icon: Rocket,
    title: "Deployment & Support",
    description: "Smooth deployment followed by dedicated ongoing support",
    details: [
      "Deployment planning and execution",
      "Post-launch monitoring",
      "Continuous maintenance",
      "24/7 technical support"
    ]
  },
]

// Core values data
const coreValues = [
  {
    icon: Rocket,
    title: "Fast Delivery",
    description: "We pride ourselves on rapid, efficient delivery without compromising quality."
  },
  {
    icon: Shield,
    title: "High Quality",
    description: "Our solutions meet the highest standards of performance, security, and user experience."
  },
  {
    icon: Heart,
    title: "Trust & Reliability",
    description: "We build lasting relationships based on transparency, integrity, and consistent results."
  }
]

// Create a client component that uses useSearchParams
function AboutPageClient() {
  const searchParams = useSearchParams()
  const sectionParam = searchParams.get("section")
  
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All")
  const [expandedMember, setExpandedMember] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<string>(sectionParam || "mission")

  // Update active section when URL parameter changes
  useEffect(() => {
    if (sectionParam && ["mission", "team", "process"].includes(sectionParam)) {
      setActiveSection(sectionParam)
    }
  }, [sectionParam])

  // Filter team members by department
  const filteredTeamMembers = selectedDepartment === "All"
    ? teamMembers
    : teamMembers.filter(member => member.department === selectedDepartment)

  // Get unique departments for filter
  const departments = ["All", ...Array.from(new Set(teamMembers.map(member => member.department)))]

  return (
    <PageTemplate 
      title="About Tony Tech Insights"
      subtitle="Our mission, team, and process"
    >
      {/* Navigation Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1 rounded-lg bg-white/5 backdrop-blur-sm">
          {["mission", "team", "process"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === section 
                  ? "bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Mission & Vision Section */}
      {activeSection === "mission" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Vision</h2>
            <p className="text-xl text-white/80">
              We're on a mission to democratize digital services, making them accessible to businesses of all sizes.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7] mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/70">
                To make digital services affordable and accessible to businesses of all sizes, 
                enabling them to compete effectively in the digital landscape.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7] mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/70">
                To become the leading technology partner for businesses seeking innovative digital solutions, 
                recognized for our expertise, reliability, and client-centered approach.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Our Core Values</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7] mb-4">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                  <p className="text-white/60">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Company Culture */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Our Culture</h3>
            <p className="text-white/70 mb-6">
              At Tony Tech Insights, we foster a culture of innovation, collaboration, and continuous learning. 
              Our team thrives in an environment where:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-[#00b8ff] mt-2 mr-3"></span>
                <span>Honesty and transparency guide all our interactions</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-[#00b8ff] mt-2 mr-3"></span>
                <span>Conscientiousness ensures we deliver our best work</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-[#00b8ff] mt-2 mr-3"></span>
                <span>Respect for diverse perspectives drives innovation</span>
              </li>
            </ul>
          </div>

          {/* Heritage */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Our Heritage</h3>
            <p className="text-white/70 mb-4">
              Founded with roots in Danish agency expertise, Tony Tech Insights brings European-standard 
              services to Vietnam and beyond. We combine international best practices with local insights 
              to deliver exceptional value to our clients.
            </p>
            <p className="text-white/70">
              Our unique perspective allows us to bridge cultural and technological gaps, creating solutions 
              that resonate globally while addressing specific regional needs.
            </p>
          </div>
        </motion.div>
      )}

      {/* Team Section */}
      {activeSection === "team" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {departments.map((department) => (
              <button
                key={department}
                onClick={() => setSelectedDepartment(department)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedDepartment === department 
                    ? "bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white" 
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {department}
              </button>
            ))}
          </div>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTeamMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative perspective"
              >
                <div 
                  className={`relative preserve-3d transition-all duration-500 ${
                    expandedMember === member.id ? "my-rotate-y-180" : ""
                  }`}
                >
                  {/* Front Card */}
                  <div className="backface-hidden p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-full">
                    <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20">
                        <div className="relative w-full h-full">
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <h4 className="text-lg font-semibold">{member.name}</h4>
                    <p className="text-white/60 mb-3">{member.role}</p>
                    <button
                      onClick={() => setExpandedMember(member.id)}
                      className="text-sm text-[#00b8ff] hover:text-white transition-colors"
                    >
                      Read Bio
                    </button>
                  </div>

                  {/* Back Card */}
                  <div className="absolute inset-0 my-rotate-y-180 backface-hidden p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <h4 className="text-lg font-semibold mb-2">{member.name}</h4>
                    <p className="text-white/80 mb-4">{member.bio}</p>
                    
                    {/* Social Links */}
                    {member.social && (
                      <div className="flex gap-3 mb-4">
                        {member.social.twitter && (
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#00b8ff]">
                            Twitter
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#00b8ff]">
                            LinkedIn
                          </a>
                        )}
                        {member.social.github && (
                          <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#00b8ff]">
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                    
                    <button
                      onClick={() => setExpandedMember(null)}
                      className="text-sm text-[#00b8ff] hover:text-white transition-colors"
                    >
                      Back to Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Values */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Our Team Values</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Collaboration & Innovation</h4>
                <p className="text-white/70 mb-4">
                  We believe that the best solutions emerge from collaborative environments where diverse 
                  perspectives are valued and innovation is encouraged at every level.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Continuous Learning</h4>
                <p className="text-white/70 mb-4">
                  In our rapidly evolving industry, we prioritize continuous learning and professional 
                  development, ensuring our team stays at the forefront of technological advancements.
                </p>
              </div>
            </div>
          </div>

          {/* Join Our Team CTA */}
          <div className="text-center p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">
              We're always looking for talented individuals who share our passion for technology and innovation. 
              Explore our current openings and become part of our dynamic team.
            </p>
            <Link 
              href="/about/careers" 
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium hover:shadow-lg transition-all"
            >
              View Open Positions
            </Link>
          </div>
        </motion.div>
      )}

      {/* Process Section */}
      {activeSection === "process" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          {/* Process Steps Overview */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="h-full p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm relative z-10">
                    <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7] mb-4">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                    <p className="text-white/60">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#00b8ff] to-[#0021a7]" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detailed Process Steps */}
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid md:grid-cols-2 gap-8 items-start"
              >
                <div>
                  <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7] mb-4">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-white/70 mb-6">{step.description}</p>
                </div>
                <div className="space-y-4">
                  {step.details.map((detail, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      <p className="text-white/80">{detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Benefits */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Benefits of Our Process</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-3">Transparency</h4>
                <p className="text-white/70">
                  Our structured approach ensures complete visibility into project progress, 
                  with regular updates and clear communication at every stage.
                </p>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-3">Flexibility</h4>
                <p className="text-white/70">
                  While we follow a proven process, we adapt our approach to meet the unique 
                  needs and constraints of each project and client.
                </p>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-3">Predictable Results</h4>
                <p className="text-white/70">
                  Our systematic methodology delivers consistent, high-quality outcomes, 
                  minimizing risks and ensuring client satisfaction.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">
              Contact us today to discuss how our proven process can help bring your vision to life.
            </p>
            <Link 
              href="/about/contact" 
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium hover:shadow-lg transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      )}
    </PageTemplate>
  )
}

// Main component with Suspense boundary
export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="animate-pulse text-xl text-white/70">Loading...</div>
    </div>}>
      <AboutPageClient />
    </Suspense>
  )
} 