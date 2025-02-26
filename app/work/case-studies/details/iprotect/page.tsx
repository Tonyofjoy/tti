"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronDown, Code, Database, Globe, Lock, MessageSquare, Shield, Smartphone } from 'lucide-react'

// Component for section headers
const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-bold mb-6 text-[#00b8ff] border-b border-white/10 pb-2">
    {title}
  </h2>
)

// Component for tech stack items
const TechItem = ({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="font-semibold">{title}</h3>
    </div>
    <ul className="space-y-1 pl-7">
      {items.map((item, i) => (
        <li key={i} className="text-white/70 text-sm list-disc">{item}</li>
      ))}
    </ul>
  </div>
)

// Component for flow chart sections
const FlowChartSection = ({ title, content }: { title: string, content: string }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <h3 className="font-medium">{title}</h3>
        <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      {isExpanded && (
        <div className="p-4 bg-black/30 overflow-x-auto">
          <pre className="text-xs text-white/80 font-mono">{content}</pre>
        </div>
      )}
    </div>
  )
}

// Component for feature items
const FeatureItem = ({ title, description }: { title: string, description: string }) => (
  <div className="border border-white/10 rounded-lg p-4 bg-white/5">
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-white/70">{description}</p>
  </div>
)

export default function IprotectCaseStudy() {
  // Flow chart content
  const flowCharts = {
    authentication: `App Launch
    ↓
Splash Screen
    ↓
First Launch? → Yes → Onboarding Screens
    ↓ No          ↓
Already Logged In? → Yes → Home Screen (based on user role)
    ↓ No              ↓
Login Screen
    ↓
[User Login Options]
    ↓
    ├── Login with Credentials → Success → Home Screen
    ↓                          ↓ Failure → Error Message
    └── Forgot Password → Verification Method Selection
                            ↓
                        Input Email/Phone
                            ↓
                        Verification Code
                            ↓
                        Set New Password
                            ↓
                        Login Screen`,
    registration: `Login Screen
    ↓
Register Button
    ↓
Select Role
    ↓
    ├── Client Registration
    │       ↓
    │   Input Personal Information
    │       ↓
    │   Verification Method Selection
    │       ↓
    │   Verification (OTP)
    │       ↓
    │   Registration Success
    │       ↓
    │   Home Screen
    │
    └── Partner Registration (Security Expert)
            ↓
        View 1: Basic Information
            ↓
        View 2: Professional Information
            ↓
        View 3: Additional Details
            ↓
        Verification
            ↓
        Registration Processing
            ↓
        Registration Success/Processing
            ↓
        Home Screen (or Login Screen if approval needed)`,
    clientNavigation: `Home Screen (Bottom Navigation)
    ↓
    ├── Home Tab
    │   ↓
    │   └── Service Options
    │       ↓
    │       ├── Personal Protection
    │       │   ↓
    │       │   ├── Book Now → Personal Protection Booking
    │       │   │               ↓
    │       │   │           Select Location → Map/Search
    │       │   │               ↓
    │       │   │           Set Date/Time
    │       │   │               ↓
    │       │   │           Threat Assessment Form
    │       │   │               ↓
    │       │   │           Booking Summary
    │       │   │               ↓
    │       │   │           Payment
    │       │   │               ↓
    │       │   │           Booking Result
    │       │   │
    │       │   └── Long-term → Long Term Booking
    │       │                     ↓
    │       │                   [Similar flow to Book Now]
    │       │                     ↓
    │       │                   Booking Long Term Result
    │       │
    │       ├── Property Protection
    │       │   ↓
    │       │   Property Protection Booking
    │       │   ↓
    │       │   [Similar flow to Personal Protection]
    │       │
    │       └── Event Security
    │           ↓
    │           Event Security Booking
    │           ↓
    │           [Similar flow to Personal Protection]`,
    expertNavigation: `Expert Home Screen
    ↓
    ├── Home Tab
    │   ↓
    │   ├── Available Jobs
    │   │   ↓
    │   │   Job Details
    │   │   ↓
    │   │   Accept/Decline Job
    │   │
    │   └── Upcoming Assignments
    │       ↓
    │       Assignment Details
    │
    ├── Bookings Tab
    │   ↓
    │   ├── Current Bookings
    │   │   ↓
    │   │   Booking Details
    │   │   ↓
    │   │   Expert Ongoing Service
    │   │   ↓
    │   │   Mark Job Done
    │   │
    │   └── Past Bookings
    │       ↓
    │       Booking Details
    │
    ├── Chat Tab
    │   ↓
    │   Chat List
    │   ↓
    │   Chat Room
    │
    └── Account Tab
        ↓
        ├── Expert Profile
        │   ↓
        │   Edit Profile
        │
        ├── Withdraw Income
        │   ↓
        │   Select Payment Method
        │   ↓
        │   Withdrawal Confirmation
        │
        ├── Currency Settings
        │
        └── Logout`,
    payment: `Booking Summary
    ↓
    ├── Review Booking Details
    ↓
    ├── Apply Voucher (Optional)
    ↓
    ├── Select Payment Method
    │   ↓
    │   ├── Saved Payment Methods
    │   └── Add New Payment Method
    ↓
    ├── Process Payment
    ↓
    └── Booking Confirmation`,
    ongoingService: `Active Booking
    ↓
    ├── Track Expert Location
    ↓
    ├── Chat with Expert/Client
    ↓
    ├── Emergency Options
    ↓
    └── Service Completion
        ↓
        ├── Expert: Mark as Complete
        └── Client: Rate & Review`
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Back button */}
      <Link href="/work/case-studies" className="inline-flex items-center gap-2 mb-8 text-[#00b8ff] hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Case Studies
      </Link>

      {/* Hero section */}
      <div className="relative rounded-2xl overflow-hidden mb-12">
        <div className="aspect-[21/9] relative">
          <Image 
            src="/images/case-studies/iprotect-banner.jpg" 
            alt="Iprotect Security Platform" 
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-[#00b8ff] p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="text-[#00b8ff] font-medium">Security Platform</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Iprotect: Advanced Security Solutions</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            A comprehensive security platform connecting clients with qualified security experts
          </p>
        </div>
      </div>

      {/* Overview section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <SectionHeader title="Project Overview" />
        <p className="text-lg text-white/80 mb-6">
          Iprotect is a comprehensive security platform designed to connect clients seeking protection services with qualified security experts. 
          The platform offers various security services including personal protection, property protection, and event security through an intuitive mobile application.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <Shield className="h-10 w-10 text-[#00b8ff] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Personal Protection</h3>
            <p className="text-white/70">On-demand and long-term personal security services for individuals</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <Lock className="h-10 w-10 text-[#00b8ff] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Property Protection</h3>
            <p className="text-white/70">Security services for residential and commercial properties</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <Globe className="h-10 w-10 text-[#00b8ff] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Event Security</h3>
            <p className="text-white/70">Comprehensive security solutions for events of all sizes</p>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-16"
      >
        <SectionHeader title="Tech Stack" />
        
        <div className="grid md:grid-cols-3 gap-8">
          <TechItem 
            icon={<Code className="h-5 w-5 text-[#00b8ff]" />}
            title="Backend Architecture"
            items={[
              "NestJS (Node.js TypeScript framework)",
              "PostgreSQL with TypeORM and Kysely",
              "JWT & Passport Authentication",
              "Socket.io for Real-time Communication",
              "BullMQ for Message Queuing",
              "Redis for Caching",
              "AWS S3 & Google Cloud Storage",
              "nestjs-i18n for Internationalization"
            ]}
          />
          
          <TechItem 
            icon={<Smartphone className="h-5 w-5 text-[#00b8ff]" />}
            title="Mobile Application"
            items={[
              "Flutter (SDK ≥3.4.0)",
              "flutter_bloc (BLoC pattern)",
              "auto_route for Navigation",
              "dio with retrofit for API Calls",
              "get_it with injectable for DI",
              "easy_localization for Translations",
              "Google Maps Flutter Integration"
            ]}
          />
          
          <TechItem 
            icon={<Database className="h-5 w-5 text-[#00b8ff]" />}
            title="Content Management System"
            items={[
              "Next.js 15 Framework",
              "Chakra UI Component Library",
              "Zustand for State Management",
              "React Query for Data Fetching",
              "React Hook Form with Zod",
              "Leaflet for Maps Integration",
              "Tailwind CSS with Emotion"
            ]}
          />
        </div>
      </motion.section>

      {/* User Flow section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-16"
      >
        <SectionHeader title="User Flow Chart" />
        <p className="text-white/80 mb-6">
          The Iprotect platform features comprehensive user flows for both clients seeking protection services and security experts providing those services.
          Click on each section below to view the detailed flow chart.
        </p>
        
        <div className="space-y-4">
          <FlowChartSection title="1. App Startup and Authentication Flow" content={flowCharts.authentication} />
          <FlowChartSection title="2. Registration Flow" content={flowCharts.registration} />
          <FlowChartSection title="3. Client User Main Navigation Flow" content={flowCharts.clientNavigation} />
          <FlowChartSection title="4. Partner (Expert) User Flow" content={flowCharts.expertNavigation} />
          <FlowChartSection title="5. Payment Flow" content={flowCharts.payment} />
          <FlowChartSection title="6. Ongoing Service Flow" content={flowCharts.ongoingService} />
        </div>
      </motion.section>

      {/* Architecture section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-16"
      >
        <SectionHeader title="Project Architecture" />
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">System Architecture</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h4 className="font-semibold mb-3">Backend API Server (NestJS)</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Handles business logic, authentication, and data persistence</li>
                <li>• Provides RESTful APIs and WebSocket connections</li>
                <li>• Manages integrations with third-party services</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h4 className="font-semibold mb-3">Mobile Application (Flutter)</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Client-facing interface for users seeking protection</li>
                <li>• Expert interface for security professionals</li>
                <li>• Real-time location tracking and communication</li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h4 className="font-semibold mb-3">Content Management System (NextJS)</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Administrative dashboard for platform management</li>
                <li>• Analytics and reporting tools</li>
                <li>• User and service management</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Key Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureItem 
              title="Multi-language Support" 
              description="English, Vietnamese, Filipino, Chinese, Korean interfaces for global accessibility"
            />
            <FeatureItem 
              title="Role-based Access Control" 
              description="Different interfaces for clients and security experts with appropriate permissions"
            />
            <FeatureItem 
              title="Real-time Location Tracking" 
              description="Monitor security personnel during active assignments for safety and coordination"
            />
            <FeatureItem 
              title="Emergency SOS System" 
              description="Quick access to help in critical situations with emergency contact notifications"
            />
            <FeatureItem 
              title="Secure Payment Processing" 
              description="Multiple payment method support with secure transaction handling"
            />
            <FeatureItem 
              title="Booking Management" 
              description="Complete lifecycle from booking to completion with status tracking"
            />
            <FeatureItem 
              title="Rating and Review System" 
              description="Quality assurance through user feedback after service completion"
            />
            <FeatureItem 
              title="Chat System" 
              description="Direct communication between clients and security experts during service"
            />
          </div>
        </div>
      </motion.section>

      {/* Development Practices section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-16"
      >
        <SectionHeader title="Development Practices" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-semibold mb-2">Code Quality</h4>
            <p className="text-sm text-white/70">ESLint, Prettier, and strict TypeScript configurations</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-semibold mb-2">Git Workflow</h4>
            <p className="text-sm text-white/70">Husky for git hooks, commitlint for standardized commits</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-semibold mb-2">CI/CD</h4>
            <p className="text-sm text-white/70">GitLab CI for automated testing and deployment</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-semibold mb-2">Documentation</h4>
            <p className="text-sm text-white/70">Swagger for API, comprehensive README files</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-semibold mb-2">Testing</h4>
            <p className="text-sm text-white/70">Jest for backend testing with high coverage</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-semibold mb-2">Environment Config</h4>
            <p className="text-sm text-white/70">Dotenv for environment variables management</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-semibold mb-2">Containerization</h4>
            <p className="text-sm text-white/70">Docker and Docker Compose for backend services</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-semibold mb-2">Process Management</h4>
            <p className="text-sm text-white/70">PM2 for the CMS with monitoring capabilities</p>
          </div>
        </div>
      </motion.section>

      {/* Conclusion section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <SectionHeader title="Conclusion" />
        
        <div className="bg-gradient-to-br from-[#00b8ff]/10 to-[#0021a7]/10 p-6 rounded-lg border border-[#00b8ff]/20">
          <p className="text-lg mb-4">
            Iprotect represents a comprehensive security solution that bridges the gap between clients seeking protection services and qualified security experts. 
            The platform's intuitive user flows, robust architecture, and feature-rich mobile application provide a seamless experience for all stakeholders while maintaining high security standards.
          </p>
          
          <p className="text-lg">
            The modular architecture ensures scalability and maintainability, while the use of modern technologies across the stack enables rapid development and deployment of new features. 
            The multi-language support and responsive design make the platform accessible to a global audience.
          </p>
        </div>
      </motion.section>
    </div>
  )
} 