"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Calendar, ArrowLeft, LogOut, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface Contact {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

interface Subscriber {
  _id: string
  email: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<'contacts' | 'subscribers'>('contacts')

  useEffect(() => {
    fetchContacts()
    fetchSubscribers()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts')
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login')
          return
        }
        throw new Error('Failed to fetch contacts')
      }
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      setError('Failed to load contacts')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/newsletter')
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login')
          return
        }
        throw new Error('Failed to fetch newsletter subscribers')
      }
      const data = await response.json()
      setSubscribers(data)
    } catch (error) {
      console.error('Failed to load subscribers:', error)
      // Don't set the main error state to avoid overriding contact errors
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Content area with significant top margin to avoid overlap */}
      <div className="pt-20">
        {/* Tab navigation */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-5 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'contacts' 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact Submissions
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`px-5 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'subscribers' 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Newsletter Subscribers
            </button>
          </div>
        </div>

        {/* Main content */}
        <main className="container mx-auto px-4 py-6">
          <div className="bg-black/40 rounded-xl border border-white/5 p-8">
            {error && (
              <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                {error}
              </div>
            )}

            {activeTab === 'contacts' && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Contact Form Submissions</h2>
                  <p className="text-white/60">View and manage contact form submissions</p>
                </div>

                <div className="grid gap-4">
                  {contacts.map((contact) => (
                    <motion.div
                      key={contact._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{contact.subject}</h3>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {contact.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-white/80 mb-4">{contact.message}</p>
                      <div className="text-sm text-white/60">
                        From: {contact.name}
                      </div>
                    </motion.div>
                  ))}

                  {contacts.length === 0 && (
                    <div className="text-center py-12 text-white/60">
                      No submissions yet
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'subscribers' && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Newsletter Subscribers</h2>
                  <p className="text-white/60">View all newsletter subscribers</p>
                </div>

                <div className="grid gap-4">
                  {subscribers.map((subscriber) => (
                    <motion.div
                      key={subscriber._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-white/60" />
                          <span>{subscriber.email}</span>
                        </div>
                        <span className="text-sm text-white/60">
                          Subscribed on: {new Date(subscriber.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {subscribers.length === 0 && (
                    <div className="text-center py-12 text-white/60">
                      No subscribers yet
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 