"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check, Star, Zap } from 'lucide-react'

export default function QuotesPage() {
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
            Get Your Website Quote
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-2 sm:mb-3 px-4">
            Choose the perfect package for your project. We'll build your dream website based on your design.
          </p>
          <p className="text-xs sm:text-sm text-white/50 max-w-3xl mx-auto px-4">
            Instant estimates • Professional service • Quick turnaround
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Basic Web Builder Quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-r p-[1px] from-green-500 to-green-600 rounded-2xl h-full">
              <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Zap className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Basic Web Builder</h2>
                    <p className="text-green-400 font-medium">Perfect for startups & small businesses</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-white">Starting at $500</span>
                    <span className="text-white/60 text-sm">per project</span>
                  </div>
                  <p className="text-white/70 text-sm">Simple, affordable websites that get the job done</p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Custom homepage design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Additional subpages</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Professional content writing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Image optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Mobile responsive design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Speed optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Basic SEO setup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">Domain & hosting setup</span>
                  </div>
                </div>

                <Link 
                  href="/booking/basic-web-builder-quote"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-green-500/20 transition-all group"
                >
                  <span>Get Basic Quote</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Premium Web Development Quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2">
                <Star className="h-4 w-4" />
                Most Popular
              </div>
            </div>

            <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl h-full">
              <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[#00b8ff]/20">
                    <Star className="h-6 w-6 text-[#00b8ff]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Premium Development</h2>
                    <p className="text-[#00b8ff] font-medium">Custom solutions & advanced features</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-white">Starting at $2,500</span>
                    <span className="text-white/60 text-sm">per project</span>
                  </div>
                  <p className="text-white/70 text-sm">Professional websites with custom features and premium design</p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#00b8ff] flex-shrink-0" />
                    <span className="text-white/80 text-sm">Custom brand guidelines</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#00b8ff] flex-shrink-0" />
                    <span className="text-white/80 text-sm">High-impact homepage design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#00b8ff] flex-shrink-0" />
                    <span className="text-white/80 text-sm">Advanced animations & effects</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#00b8ff] flex-shrink-0" />
                    <span className="text-white/80 text-sm">3D elements & virtual tours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#00b8ff] flex-shrink-0" />
                    <span className="text-white/80 text-sm">Full website package</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#00b8ff] flex-shrink-0" />
                    <span className="text-white/80 text-sm">Multilingual support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#00b8ff] flex-shrink-0" />
                    <span className="text-white/80 text-sm">3-5 weeks delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#00b8ff] flex-shrink-0" />
                    <span className="text-white/80 text-sm">Priority support</span>
                  </div>
                </div>

                <Link 
                  href="/booking/client-project-quote-7f8a9b2c"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#00b8ff]/20 transition-all group"
                >
                  <span>Get Premium Quote</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ or Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 sm:mt-20"
        >
          <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Need Help Choosing?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Choose Basic If:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">You're a startup or small business</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">You need a simple online presence</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">Budget is under $5,000</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">You want quick delivery</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Choose Premium If:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#00b8ff] mt-2 flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">You need custom branding & design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#00b8ff] mt-2 flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">You want advanced features</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#00b8ff] mt-2 flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">You're an established business</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#00b8ff] mt-2 flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">You need competitive advantage</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-white/60 mb-4">Still not sure which option is right for you?</p>
                <Link 
                  href="/about/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                  Contact Us for Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
