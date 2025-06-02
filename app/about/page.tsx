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
    bio: "Tony is the CEO & Founder of Tony Tech Insights, a Martech startup helping businesses scale through automation. With 7+ years of expertise in Salesforce tech and campaign automation, he bridges strategy and execution to drive growth. Passionate about simplifying marketing tech for measurable results.",
    image: "/Website_image/Website/About/Duong Dang.jpg",
    department: "Leadership",
    social: {
      linkedin: "https://www.linkedin.com/in/tony-dang-portfolio/",
    },
  },
  {
    id: 2,
    name: "Hung Ho",
    role: "CMO & Co-Founder",
    bio: "Hung Ho is the Co-Founder of Tony Tech Insights and CMO, driving digital marketing strategy with 6+ years of consulting expertise. He helps brands transform data into actionable growth, blending creativity with ROI-focused execution. A relentless optimizer, Hung thrives at the intersection of tech and marketing.",
    image: "/Website_image/Website/About/Hung Ho.jpg",
    department: "Leadership",
    social: {
      linkedin: "https://www.linkedin.com/in/ho-quoc-hung-7a2865168/",
    },
  },
  {
    id: 3,
    name: "Linh Nguyen",
    role: "Marketing Executive",
    bio: "Linh Nguyen is a Marketing Executive with 3+ years of experience crafting data-driven campaigns for dozens of satisfied clients. Known for delivering measurable results and exceptional client feedback, she turns strategies into growth. Passionate about ROI-focused creativity and building brands that resonate.",
    image: "/Website_image/Website/About/Linh.jpg",
    department: "Marketing",
  },
  {
    id: 4,
    name: "Duyen Dong",
    role: "Graphic Designer",
    bio: "Duyen Dong is a Creative Designer at Tony Tech Insights, transforming ideas into visually compelling stories. With a keen eye for detail and a passion for innovative design, she crafts brand experiences that captivate and communicate. Her work blends aesthetics with purpose to drive meaningful engagement.",
    image: "/Website_image/Website/About/Duyen (2).jpg",
    department: "Design",
    social: {
      linkedin: "https://www.linkedin.com/in/%C4%91%E1%BB%93ng-duy%C3%AAn-3a6a91207/",
    },
  },
  {
    id: 5,
    name: "Jason Olana",
    role: "Client Success Manager",
    bio: "Jason Olana is a Client Success Manager dedicated to building lasting partnerships and driving customer growth. With a solutions-focused approach, he ensures clients maximize value while fostering trust at every touchpoint. Jason thrives on turning challenges into opportunities for success.",
    image: "/images/team/jasonprofile.jpg",
    department: "Sales",
    social: {
      linkedin: "https://www.linkedin.com/in/jasondjo/",
    },
  },
  {
    id: 6,
    name: "Ngoc Nguyen",
    role: "Marketing Intern",
    bio: "Ngoc Nguyen is a Marketing Intern with a passion for data-driven storytelling and brand growth. She supports campaign execution, content creation, and market analysis while mastering the tools of digital marketing. Curious and adaptable, she thrives at the intersection of creativity and strategy.",
    image: "/images/team/ngoc.jpg",
    department: "Design",
  },

  {
    id: 7,
    name: "Truong Nguyen",
    role: "Backend Engineer",
    bio: "Truong Nguyen is a Backend Engineer specializing in scalable systems and efficient architecture. With expertise in [Node.js/Python/Java/etc.] and database optimization, he builds robust solutions that power seamless digital experiences. Passionate about clean code and system reliability.",
    image: "/images/team/tony info.jpg",
    department: "Development",
    social: {
      linkedin: "https://www.linkedin.com/in/hxtruong6/",
    },
  },
  {
    id: 8,
    name: "Haris Le",
    role: "Marketing Intern",
    bio: "Haris Le is a Marketing Intern passionate about digital strategy and brand storytelling. Eager to learn and contribute, he supports campaigns with data analysis, content creation, and market research. Committed to turning creative ideas into measurable impact.",
    image: "/images/team/bao.jpg",
    department: "Development",
    social: {
      linkedin: "https://www.linkedin.com/in/qu%E1%BB%91c-b%E1%BA%A3o-l%C3%AA-hu%E1%BB%B3nh-1ba916353/",
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