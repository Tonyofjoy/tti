"use client"

import PageTemplate from "@/components/templates/page-template"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
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

      // This is fine - it will redirect to your existing thank you page
      window.location.href = '/about/thank-you'
      
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTemplate
      title="Contact Us"
      subtitle="Get in touch with our team"
    >
      <div className="space-y-16">
        {/* Contact Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Mail,
              title: "Email",
              info: "contact@tonytechinsights.com",
              description: "Send us an email anytime"
            },
            {
              icon: Phone,
              title: "Phone",
              info: "+84937124110",
              description: "Mon-Fri from 9am to 5:30pm"
            },
            {
              icon: MapPin,
              title: "Location",
              info: "Tan Phu",
              description: "31 Dan Toc, Tan Thanh, Tan Phu"
            },
            {
              icon: Clock,
              title: "Business Hours",
              info: "9:00 AM - 5:30 PM",
              description: "Monday to Friday"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7] mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-[#00b8ff] font-medium mb-1">{item.info}</p>
                <p className="text-white/60">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
            <p className="text-white/70 mb-6">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
            {isMounted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff]"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] rounded-lg text-white font-semibold ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="h-10 rounded-lg border border-white/10 bg-white/5"></div>
                <div className="h-10 rounded-lg border border-white/10 bg-white/5"></div>
                <div className="h-10 rounded-lg border border-white/10 bg-white/5"></div>
                <div className="h-32 rounded-lg border border-white/10 bg-white/5"></div>
                <div className="h-12 w-40 rounded-lg bg-gradient-to-r from-[#00b8ff]/50 to-[#0021a7]/50"></div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">What Happens Next?</h3>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Initial Review",
                    description: "We'll review your message within 24 hours"
                  },
                  {
                    step: "2",
                    title: "Schedule a Call",
                    description: "Our team will reach out to schedule a discussion"
                  },
                  {
                    step: "3",
                    title: "Detailed Proposal",
                    description: "We'll provide a customized solution for your needs"
                  }
                ].map((step) => (
                  <div key={step.step} className="flex items-start gap-3">
                    <div className="inline-flex rounded-full p-2 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20">
                      <span className="font-semibold text-[#00b8ff]">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-white/60 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-12 border-t border-white/10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <Clock className="h-5 w-5 text-[#00b8ff]" />
            <span className="text-sm">Average response time: 2-4 hours</span>
          </div>
        </motion.div>
      </div>
    </PageTemplate>
  )
} 