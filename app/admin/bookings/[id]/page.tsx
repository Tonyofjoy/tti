"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Clock, Users, Mail, Phone, Calendar, Calculator, DollarSign, FileText, Building, MessageSquare } from 'lucide-react'
import { BookingSubmission } from '@/types/booking'
import { pricingItems } from '@/data/pricing'

interface ExtendedBookingSubmission extends BookingSubmission {
  _id?: string
}

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

export default function BookingDetails() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<ExtendedBookingSubmission | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    const fetchBooking = async () => {
      if (!params.id) return
      
      try {
        const response = await fetch(`/api/booking/${params.id}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Booking not found')
          }
          throw new Error('Failed to fetch booking details')
        }
        
        const bookingData = await response.json()
        setBooking(bookingData)
      } catch (error) {
        console.error('Error fetching booking:', error)
        setError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchBooking()
  }, [params.id])
  
  const updateBookingStatus = async (newStatus: string) => {
    if (!booking) return
    
    setUpdatingStatus(true)
    try {
      const response = await fetch(`/api/booking/${booking.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update booking status')
      }
      
      // Update local state
      setBooking({
        ...booking,
        status: newStatus as any,
      })
    } catch (error) {
      console.error('Error updating status:', error)
      setError('Failed to update status')
    } finally {
      setUpdatingStatus(false)
    }
  }
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen pt-32 pb-20 bg-black flex items-center justify-center">
          <div className="text-xl">Loading booking details...</div>
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
              href="/admin/bookings" 
              className="inline-flex items-center gap-2 text-[#00b8ff] mb-8 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Bookings
            </Link>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
              <p className="text-white/80 mb-6">{error}</p>
              <button
                onClick={() => router.push('/admin/bookings')}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                Return to Bookings
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }
  
  if (!booking) {
    return (
      <AdminLayout>
        <div className="min-h-screen pt-32 pb-20 bg-black">
          <div className="container mx-auto px-4">
            <Link 
              href="/admin/bookings" 
              className="inline-flex items-center gap-2 text-[#00b8ff] mb-8 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Bookings
            </Link>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-8 text-center">
              <XCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Booking Not Found</h2>
              <p className="text-white/80 mb-6">The booking you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => router.push('/admin/bookings')}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                Return to Bookings
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }
  
  // Format date
  const submittedDate = new Date(booking.submittedAt)
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
      case 'quoted':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm"><Calculator className="h-4 w-4" /> Quoted</span>
      case 'approved':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm"><CheckCircle className="h-4 w-4" /> Approved</span>
      case 'completed':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-600/20 text-green-300 text-sm"><CheckCircle className="h-4 w-4" /> Completed</span>
      default:
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-sm">{status}</span>
    }
  }

  // Get selected services details
  const selectedServices = Object.entries(booking.selectedItems)
    .filter(([_, selection]) => selection.enabled)
    .map(([itemId, selection]) => {
      const item = pricingItems.find(p => p.id === itemId)
      return item ? {
        ...item,
        quantity: selection.quantity,
        subtotal: item.unitPrice * selection.quantity
      } : null
    })
    .filter(Boolean)

  return (
    <AdminLayout>
      <div className="min-h-screen pt-32 pb-20 bg-black">
        <div className="container mx-auto px-4">
          <Link 
            href="/admin/bookings" 
            className="inline-flex items-center gap-2 text-[#00b8ff] mb-8 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Bookings
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {booking.clientName}
                    </h1>
                    <div className="flex items-center gap-2 text-white/60">
                      <Calculator className="h-4 w-4" />
                      <span>{booking.projectName || 'Project Booking'}</span>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(booking.status)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <Mail className="h-5 w-5 text-[#00b8ff]" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Email</div>
                      <a href={`mailto:${booking.email}`} className="text-white hover:text-[#00b8ff] transition-colors">
                        {booking.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <Phone className="h-5 w-5 text-[#00b8ff]" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Phone</div>
                      <a href={`tel:${booking.phone}`} className="text-white hover:text-[#00b8ff] transition-colors">
                        {booking.phone}
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
                  
                  {booking.company && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5">
                        <Building className="h-5 w-5 text-[#00b8ff]" />
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Company</div>
                        <div className="text-white">{booking.company}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {booking.budget && (
                    <div>
                      <div className="text-sm text-white/60 mb-1">Budget Range</div>
                      <div className="text-white">{booking.budget}</div>
                    </div>
                  )}
                  {booking.timeline && (
                    <div>
                      <div className="text-sm text-white/60 mb-1">Timeline</div>
                      <div className="text-white">{booking.timeline}</div>
                    </div>
                  )}
                </div>
                
                {booking.projectDescription && (
                  <div>
                    <div className="text-sm text-white/60 mb-1">Project Description</div>
                    <div className="text-white/80 leading-relaxed">{booking.projectDescription}</div>
                  </div>
                )}
              </div>
              
              {/* Selected Services */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Selected Services</h2>
                <div className="space-y-4">
                  {selectedServices.map((service: any) => (
                    <div key={service.id} className="flex justify-between items-start p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{service.name}</h3>
                        <p className="text-white/60 text-sm mb-2">{service.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-white/50">{service.unit}</span>
                          <span className="text-white/50">Quantity: {service.quantity}</span>
                          <span className="text-[#00b8ff]">${service.unitPrice.toLocaleString()} each</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#00b8ff]">
                          ${service.subtotal.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">Total Estimate:</span>
                      <span className="text-2xl font-bold text-[#00b8ff]">
                        ${booking.totalEstimate?.toLocaleString() || '0'}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mt-1">USD • Excluding taxes and hosting fees</p>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              {booking.additionalRequirements && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Additional Notes</h2>
                  <div className="whitespace-pre-wrap text-white/80 leading-relaxed">
                    {booking.additionalRequirements}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Actions */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Booking Status</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => updateBookingStatus('new')}
                    disabled={booking.status === 'new' || updatingStatus}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      booking.status === 'new'
                        ? 'bg-blue-500/20 text-blue-400 cursor-default'
                        : 'bg-white/5 text-white hover:bg-blue-500/10 hover:text-blue-400'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> New
                    </span>
                    {booking.status === 'new' && <CheckCircle className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => updateBookingStatus('reviewed')}
                    disabled={booking.status === 'reviewed' || updatingStatus}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      booking.status === 'reviewed'
                        ? 'bg-yellow-500/20 text-yellow-400 cursor-default'
                        : 'bg-white/5 text-white hover:bg-yellow-500/10 hover:text-yellow-400'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Reviewed
                    </span>
                    {booking.status === 'reviewed' && <CheckCircle className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => updateBookingStatus('quoted')}
                    disabled={booking.status === 'quoted' || updatingStatus}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      booking.status === 'quoted'
                        ? 'bg-purple-500/20 text-purple-400 cursor-default'
                        : 'bg-white/5 text-white hover:bg-purple-500/10 hover:text-purple-400'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Calculator className="h-4 w-4" /> Quoted
                    </span>
                    {booking.status === 'quoted' && <CheckCircle className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => updateBookingStatus('approved')}
                    disabled={booking.status === 'approved' || updatingStatus}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      booking.status === 'approved'
                        ? 'bg-green-500/20 text-green-400 cursor-default'
                        : 'bg-white/5 text-white hover:bg-green-500/10 hover:text-green-400'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" /> Approved
                    </span>
                    {booking.status === 'approved' && <CheckCircle className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => updateBookingStatus('completed')}
                    disabled={booking.status === 'completed' || updatingStatus}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      booking.status === 'completed'
                        ? 'bg-green-600/20 text-green-300 cursor-default'
                        : 'bg-white/5 text-white hover:bg-green-600/10 hover:text-green-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" /> Completed
                    </span>
                    {booking.status === 'completed' && <CheckCircle className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              {/* Admin Notes */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Admin Notes</h2>
                <textarea
                  placeholder="Add private notes about this booking..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00b8ff] focus:outline-none focus:ring-1 focus:ring-[#00b8ff] h-32 resize-none"
                ></textarea>
                <button
                  className="mt-3 w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  Save Notes
                </button>
              </div>

              {/* Contact Actions */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Contact Client</h2>
                <div className="space-y-2">
                  <a
                    href={`mailto:${booking.email}?subject=Regarding your project booking - ${booking.projectName || 'Project'}`}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-[#00b8ff]/10 text-[#00b8ff] hover:bg-[#00b8ff]/20 rounded-lg transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Send Email
                  </a>
                  <a
                    href={`tel:${booking.phone}`}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Call Client
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 