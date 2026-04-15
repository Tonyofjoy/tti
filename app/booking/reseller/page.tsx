"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Globe, Package, Settings, Shield, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'

export default function ResellerPricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 pt-16 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0021a7]/10" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#00b8ff]/5 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-[#0021a7]/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent px-2">
            Reseller Service Pricing
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-2 sm:mb-3 px-4">
            Tony Tech Insights — Partner with us to expand your service offerings
          </p>
          <p className="text-xs sm:text-sm text-white/50 max-w-3xl mx-auto px-4">
            Competitive pricing • White-label options • Lifetime support
          </p>
        </motion.div>

        {/* Website Development Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#00b8ff]/20">
              <Globe className="h-6 w-6 text-[#00b8ff]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Website Development</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl h-full">
                <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-[#00b8ff]" />
                    <span className="text-sm font-medium text-[#00b8ff]">Popular Choice</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Premium Website</h3>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-white">$2,000</span>
                      <span className="text-white/60 text-sm">Reseller Price</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg text-[#00b8ff]">$2,800 – $3,500</span>
                      <span className="text-white/60 text-sm">Suggested Retail</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#00b8ff] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">1 Homepage + up to 4 subpages</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#00b8ff] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">Fully responsive design</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#00b8ff] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">Basic SEO + enhanced performance optimization</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#00b8ff] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">Advanced animations (interactive, motion UI)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#00b8ff] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">Custom modern UX/UI design</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#00b8ff] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">Unlimited revisions</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 360° Virtual Tour Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Package className="h-6 w-6 text-purple-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Website 360° Virtual Tour</h2>
          </div>

          <div className="bg-gradient-to-r p-[1px] from-purple-500 to-purple-600 rounded-2xl">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">360° Virtual Tour Website</h3>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-white">$3,000</span>
                      <span className="text-white/60 text-sm">Reseller Price</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg text-purple-400">$4,000 – $5,000</span>
                      <span className="text-white/60 text-sm">Suggested Retail</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">1 Homepage + up to 4 subpages</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Fully responsive design</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Basic SEO</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Speed optimization</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Custom modern UX/UI design</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Unlimited revisions</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Up to 50 scenes (360°)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Unlimited hotspots</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">Enterprise-grade structure with a scalable CMS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Optional Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <Settings className="h-6 w-6 text-orange-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Optional Add-ons</h2>
          </div>

          <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-2">Hosting</h4>
                  <div className="text-2xl font-bold text-[#00b8ff] mb-1">$50/year</div>
                  <p className="text-white/60 text-sm">Per website</p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-2">Logo & Brand Identity</h4>
                  <div className="text-2xl font-bold text-[#00b8ff] mb-1">$2,000/brand</div>
                  <p className="text-white/60 text-sm">Full brand identity package</p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-2">Custom Development</h4>
                  <div className="text-2xl font-bold text-[#00b8ff] mb-1">$30/hour</div>
                  <p className="text-white/60 text-sm">For requests beyond the defined scope</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Warranty & Support</h4>
                    <p className="text-white/80 text-sm">Lifetime — Free technical support and maintenance included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reseller Partnership Policy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#00b8ff]/20">
              <TrendingUp className="h-6 w-6 text-[#00b8ff]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Reseller Partnership Policy</h2>
          </div>

          <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#00b8ff] mt-2"></div>
                    <div>
                      <span className="font-semibold text-white text-lg block mb-1">Eligibility:</span>
                      <p className="text-white/80">Reseller pricing applies for partners with a minimum of 2 projects/month or a 6-month+ contract</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#00b8ff] mt-2"></div>
                    <div>
                      <span className="font-semibold text-white text-lg block mb-1">Implementation:</span>
                      <p className="text-white/80">All technical implementation and updates are handled by Tony Tech Insights</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#00b8ff] mt-2"></div>
                    <div>
                      <span className="font-semibold text-white text-lg block mb-1">Pricing Freedom:</span>
                      <p className="text-white/80">Partners have full freedom to set their own retail prices (no price floor)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#00b8ff] mt-2"></div>
                    <div>
                      <span className="font-semibold text-white text-lg block mb-1">White-label Option:</span>
                      <p className="text-white/80">Available, allowing partners to resell under their own brand</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-12 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none pb-4"
        >
          <Link
            href="/quotes"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white/85 hover:bg-white/5 transition-colors"
          >
            Quote page
          </Link>
          <Link
            href="/booking/client-project-quote-7f8a9b2c"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-semibold hover:opacity-95 transition-opacity"
          >
            Build your quote
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

