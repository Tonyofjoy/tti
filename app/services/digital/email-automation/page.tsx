"use client"

import PageTemplate from "@/components/templates/page-template"
import { motion } from "framer-motion"
import { Mail, Send, Clock, BarChart, Settings, Users, Shield, Filter, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const EmailAutomationPage = () => {
  const features = [
    {
      icon: Send,
      title: "Automated Campaigns",
      description: "Set up and schedule email campaigns that trigger based on specific user actions or time intervals.",
    },
    {
      icon: Users,
      title: "Audience Segmentation",
      description: "Target the right audience with precise segmentation based on demographics, behavior, and engagement.",
    },
    {
      icon: Filter,
      title: "Dynamic Content",
      description: "Personalize email content automatically based on recipient data and previous interactions.",
    },
    {
      icon: BarChart,
      title: "Performance Analytics",
      description: "Track open rates, click-throughs, and conversions with detailed reports and actionable insights.",
    },
    {
      icon: Clock,
      title: "Time Optimization",
      description: "Send emails at the perfect time for each recipient to maximize engagement rates.",
    },
    {
      icon: Shield,
      title: "Compliance Management",
      description: "Stay compliant with GDPR, CAN-SPAM, and other regulations with built-in compliance tools.",
    },
  ]

  const benefits = [
    "Increase operational efficiency by 45%",
    "Reduce manual email workload by 75%",
    "Boost email engagement rates by 35%",
    "Improve conversion rates through personalization",
    "Ensure consistent communication with customers",
    "Scale your email marketing efforts without adding staff"
  ]

  return (
    <PageTemplate 
      title="Email Automation"
      subtitle="Transform your email marketing with intelligent automation"
    >
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Streamline Your Email Marketing</h2>
            <p className="text-white/70 mb-6">
              Our email automation solutions help businesses create, manage, and optimize email campaigns 
              with minimal manual intervention. Leverage powerful automation tools to deliver the right message 
              to the right people at the right time.
            </p>
            <div className="p-4 rounded-lg border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-[#00b8ff]" />
                <span className="font-semibold">Average Results</span>
              </div>
              <p className="text-white/70">
                Clients using our email automation solutions experience an average 40% increase in engagement and 
                25% higher conversion rates within the first 3 months.
              </p>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src="/images/header.png"
              alt="Email Automation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-full p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="inline-flex rounded-lg p-3 bg-gradient-to-br from-[#00b8ff] to-[#0021a7] mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-6">Business Benefits</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="inline-flex rounded-full p-1 bg-gradient-to-br from-[#00b8ff] to-[#0021a7] mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="text-white/80">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-4">Implementation Process</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="inline-flex rounded-full p-2 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20">
                    <span className="font-semibold text-[#00b8ff]">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Discovery & Strategy</h4>
                    <p className="text-white/60 text-sm">Understanding your email marketing needs and goals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="inline-flex rounded-full p-2 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20">
                    <span className="font-semibold text-[#00b8ff]">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Platform Integration</h4>
                    <p className="text-white/60 text-sm">Setting up the automation tools with your existing systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="inline-flex rounded-full p-2 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20">
                    <span className="font-semibold text-[#00b8ff]">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Workflow Development</h4>
                    <p className="text-white/60 text-sm">Creating automated email sequences and triggers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="inline-flex rounded-full p-2 bg-gradient-to-br from-[#00b8ff]/20 to-[#0021a7]/20">
                    <span className="font-semibold text-[#00b8ff]">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Testing & Optimization</h4>
                    <p className="text-white/60 text-sm">Refining your automation for maximum performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-12 border-t border-white/10"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Email Marketing?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Take the first step towards automated email excellence. Let's discuss how we can help you achieve your goals.
          </p>
          <motion.div
            whileHover="hover"
            className="relative inline-block group cursor-pointer"
          >
            <Link href="/about/contact">
              <motion.div
                variants={{
                  hover: {
                    scale: 1.05,
                    transition: {
                      duration: 0.2,
                      ease: "easeInOut",
                    },
                  },
                }}
                className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] rounded-lg overflow-hidden"
              >
                <motion.div
                  variants={{
                    hover: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.2,
                        ease: "easeInOut",
                      },
                    },
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#0021a7] to-[#00b8ff]"
                />
                <span className="relative font-semibold">Start Your Journey</span>
                <ArrowRight className="relative h-4 w-4" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </PageTemplate>
  )
}

export default EmailAutomationPage 