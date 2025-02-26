"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

// Client component that uses useSearchParams
function ThankYouPageClient() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'contact' // Default to contact if no type specified
  
  const isNewsletter = type === 'newsletter'
  
  return (
    <div className="min-h-screen pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex p-4 rounded-full bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20 border border-[#00b8ff]/20"
          >
            {isNewsletter ? (
              <Mail className="w-12 h-12 text-[#00b8ff]" />
            ) : (
              <CheckCircle className="w-12 h-12 text-[#00b8ff]" />
            )}
          </motion.div>

          {/* Thank You Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              {isNewsletter 
                ? "Thanks for Subscribing!" 
                : "Thank You for Contacting Us!"}
            </h1>
            <p className="text-white/60 text-lg">
              {isNewsletter
                ? "You've been added to our newsletter. We'll keep you updated with the latest insights."
                : "We've received your message and will get back to you shortly."}
            </p>
          </div>

          {/* What to Expect */}
          <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10 text-left">
            <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
            <ul className="space-y-3 text-white/60">
              {isNewsletter ? (
                <>
                  <li>• You'll receive a confirmation email shortly</li>
                  <li>• Our newsletter is sent out bi-weekly</li>
                  <li>• You can unsubscribe at any time using the link in the emails</li>
                </>
              ) : (
                <>
                  <li>• Our team will review your message within 24 hours</li>
                  <li>• You'll receive a confirmation email shortly</li>
                  <li>• A team member will contact you to discuss your needs</li>
                </>
              )}
            </ul>
          </div>

          {/* Return Button */}
          <div className="mt-8">
            <Link href="/">
              <Button variant="outline" className="group">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back To Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="animate-pulse text-xl text-white/70">Loading...</div>
    </div>}>
      <ThankYouPageClient />
    </Suspense>
  )
} 