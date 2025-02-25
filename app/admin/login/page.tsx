"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"

export default function AdminLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [isMounted, setIsMounted] = useState(false)

  // Only render the form after client-side hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      router.push('/admin/dashboard')
      
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0021a7]/20" />

      {/* Back Button */}
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Login Form */}
      <div className="relative pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex p-4 rounded-full bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20 border border-[#00b8ff]/20 mb-4"
              >
                <Lock className="w-8 h-8 text-[#00b8ff]" />
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                Admin Login
              </h1>
              <p className="text-white/60 mt-2">
                Enter your credentials to access the admin dashboard
              </p>
            </div>

            {isMounted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-2 text-white/80">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="bg-white/5 border-white/10 focus:border-[#00b8ff]/50 focus:ring-[#00b8ff]/50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2 text-white/80">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-white/5 border-white/10 focus:border-[#00b8ff]/50 focus:ring-[#00b8ff]/50"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#00b8ff] to-[#0021a7] hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="block text-sm font-medium mb-2 text-white/80">Username</div>
                  <div className="h-10 rounded-md border border-white/10 bg-white/5"></div>
                </div>
                <div>
                  <div className="block text-sm font-medium mb-2 text-white/80">Password</div>
                  <div className="h-10 rounded-md border border-white/10 bg-white/5"></div>
                </div>
                <div className="h-10 w-full rounded-md bg-gradient-to-r from-[#00b8ff]/50 to-[#0021a7]/50"></div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 