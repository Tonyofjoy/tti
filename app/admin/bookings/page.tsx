"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion"
import { ArrowLeft, LogOut, Users, Calculator, DollarSign, Calendar, CheckCircle, XCircle, Clock, Eye, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { BookingSubmission } from '@/types/booking'

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

export default function AdminBookings() {
  const router = useRouter()
  const [bookings, setBookings] = useState<ExtendedBookingSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/booking')
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login')
          return
        }
        throw new Error('Failed to fetch bookings')
      }
      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setError('Failed to load bookings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  // Status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs"><Clock className="h-3 w-3" /> New</span>
      case 'reviewed':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs"><Clock className="h-3 w-3" /> Reviewed</span>
      case 'quoted':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs"><Calculator className="h-3 w-3" /> Quoted</span>
      case 'approved':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs"><CheckCircle className="h-3 w-3" /> Approved</span>
      case 'completed':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-600/20 text-green-300 text-xs"><CheckCircle className="h-3 w-3" /> Completed</span>
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs">{status}</span>
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-xl">Loading bookings...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-black mt-16">
        {/* Admin header */}
        <header className="sticky top-0 left-0 right-0 z-50 bg-black border-b border-white/10 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin/dashboard" 
                className="inline-flex items-center gap-2 text-[#00b8ff] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> Dashboard
              </Link>
              <h1 className="text-xl font-bold">Project Bookings</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80">Welcome, Admin</span>
              <Link href="/" className="text-white/80 hover:text-white transition-colors">
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="pt-6 pb-20">
          <div className="container mx-auto px-4 py-6">
            <div className="bg-black/40 rounded-xl border border-white/5 p-8">
              {error && (
                <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                  {error}
                </div>
              )}

              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0021a7]/20 p-4 rounded-lg border border-[#0021a7]/30">
                  <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
                  <p className="text-3xl font-bold text-[#00b8ff]">{bookings.length}</p>
                </div>
                <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/30">
                  <h3 className="text-lg font-semibold mb-2">New</h3>
                  <p className="text-3xl font-bold text-blue-400">
                    {bookings.filter(b => b.status === 'new').length}
                  </p>
                </div>
                <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
                  <h3 className="text-lg font-semibold mb-2">Approved</h3>
                  <p className="text-3xl font-bold text-green-400">
                    {bookings.filter(b => b.status === 'approved').length}
                  </p>
                </div>
                <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-500/30">
                  <h3 className="text-lg font-semibold mb-2">Total Value</h3>
                  <p className="text-3xl font-bold text-purple-400">
                    ${bookings.reduce((sum, b) => sum + (b.totalEstimate || 0), 0).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Project Booking Requests</h2>
                <p className="text-white/60">Review and manage client project booking requests</p>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12 bg-white/5 rounded-lg">
                  <Calculator className="h-12 w-12 mx-auto mb-4 text-white/40" />
                  <p className="text-white/60">No project bookings yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="px-4 py-3 text-left text-white/80">Client</th>
                        <th className="px-4 py-3 text-left text-white/80">Project</th>
                        <th className="px-4 py-3 text-left text-white/80">Budget Range</th>
                        <th className="px-4 py-3 text-left text-white/80">Estimate</th>
                        <th className="px-4 py-3 text-left text-white/80">Submitted</th>
                        <th className="px-4 py-3 text-left text-white/80">Status</th>
                        <th className="px-4 py-3 text-left text-white/80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => {
                        // Format date
                        const submittedDate = new Date(booking.submittedAt);
                        const formattedDate = submittedDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        });
                        
                        return (
                          <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5">
                            <td className="px-4 py-4">
                              <div>
                                <div className="font-medium text-white">{booking.clientName}</div>
                                <div className="text-white/60 text-sm">{booking.email}</div>
                                {booking.phone && (
                                  <div className="text-white/40 text-xs">{booking.phone}</div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-white/80">
                                {booking.projectName || 'Unnamed Project'}
                              </div>
                              {booking.company && (
                                <div className="text-white/60 text-sm">{booking.company}</div>
                              )}
                            </td>
                            <td className="px-4 py-4 text-white/80">
                              {booking.budget || 'Not specified'}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1 text-[#00b8ff] font-medium">
                                <DollarSign className="h-4 w-4" />
                                {booking.totalEstimate?.toLocaleString() || '0'}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-white/60 text-sm">{formattedDate}</td>
                            <td className="px-4 py-4">{getStatusBadge(booking.status)}</td>
                            <td className="px-4 py-4">
                              <div className="flex space-x-2">
                                <Link 
                                  href={`/admin/bookings/${booking.id}`}
                                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 