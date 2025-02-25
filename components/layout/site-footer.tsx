"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/components/ui/logo"
import { cn } from "@/lib/utils"
import { footerLinks } from "@/lib/navigation-data"

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "GitHub", icon: Github, href: "https://github.com" },
]

export default function SiteFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Only render the form after client-side hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubscribed(true)
  }

  return (
    <footer className="relative mt-24 border-t border-white/10">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0021a7]/20" />

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Company Info */}
            <div className="space-y-8">
              {/* Logo and Description */}
              <div>
                <Link href="/" className="flex items-center group mb-4">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <Logo />
                  </div>
                  <span className="ml-2 text-2xl font-bold font-deltha bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                    Tony Tech Insights
                  </span>
                </Link>
                <p className="text-white/60 max-w-md">
                  Empowering businesses through innovative technology solutions. We help organizations navigate their
                  digital transformation journey with expertise and precision.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin className="h-5 w-5 text-[#00b8ff]" />
                  <span>123 Innovation Drive, Tech City, TC 12345</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Phone className="h-5 w-5 text-[#00b8ff]" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Mail className="h-5 w-5 text-[#00b8ff]" />
                  <span>contact@tonytechinsights.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={cn(
                      "p-2 rounded-lg border border-white/10",
                      "bg-white/5 hover:bg-white/10",
                      "transition-colors duration-200",
                    )}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter and Links */}
            <div className="grid gap-8 sm:grid-cols-2 lg:pl-8">
              {/* Links */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Services</h3>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Company</h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter */}
              <div className="sm:col-span-2">
                <h3 className="font-semibold mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-sm text-white/60 mb-4">
                  Stay updated with our latest insights and news. No spam, we promise.
                </p>

                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl border border-[#00b8ff]/30 bg-[#00b8ff]/10"
                  >
                    <p className="text-[#00b8ff]">
                      Thank you for subscribing! Check your email to confirm your subscription.
                    </p>
                  </motion.div>
                ) : isMounted ? (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Subscribing..."
                      ) : (
                        <>
                          Subscribe
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="h-10 flex gap-2">
                    <div className="flex-1 rounded-md border border-white/10 bg-white/5"></div>
                    <div className="w-32 rounded-md bg-primary"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/60">
                © {new Date().getFullYear()} <span className="font-deltha">Tony Tech Insights</span>. All rights reserved.
              </p>

              <ul className="flex flex-wrap gap-4 sm:gap-6">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

