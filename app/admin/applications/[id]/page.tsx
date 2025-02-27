"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, CheckCircle, XCircle, Clock, Users, Mail, Phone, Calendar, FileText, Briefcase } from 'lucide-react'
import { JobApplication } from '@/app/api/applications/route'

// Layout component to hide main navigation
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <style jsx global>{`
        header.main-header, footer.main-footer {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  )
}

export default function ApplicationDetails() {
  const params = useParams()
  const router = useRouter()
  const [application, setApplication] = useState<JobApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    const fetchApplication = async () => {
      if (!params.id) return
      
      try {
        const response = await fetch(`/api/applications/${params.id}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Application not found')
          }
          throw new Error('Failed to fetch application details')
        }
        
        const data = await response.json()
        setApplication(data)
      } catch (error) {
        console.error('Error fetching application:', error)
        setError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchApplication()
  }, [params.id])
  
  const updateApplicationStatus = async (newStatus: string) => {
    if (!application) return
    
    setUpdatingStatus(true)
    try {
      const response = await fetch(`/api/applications/${application.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update application status')
      }
      
      // Update local state
      setApplication({
        ...application,
        status: newStatus as any,
      })
    } catch (error) {
      console.error('Error updating status:', error)
      setError('Failed to update status')
    } finally {
      setUpdatingStatus(false)
    }
  }
  
  const downloadCV = async () => {
    if (!application) return
    
    try {
      const response = await fetch(`/api/applications/download/${application.id}`)
      if (!response.ok) {
        throw new Error('Failed to download CV')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${application.fullName.replace(/\s+/g, '_')}_CV${application.cvFilename.substring(application.cvFilename.lastIndexOf('.'))}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading CV:', error)
      setError('Failed to download CV')
    }
  }
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen pt-32 pb-20 bg-black flex items-center justify-center">
          <div className="text-xl">Loading application details...</div>
        </div>
      </AdminLayout>
    )
  }
  
  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-screen pt-32 pb-20 bg-black">
          <div className="container mx-auto px-4">
            <Link 
              href="/admin/dashboard" 
              className="inline-flex items-center gap-2 text-[#00b8ff] mb-8 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
              <p className="text-white/80 mb-6">{error}</p>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }
  
  if (!application) {
    return (
      <AdminLayout>
        <div className="min-h-screen pt-32 pb-20 bg-black">
          <div className="container mx-auto px-4">
            <Link 
              href="/admin/dashboard" 
              className="inline-flex items-center gap-2 text-[#00b8ff] mb-8 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-8 text-center">
              <XCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Application Not Found</h2>
              <p className="text-white/80 mb-6">The application you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }
  
  // Format date
  const submittedDate = new Date(application.submittedAt)
  const formattedDate = submittedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  
  // Status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm"><Clock className="h-4 w-4" /> New</span>
      case 'reviewed':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm"><Clock className="h-4 w-4" /> Reviewed</span>
      case 'interviewing':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm"><Users className="h-4 w-4" /> Interviewing</span>
      case 'hired':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm"><CheckCircle className="h-4 w-4" /> Hired</span>
      case 'rejected':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm"><XCircle className="h-4 w-4" /> Rejected</span>
      default:
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-sm">{status}</span>
    }
  }

  return (
    <AdminLayout>
      <div className="min-h-screen pt-32 pb-20 bg-black">
        <div className="container mx-auto px-4">
          <Link 
            href="/admin/dashboard?tab=applications" 
            className="inline-flex items-center gap-2 text-[#00b8ff] mb-8 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Applications
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {application.fullName}
                    </h1>
                    <div className="flex items-center gap-2 text-white/60">
                      <Briefcase className="h-4 w-4" />
                      <span>{application.position}</span>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(application.status)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <Mail className="h-5 w-5 text-[#00b8ff]" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Email</div>
                      <a href={`mailto:${application.email}`} className="text-white hover:text-[#00b8ff] transition-colors">
                        {application.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <Phone className="h-5 w-5 text-[#00b8ff]" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Phone</div>
                      <a href={`tel:${application.phone}`} className="text-white hover:text-[#00b8ff] transition-colors">
                        {application.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <Calendar className="h-5 w-5 text-[#00b8ff]" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Submitted</div>
                      <div className="text-white">{formattedDate}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <FileText className="h-5 w-5 text-[#00b8ff]" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Experience</div>
                      <div className="text-white">{application.experience} years</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cover Letter */}
              {application.coverLetter && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Cover Letter</h2>
                  <div className="whitespace-pre-wrap text-white/80 leading-relaxed">
                    {application.coverLetter}
                  </div>
                </div>
              )}
              
              {/* CV Download */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Curriculum Vitae</h2>
                <button
                  onClick={downloadCV}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#00b8ff]/10 text-[#00b8ff] hover:bg-[#00b8ff]/20 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  Download CV
                </button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Actions */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Application Status</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => updateApplicationStatus('new')}
                    disabled={application.status === 'new' || updatingStatus}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      application.status === 'new'
                        ? 'bg-blue-500/20 text-blue-400 cursor-default'
                        : 'bg-white/5 text-white hover:bg-blue-500/10 hover:text-blue-400'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> New
                    </span>
                    {application.status === 'new' && <CheckCircle className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => updateApplicationStatus('reviewed')}
                    disabled={application.status === 'reviewed' || updatingStatus}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      application.status === 'reviewed'
                        ? 'bg-yellow-500/20 text-yellow-400 cursor-default'
                        : 'bg-white/5 text-white hover:bg-yellow-500/10 hover:text-yellow-400'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Reviewed
                    </span>
                    {application.status === 'reviewed' && <CheckCircle className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => updateApplicationStatus('interviewing')}
                    disabled={application.status === 'interviewing' || updatingStatus}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      application.status === 'interviewing'
                        ? 'bg-purple-500/20 text-purple-400 cursor-default'
                        : 'bg-white/5 text-white hover:bg-purple-500/10 hover:text-purple-400'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" /> Interviewing
                    </span>
                    {application.status === 'interviewing' && <CheckCircle className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => updateApplicationStatus('hired')}
                    disabled={application.status === 'hired' || updatingStatus}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      application.status === 'hired'
                        ? 'bg-green-500/20 text-green-400 cursor-default'
                        : 'bg-white/5 text-white hover:bg-green-500/10 hover:text-green-400'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" /> Hired
                    </span>
                    {application.status === 'hired' && <CheckCircle className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => updateApplicationStatus('rejected')}
                    disabled={application.status === 'rejected' || updatingStatus}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      application.status === 'rejected'
                        ? 'bg-red-500/20 text-red-400 cursor-default'
                        : 'bg-white/5 text-white hover:bg-red-500/10 hover:text-red-400'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <XCircle className="h-4 w-4" /> Rejected
                    </span>
                    {application.status === 'rejected' && <CheckCircle className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              {/* Notes (could be expanded in a real application) */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Admin Notes</h2>
                <textarea
                  placeholder="Add private notes about this applicant..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00b8ff] focus:outline-none focus:ring-1 focus:ring-[#00b8ff] h-32 resize-none"
                ></textarea>
                <button
                  className="mt-3 w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 