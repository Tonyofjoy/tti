"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, ArrowRight, Mail, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function ContactFormSection() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    subscribeToNewsletter: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Only render the form after client-side hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        subscribeToNewsletter: true
      })
      
      // Show success message
      toast.success('Message sent successfully! Redirecting to thank you page...')
      
      // Redirect to thank you page after a short delay
      setTimeout(() => {
        router.push('/about/thank-you?type=contact')
      }, 1500)
      
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div 
      id="contact"
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0021a7]/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#00b8ff]/5 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-[#0021a7]/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg text-white/70">
              Have a question or want to work together? We'd love to hear from you.
            </p>
          </motion.div>
        </div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Left side - Form */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-white">Send us a message</h3>
                  
                  {isMounted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/80">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff] transition-all"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/80">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff] transition-all"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-2 text-white/80">
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff] transition-all"
                            placeholder="How can we help?"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-2 text-white/80">
                            Message
                          </label>
                          <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff] transition-all resize-none"
                            placeholder="Tell us about your project or inquiry..."
                            required
                          />
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="subscribeToNewsletter"
                              type="checkbox"
                              checked={formData.subscribeToNewsletter}
                              onChange={(e) => setFormData({ ...formData, subscribeToNewsletter: e.target.checked })}
                              className="w-4 h-4 border border-white/10 rounded bg-white/5 focus:ring-[#00b8ff] focus:ring-2"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="subscribeToNewsletter" className="text-white/70">
                              Subscribe to our newsletter to receive updates and insights
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] rounded-lg text-white font-semibold transition-all ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-[#00b8ff]/20'
                        }`}
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </motion.button>
                    </form>
                  ) : (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-12 rounded-lg bg-white/5"></div>
                      <div className="h-12 rounded-lg bg-white/5"></div>
                      <div className="h-12 rounded-lg bg-white/5"></div>
                      <div className="h-32 rounded-lg bg-white/5"></div>
                      <div className="h-12 rounded-lg bg-gradient-to-r from-[#00b8ff]/30 to-[#0021a7]/30"></div>
                    </div>
                  )}
                </div>
                
                {/* Right side - Info */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                    <p className="text-white/70 mb-8">
                      Fill out the form and our team will get back to you within 24 hours.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-[#00b8ff]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white/60 mb-1">Email Us</h4>
                          <p className="text-white font-medium">contact@tonytechinsight.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20 flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-[#00b8ff]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white/60 mb-1">Call Us</h4>
                          <p className="text-white font-medium">+84 937 124 110</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <h4 className="text-lg font-semibold mb-4">What happens next?</h4>
                    <ol className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b8ff]/20 flex items-center justify-center text-sm font-bold text-[#00b8ff]">1</span>
                        <span className="text-white/80">We'll review your message within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b8ff]/20 flex items-center justify-center text-sm font-bold text-[#00b8ff]">2</span>
                        <span className="text-white/80">Our team will contact you for more details</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b8ff]/20 flex items-center justify-center text-sm font-bold text-[#00b8ff]">3</span>
                        <span className="text-white/80">We'll provide a tailored solution for your needs</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 