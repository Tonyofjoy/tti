"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Calendar, ArrowLeft, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface Contact {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchContacts()
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
      <nav className="border-b border-white/10 bg-white/5">
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
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Contact Form Submissions</h2>
          <p className="text-white/60">View and manage contact form submissions</p>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
            {error}
          </div>
        )}

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
      </main>
    </div>
  )
} 