"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Check, TrendingUp, Users, Search, MessageSquare, Star } from 'lucide-react'

export default function MarketingSocialSEOQuotePage() {
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
            Marketing Social & SEO Services
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-2 sm:mb-3 px-4">
            Comprehensive digital marketing solutions to boost your online presence and drive business growth
          </p>
          <p className="text-xs sm:text-sm text-white/50 max-w-3xl mx-auto px-4">
            Professional social media management • Advanced SEO optimization • Results-driven strategies
          </p>
        </motion.div>

        {/* Pricing Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
                  📊 Marketing Social & SEO Package Comparison
                </h2>

                {/* Mobile-friendly table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-4 px-2 text-white font-semibold">Category</th>
                        <th className="text-center py-4 px-2 text-white font-semibold min-w-[150px]">
                          <div className="space-y-2">
                            <div className="text-lg font-bold">Basic</div>
                            <div className="text-sm text-white/60">$550/month</div>
                            <div className="text-xs text-white/50">Online Presence & SEO</div>
                          </div>
                        </th>
                        <th className="text-center py-4 px-2 text-white font-semibold min-w-[150px]">
                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Star className="h-4 w-4 text-yellow-400" />
                              <div className="text-lg font-bold">Standard</div>
                              <Star className="h-4 w-4 text-yellow-400" />
                            </div>
                            <div className="text-sm text-white/60">$1250/month</div>
                            <div className="text-xs text-white/50">Lead Generation & Branding</div>
                          </div>
                        </th>
                        <th className="text-center py-4 px-2 text-white font-semibold min-w-[150px]">
                          <div className="space-y-2">
                            <div className="text-lg font-bold">Premium</div>
                            <div className="text-sm text-white/60">$1450/month</div>
                            <div className="text-xs text-white/50">Industry Leadership</div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Social Media Section */}
                      <tr className="border-b border-white/10">
                        <td colSpan={4} className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/20">
                              <MessageSquare className="h-5 w-5 text-blue-400" />
                            </div>
                            <span className="text-lg font-semibold text-white">Social Media</span>
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Platforms</td>
                        <td className="py-3 px-2 text-center text-white/70">Facebook</td>
                        <td className="py-3 px-2 text-center text-white/70">Facebook + Instagram</td>
                        <td className="py-3 px-2 text-center text-white/70">Facebook + Instagram</td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Posts per Month</td>
                        <td className="py-3 px-2 text-center text-white/70">10 posts</td>
                        <td className="py-3 px-2 text-center text-white/70">12-15 posts</td>
                        <td className="py-3 px-2 text-center text-white/70">15-20 posts</td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Content Format</td>
                        <td className="py-3 px-2 text-center text-white/70">Image posts</td>
                        <td className="py-3 px-2 text-center text-white/70">Images, Carousel, 2-3 Reels</td>
                        <td className="py-3 px-2 text-center text-white/70">Images, Carousel, 4-6 Reels</td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Content Strategy</td>
                        <td className="py-3 px-2 text-center text-white/70">Knowledge + Sales</td>
                        <td className="py-3 px-2 text-center text-white/70">Recognition → Conversion Funnel</td>
                        <td className="py-3 px-2 text-center text-white/70">In-depth, Case Studies</td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Captions & Hashtags</td>
                        <td className="py-3 px-2 text-center text-white/70">Basic</td>
                        <td className="py-3 px-2 text-center text-white/70">Marketing Standard</td>
                        <td className="py-3 px-2 text-center text-white/70">Advanced Marketing</td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Scheduling</td>
                        <td className="py-3 px-2 text-center text-green-400"><Check className="h-4 w-4 mx-auto" /></td>
                        <td className="py-3 px-2 text-center text-green-400"><Check className="h-4 w-4 mx-auto" /></td>
                        <td className="py-3 px-2 text-center text-green-400"><Check className="h-4 w-4 mx-auto" /></td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Inbox Management</td>
                        <td className="py-3 px-2 text-center text-white/70">Basic</td>
                        <td className="py-3 px-2 text-center text-white/70">Comprehensive</td>
                        <td className="py-3 px-2 text-center text-white/70">Priority</td>
                      </tr>

                      <tr className="border-b border-white/10">
                        <td className="py-3 px-2 text-white/80 font-medium">Social Reports</td>
                        <td className="py-3 px-2 text-center text-white/70">Reach, Engagement</td>
                        <td className="py-3 px-2 text-center text-white/70">+ Follower Growth</td>
                        <td className="py-3 px-2 text-center text-white/70">Detailed + Consulting</td>
                      </tr>

                      {/* SEO Section */}
                      <tr className="border-b border-white/10">
                        <td colSpan={4} className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-500/20">
                              <Search className="h-5 w-5 text-green-400" />
                            </div>
                            <span className="text-lg font-semibold text-white">SEO</span>
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">SEO Audit & Setup</td>
                        <td className="py-3 px-2 text-center text-green-400"><Check className="h-4 w-4 mx-auto" /></td>
                        <td className="py-3 px-2 text-center text-green-400"><Check className="h-4 w-4 mx-auto" /></td>
                        <td className="py-3 px-2 text-center text-green-400"><Check className="h-4 w-4 mx-auto" /></td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Keyword Research</td>
                        <td className="py-3 px-2 text-center text-white/70">10 keywords</td>
                        <td className="py-3 px-2 text-center text-white/70">20 keywords</td>
                        <td className="py-3 px-2 text-center text-white/70">30 keywords</td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">On-page SEO</td>
                        <td className="py-3 px-2 text-center text-white/70">5 pages</td>
                        <td className="py-3 px-2 text-center text-white/70">8-10 pages</td>
                        <td className="py-3 px-2 text-center text-white/70">10+ pages</td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">SEO Content</td>
                        <td className="py-3 px-2 text-center text-white/70">4 articles</td>
                        <td className="py-3 px-2 text-center text-white/70">6 articles</td>
                        <td className="py-3 px-2 text-center text-white/70">8 articles</td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Article Length</td>
                        <td className="py-3 px-2 text-center text-white/70">800-1000 words</td>
                        <td className="py-3 px-2 text-center text-white/70">1000-1500 words</td>
                        <td className="py-3 px-2 text-center text-white/70">1200-1800 words</td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">EEAT Standards</td>
                        <td className="py-3 px-2 text-center text-green-400"><Check className="h-4 w-4 mx-auto" /></td>
                        <td className="py-3 px-2 text-center text-green-400"><Check className="h-4 w-4 mx-auto" /></td>
                        <td className="py-3 px-2 text-center text-green-400"><Check className="h-4 w-4 mx-auto" /></td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Internal Linking</td>
                        <td className="py-3 px-2 text-center text-white/70">Basic</td>
                        <td className="py-3 px-2 text-center text-white/70">Strategic</td>
                        <td className="py-3 px-2 text-center text-white/70">Advanced</td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Entity Building</td>
                        <td className="py-3 px-2 text-center text-white/70">Basic</td>
                        <td className="py-3 px-2 text-center text-white/70">Expanded</td>
                        <td className="py-3 px-2 text-center text-white/70">Advanced</td>
                      </tr>

                      <tr className="border-b border-white/5">
                        <td className="py-3 px-2 text-white/80 font-medium">Local SEO</td>
                        <td className="py-3 px-2 text-center text-white/50">-</td>
                        <td className="py-3 px-2 text-center text-white/50">-</td>
                        <td className="py-3 px-2 text-center text-green-400"><Check className="h-4 w-4 mx-auto" /></td>
                      </tr>

                      <tr className="border-b border-white/10">
                        <td className="py-3 px-2 text-white/80 font-medium">SEO Reports</td>
                        <td className="py-3 px-2 text-center text-white/70">Traffic, Index</td>
                        <td className="py-3 px-2 text-center text-white/70">+ Keyword Rankings</td>
                        <td className="py-3 px-2 text-center text-white/70">+ Leads & Performance</td>
                      </tr>

                      {/* Best For Section */}
                      <tr>
                        <td className="py-4 px-2 text-white font-semibold">Best For</td>
                        <td className="py-4 px-2 text-center text-white/70">New Businesses</td>
                        <td className="py-4 px-2 text-center text-white/70">SME Businesses</td>
                        <td className="py-4 px-2 text-center text-white/70">Industry Leaders</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-[#00b8ff]" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Ready to Grow Your Business?</h3>
              </div>
              <p className="text-lg text-white/70 mb-6 max-w-2xl mx-auto">
                Choose the perfect marketing package for your business goals. Our expert team will help you dominate your industry online.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#00b8ff]/20"
              >
                <Users className="h-5 w-5" />
                Get Marketing Quote
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
