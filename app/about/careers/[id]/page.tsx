"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Briefcase, Users, Lightbulb, Code, BarChart, Megaphone, MapPin, Building, Clock, CheckCircle, Heart, Award, Coffee } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, use } from "react"

// Comprehensive job position type
interface JobPosition {
  id: string
  title: string
  department: string
  location: string
  description?: string // Keep for backward compatibility
  
  // Comprehensive job details
  heritage?: string
  culture?: {
    description: string
    values: string[]
  }
  responsibilities?: string[]
  requirements?: string[]
  workingSchedule?: {
    description: string
    hours: string
  }
  benefits?: string[]
  callToAction?: string
  
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
    transition: { staggerChildren: 0.15 }
  }
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
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

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [jobPosition, setJobPosition] = useState<JobPosition | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  
  useEffect(() => {
    const fetchJobPosition = async () => {
      console.log('Job Detail: Fetching job position with ID:', resolvedParams.id);
      setIsLoading(true);
      setError("");
      
      try {
        console.log('Job Detail: Making API request to /api/jobpositions/' + resolvedParams.id);
        const response = await fetch(`/api/jobpositions/${resolvedParams.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });
        
        console.log('Job Detail: Response received - Status:', response.status, 'OK:', response.ok);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Job Detail: Received job position:', data);
          
          if (data && typeof data === 'object' && data.id) {
            console.log('Job Detail: Setting job position data');
            console.log('Job Detail: Data keys:', Object.keys(data));
            console.log('Job Detail: Has heritage:', !!data.heritage);
            console.log('Job Detail: Has culture:', !!data.culture);
            console.log('Job Detail: Has responsibilities:', !!data.responsibilities);
            console.log('Job Detail: Has benefits:', !!data.benefits);
            setJobPosition(data);
          } else {
            console.log('Job Detail: Invalid job position data received');
            setError('Job position data is invalid');
          }
        } else if (response.status === 404) {
          console.error('Job Detail: Job position not found');
          setError('Job position not found');
        } else {
          console.error('Job Detail: Response not OK:', response.status, response.statusText);
          setError(`Failed to load job position: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Job Detail: Network or parsing error:', error);
        setError(`Failed to load job position: ${error instanceof Error ? error.message : 'Network error'}`);
      } finally {
        console.log('Job Detail: Finished fetching, setting loading to false');
        setIsLoading(false);
      }
    };
    
    if (resolvedParams.id) {
      fetchJobPosition();
    }
  }, [resolvedParams.id]);
  
  // Helper function to render the correct icon component
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Briefcase
    return <IconComponent className="h-8 w-8 text-[#00b8ff]" />
  }

  if (isLoading) {
    return (
      <main className="min-h-screen pt-32 pb-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#00b8ff] border-r-transparent"></div>
            <p className="mt-4 text-white/70">Loading job details...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !jobPosition) {
    return (
      <main className="min-h-screen pt-32 pb-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mb-8"
            >
              <Link 
                href="/about/careers"
                className="inline-flex items-center gap-2 text-white/70 hover:text-[#00b8ff] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Careers
              </Link>
            </motion.div>

            {/* Error State */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center py-20 bg-red-900/20 rounded-xl border border-red-500/30"
            >
              <div className="text-red-400 mb-4 text-6xl">⚠️</div>
              <h1 className="text-3xl font-bold text-white mb-4">Job Position Not Found</h1>
              <p className="text-white/70 mb-8">{error}</p>
              <Link 
                href="/about/careers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium hover:opacity-90 transition-opacity"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to All Positions
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-8"
          >
            <Link 
              href="/about/careers"
              className="inline-flex items-center gap-2 text-white/70 hover:text-[#00b8ff] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Careers
            </Link>
          </motion.div>

          {/* Job Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gradient-to-r from-[#00b8ff]/10 to-[#0021a7]/10 rounded-2xl border border-[#00b8ff]/20 p-8 mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                {renderIcon(jobPosition.icon)}
              </div>
              
              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  {jobPosition.title}
                </h1>
                
                <div className="flex flex-wrap gap-6 text-white/70 mb-6">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-[#00b8ff]" />
                    <span>{jobPosition.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#00b8ff]" />
                    <span>{jobPosition.location}</span>
                  </div>
                </div>

                {/* Legacy description for backward compatibility */}
                {jobPosition.description && (
                  <p className="text-white/80 text-lg leading-relaxed">
                    {jobPosition.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Content Sections */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-12"
          >
            {/* Heritage Section */}
            {jobPosition.heritage && (
              <motion.section variants={itemFadeIn} className="bg-white/5 rounded-xl border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="h-6 w-6 text-[#00b8ff]" />
                  <h2 className="text-2xl font-bold text-white">Our Heritage</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 leading-relaxed whitespace-pre-line">
                    {jobPosition.heritage}
                  </p>
                </div>
              </motion.section>
            )}

            {/* Culture Section */}
            {jobPosition.culture && (
              <motion.section variants={itemFadeIn} className="bg-white/5 rounded-xl border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-[#00b8ff]" />
                  <h2 className="text-2xl font-bold text-white">Our Culture</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 leading-relaxed mb-6">
                    {jobPosition.culture.description}
                  </p>
                  {jobPosition.culture.values && jobPosition.culture.values.length > 0 && (
                    <ul className="space-y-3">
                      {jobPosition.culture.values.map((value, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#00b8ff] mt-0.5 flex-shrink-0" />
                          <span className="text-white/80">{value}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.section>
            )}

            {/* Two-column layout for Responsibilities and Requirements */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Responsibilities Section */}
              {jobPosition.responsibilities && jobPosition.responsibilities.length > 0 && (
                <motion.section variants={itemFadeIn} className="bg-white/5 rounded-xl border border-white/10 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="h-6 w-6 text-[#00b8ff]" />
                    <h2 className="text-2xl font-bold text-white">Responsibilities</h2>
                  </div>
                  <ul className="space-y-4">
                    {jobPosition.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00b8ff] mt-2 flex-shrink-0"></div>
                        <span className="text-white/80 leading-relaxed">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}

              {/* Requirements Section */}
              {jobPosition.requirements && jobPosition.requirements.length > 0 && (
                <motion.section variants={itemFadeIn} className="bg-white/5 rounded-xl border border-white/10 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="h-6 w-6 text-[#00b8ff]" />
                    <h2 className="text-2xl font-bold text-white">Requirements</h2>
                  </div>
                  <ul className="space-y-4">
                    {jobPosition.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#00b8ff] mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 leading-relaxed">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}
            </div>

            {/* Working Schedule Section */}
            {jobPosition.workingSchedule && (
              <motion.section variants={itemFadeIn} className="bg-white/5 rounded-xl border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="h-6 w-6 text-[#00b8ff]" />
                  <h2 className="text-2xl font-bold text-white">Working Schedule</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 leading-relaxed mb-4">
                    {jobPosition.workingSchedule.description}
                  </p>
                  <div className="bg-[#00b8ff]/10 border border-[#00b8ff]/20 rounded-lg p-4">
                    <p className="text-[#00b8ff] font-semibold">
                      {jobPosition.workingSchedule.hours}
                    </p>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Benefits Section */}
            {jobPosition.benefits && jobPosition.benefits.length > 0 && (
              <motion.section variants={itemFadeIn} className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl border border-green-500/20 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Coffee className="h-6 w-6 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">We Offer</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {jobPosition.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Call to Action Section */}
            <motion.section 
              variants={itemFadeIn} 
              className="bg-gradient-to-r from-[#00b8ff]/20 to-[#0021a7]/20 rounded-2xl border border-[#00b8ff]/30 p-8 text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Us?</h2>
              {jobPosition.callToAction && (
                <p className="text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
                  {jobPosition.callToAction}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`mailto:contact@tonytechinsights.com?subject=Application for ${jobPosition.title}&body=Dear Tony Tech Insights Team,%0D%0A%0D%0AI am interested in applying for the ${jobPosition.title} position.%0D%0A%0D%0APlease find my CV and portfolio attached.%0D%0A%0D%0ABest regards`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
                
                <Link
                  href="/about/careers"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
                >
                  View Other Positions
                </Link>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 