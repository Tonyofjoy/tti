"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

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

export default function ApplicationForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const position = searchParams.get("position") || "General Application"
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: position,
    experience: "",
    coverLetter: "",
  })
  
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  
  // Update position if URL param changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, position }))
  }, [position])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size exceeds 5MB limit")
        return
      }
      
      // Check file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!validTypes.includes(file.type)) {
        setErrorMessage("Only PDF and Word documents are accepted")
        return
      }
      
      setCvFile(file)
      setErrorMessage("")
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!cvFile) {
      setErrorMessage("Please upload your CV")
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus("idle")
    
    try {
      // Create FormData object for submission
      const formDataToSubmit = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value)
      })
      formDataToSubmit.append("cv", cvFile)
      
      // Submit to API
      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formDataToSubmit,
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application')
      }
      
      // Success
      setSubmitStatus("success")
      
      // Redirect after success
      setTimeout(() => {
        router.push("/about/careers?applied=true")
      }, 2000)
      
    } catch (error) {
      console.error("Error submitting application:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "There was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <main className="min-h-screen pt-32 pb-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <Link 
            href="/about/careers" 
            className="inline-flex items-center gap-2 text-[#00b8ff] mb-8 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Careers
          </Link>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Apply for: {position}
            </h1>
            <p className="text-white/80 mb-8">
              Please fill out the form below to apply for this position. All fields are required unless marked optional.
            </p>
            
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 text-center"
              >
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
                <p className="text-white/80">
                  Thank you for your application. We will review it and get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
                      Personal Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="fullName" className="block text-white/80 text-sm">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00b8ff] focus:outline-none focus:ring-1 focus:ring-[#00b8ff]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-white/80 text-sm">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00b8ff] focus:outline-none focus:ring-1 focus:ring-[#00b8ff]"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-white/80 text-sm">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00b8ff] focus:outline-none focus:ring-1 focus:ring-[#00b8ff]"
                      />
                    </div>
                  </div>
                  
                  {/* Application Details */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">
                      Application Details
                    </h2>
                    
                    <div className="space-y-2">
                      <label htmlFor="position" className="block text-white/80 text-sm">
                        Position
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        readOnly
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white/70 cursor-not-allowed"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="experience" className="block text-white/80 text-sm">
                        Years of Experience
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00b8ff] focus:outline-none focus:ring-1 focus:ring-[#00b8ff]"
                      >
                        <option value="" disabled>Select experience</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="coverLetter" className="block text-white/80 text-sm">
                        Cover Letter / Additional Information
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00b8ff] focus:outline-none focus:ring-1 focus:ring-[#00b8ff]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="cv" className="block text-white/80 text-sm">
                        Upload CV (PDF or Word, max 5MB)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="cv"
                          name="cv"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                        />
                        <label
                          htmlFor="cv"
                          className="flex items-center justify-center gap-2 w-full bg-white/5 border border-dashed border-white/30 rounded-lg px-4 py-8 text-white/70 cursor-pointer hover:bg-white/10 transition-colors"
                        >
                          <Upload className="h-6 w-6" />
                          {cvFile ? cvFile.name : "Click or drag to upload your CV"}
                        </label>
                      </div>
                      {errorMessage && (
                        <p className="text-red-400 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" /> {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full rounded-lg px-6 py-3 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </motion.div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  )
} 