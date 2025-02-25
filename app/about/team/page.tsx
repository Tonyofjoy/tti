"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin, Twitter, Mail, ChevronDown } from "lucide-react"
import PageTemplate from "@/components/templates/page-template"

// Team member interface
interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  department: "leadership" | "engineering" | "design" | "marketing"
  social: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

// Sample team data - replace with your actual team members
const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Alex has over 15 years of experience in tech leadership and innovation. Previously led product development at major tech companies before founding our company.",
    image: "/images/team/duyen.jpg",
    department: "leadership",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "alex@example.com"
    }
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "CTO",
    bio: "Sarah brings 12+ years of engineering excellence, specializing in scalable architecture and emerging technologies.",
    image: "/images/team/duyen.jpg",
    department: "leadership",
    social: {
      linkedin: "https://linkedin.com",
      email: "sarah@example.com"
    }
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    role: "Lead Developer",
    bio: "Full-stack developer with expertise in React, Node.js, and cloud infrastructure. Passionate about clean code and performance optimization.",
    image: "/images/team/duyen.jpg",
    department: "engineering",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "michael@example.com"
    }
  },
  {
    id: "4",
    name: "Emma Wilson",
    role: "UX/UI Designer",
    bio: "Award-winning designer focused on creating intuitive and beautiful user experiences. Background in psychology helps inform user-centered design approaches.",
    image: "/images/team/duyen.jpg",
    department: "design",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "emma@example.com"
    }
  },
  {
    id: "5",
    name: "David Kim",
    role: "Marketing Director",
    bio: "Strategic marketer with experience across digital channels. Previously led growth at several successful startups.",
    image: "/images/team/duyen.jpg",
    department: "marketing",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "david@example.com"
    }
  },
  {
    id: "6",
    name: "Priya Patel",
    role: "Backend Engineer",
    bio: "Systems architect specializing in high-performance, scalable backend solutions. Expert in database optimization and API design.",
    image: "/images/team/duyen.jpg",
    department: "engineering",
    social: {
      linkedin: "https://linkedin.com",
      email: "priya@example.com"
    }
  },
  {
    id: "7",
    name: "James Wilson",
    role: "Product Manager",
    bio: "Experienced in bringing products from concept to market. Focused on user needs and business outcomes.",
    image: "/images/team/duyen.jpg",
    department: "leadership",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "james@example.com"
    }
  },
  {
    id: "8",
    name: "Olivia Martinez",
    role: "Motion Designer",
    bio: "Creative professional specializing in animation and interactive experiences. Brings brands to life through movement and storytelling.",
    image: "/images/team/duyen.jpg",
    department: "design",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "olivia@example.com"
    }
  }
];

export default function TeamPage() {
  const [filter, setFilter] = useState<string>("all");
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  
  // Filter team members based on selected department
  const filteredMembers = filter === "all" 
    ? teamMembers 
    : teamMembers.filter(member => member.department === filter);

  // Toggle expanded bio
  const toggleExpand = (id: string) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  return (
    <PageTemplate 
      title="Our Team"
      subtitle="Meet the talented individuals behind our success"
    >
      {/* Department filter */}
      <div className="flex flex-wrap gap-3 mb-12">
        <FilterButton 
          active={filter === "all"} 
          onClick={() => setFilter("all")}
        >
          All
        </FilterButton>
        <FilterButton 
          active={filter === "leadership"} 
          onClick={() => setFilter("leadership")}
        >
          Leadership
        </FilterButton>
        <FilterButton 
          active={filter === "engineering"} 
          onClick={() => setFilter("engineering")}
        >
          Engineering
        </FilterButton>
        <FilterButton 
          active={filter === "design"} 
          onClick={() => setFilter("design")}
        >
          Design
        </FilterButton>
        <FilterButton 
          active={filter === "marketing"} 
          onClick={() => setFilter("marketing")}
        >
          Marketing
        </FilterButton>
      </div>

      {/* Team grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {filteredMembers.map((member) => (
          <TeamMemberCard 
            key={member.id} 
            member={member} 
            isExpanded={expandedMember === member.id}
            onToggle={() => toggleExpand(member.id)}
          />
        ))}
      </motion.div>

      {/* Team values section */}
      <div className="mt-24 mb-12">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Our Values</h2>
        <p className="text-white/70 max-w-2xl mb-12">
          These core principles guide our work and shape our culture. They're the foundation of how we collaborate, innovate, and deliver exceptional results.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ValueCard 
            title="Innovation" 
            description="We embrace creative thinking and continuously seek new solutions to complex challenges."
            icon="✨"
          />
          <ValueCard 
            title="Collaboration" 
            description="We believe the best results come from diverse perspectives working together toward common goals."
            icon="🤝"
          />
          <ValueCard 
            title="Excellence" 
            description="We hold ourselves to the highest standards in everything we do, from code quality to client communication."
            icon="🏆"
          />
          <ValueCard 
            title="Integrity" 
            description="We operate with honesty, transparency, and ethical principles in all our interactions."
            icon="⚖️"
          />
          <ValueCard 
            title="Growth" 
            description="We're committed to continuous learning and personal development for everyone on our team."
            icon="🌱"
          />
          <ValueCard 
            title="Impact" 
            description="We measure our success by the positive difference we make for our clients and communities."
            icon="💫"
          />
        </div>
      </div>

      {/* Join our team section */}
      <div className="mt-24">
        <motion.div 
          className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#00b8ff]/10 to-[#0021a7]/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">Join Our Team</h2>
              <p className="text-white/70 max-w-xl">
                We're always looking for talented individuals who share our passion for innovation and excellence. Check out our open positions and become part of our journey.
              </p>
            </div>
            <motion.button
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Open Positions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </PageTemplate>
  )
}

// Team member card component
function TeamMemberCard({ 
  member, 
  isExpanded, 
  onToggle 
}: { 
  member: TeamMember; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      layout
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{member.name}</h3>
          <p className="text-white/80">{member.role}</p>
        </div>
      </div>
      
      <div className="p-4">
        <motion.div 
          className="overflow-hidden"
          animate={{ height: isExpanded ? 'auto' : '80px' }}
        >
          <p className="text-white/70 text-sm">{member.bio}</p>
        </motion.div>
        
        <button 
          onClick={onToggle}
          className="mt-2 text-[#00b8ff] text-sm flex items-center"
        >
          {isExpanded ? 'Read less' : 'Read more'}
          <ChevronDown 
            className={`ml-1 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
        
        <div className="mt-4 flex gap-3">
          {member.social.linkedin && (
            <a href={member.social.linkedin} className="text-white/60 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {member.social.twitter && (
            <a href={member.social.twitter} className="text-white/60 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          )}
          {member.social.email && (
            <a href={`mailto:${member.social.email}`} className="text-white/60 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Filter button component
function FilterButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active 
          ? 'bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white' 
          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

// Value card component
function ValueCard({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string;
  icon: string;
}) {
  return (
    <motion.div
      className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  );
}
