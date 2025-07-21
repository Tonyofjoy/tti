"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { BookingFormData } from '@/types/booking'
import { pricingItems, categoryColors } from '@/data/pricing'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ClientProjectBookingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  // Initialize form data with default selections
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    projectName: '',
    email: '',
    phone: '',
    company: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    selectedItems: {},
    additionalRequirements: '',
    preferredContactMethod: 'email',
  })

  // Initialize selected items with defaults
  useEffect(() => {
    const defaultSelections: BookingFormData['selectedItems'] = {}
    pricingItems.forEach(item => {
      defaultSelections[item.id] = {
        quantity: item.defaultQty,
        enabled: false // Start with all items disabled
      }
    })
    setFormData(prev => ({ ...prev, selectedItems: defaultSelections }))
    setIsMounted(true)
  }, [])

  // Calculate total estimate
  const calculateTotal = () => {
    let total = 0
    Object.entries(formData.selectedItems).forEach(([itemId, selection]) => {
      if (selection.enabled) {
        const item = pricingItems.find(p => p.id === itemId)
        if (item) {
          total += item.unitPrice * selection.quantity
        }
      }
    })
    return total
  }

  // Handle item selection toggle
  const toggleItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedItems: {
        ...prev.selectedItems,
        [itemId]: {
          ...prev.selectedItems[itemId],
          enabled: !prev.selectedItems[itemId]?.enabled
        }
      }
    }))
  }

  // Handle quantity change
  const updateQuantity = (itemId: string, newQuantity: number) => {
    const item = pricingItems.find(p => p.id === itemId)
    if (!item) return

    const quantity = Math.max(1, Math.min(newQuantity, item.maxQty || 99))
    
    setFormData(prev => ({
      ...prev,
      selectedItems: {
        ...prev.selectedItems,
        [itemId]: {
          ...prev.selectedItems[itemId],
          quantity
        }
      }
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.clientName || !formData.email || !formData.phone) {
        toast.error('Please fill in all required fields')
        setIsSubmitting(false)
        return
      }

      // Validate that at least one item is selected
      const hasSelectedItems = Object.values(formData.selectedItems).some(item => item.enabled)
      if (!hasSelectedItems) {
        toast.error('Please select at least one service')
        setIsSubmitting(false)
        return
      }

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          totalEstimate: calculateTotal()
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking')
      }

      toast.success('Booking submitted successfully! We\'ll contact you within 24 hours.')
      
      // Reset form
      setFormData({
        clientName: '',
        projectName: '',
        email: '',
        phone: '',
        company: '',
        projectDescription: '',
        timeline: '',
        budget: '',
        selectedItems: formData.selectedItems, // Keep the structure but reset enabled states
        additionalRequirements: '',
        preferredContactMethod: 'email',
      })

      // Reset all items to disabled
      const resetSelections: BookingFormData['selectedItems'] = {}
      pricingItems.forEach(item => {
        resetSelections[item.id] = {
          quantity: item.defaultQty,
          enabled: false
        }
      })
      setFormData(prev => ({ ...prev, selectedItems: resetSelections }))
      
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to submit booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalEstimate = calculateTotal()

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00b8ff]"></div>
      </div>
    )
  }

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
            Premium Web Development Quote
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-2 sm:mb-3 px-4">
            Select your desired services and get an instant project estimate. Our team will review your requirements and provide a detailed proposal.
          </p>
          <p className="text-xs sm:text-sm text-white/50 max-w-3xl mx-auto px-4">
            Last updated: 1/1/2025
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Client Information Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl">
              <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
                  Client Information
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Client Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      required
                      className="text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      required
                      className="text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Project Name
                    </label>
                    <Input
                      type="text"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      placeholder="Company Website Redesign"
                      className="text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-white/20 bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff] transition-all"
                    >
                      <option value="" className="bg-black text-white">Select budget range</option>
                      <option value="$1,000 - $5,000" className="bg-black text-white">$1,000 - $5,000</option>
                      <option value="$5,000 - $10,000" className="bg-black text-white">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000" className="bg-black text-white">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000" className="bg-black text-white">$25,000 - $50,000</option>
                      <option value="$50,000+" className="bg-black text-white">$50,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Additional Notes
                    </label>
                    <textarea
                      value={formData.additionalRequirements}
                      onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff] transition-all resize-none"
                      placeholder="Brief project description, timeline, or any specific requirements..."
                    />
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Middle Column - Project Scope & Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl">
              <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
                  Project Scope & Pricing
                </h2>
                
                <div className="space-y-4 max-h-[800px] overflow-y-auto scrollbar-none">
                  {Object.entries(
                    pricingItems.reduce((acc, item) => {
                      if (!acc[item.category]) acc[item.category] = []
                      acc[item.category].push(item)
                      return acc
                    }, {} as Record<string, typeof pricingItems>)
                  ).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="text-lg font-semibold text-white/90">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </h3>
                      
                      {items.map((item) => {
                        const selection = formData.selectedItems[item.id] || { quantity: item.defaultQty, enabled: false }
                        const subtotal = item.unitPrice * selection.quantity
                        
                        return (
                          <div
                            key={item.id}
                            className={`p-3 sm:p-4 rounded-lg border transition-all cursor-pointer ${
                              selection.enabled
                                ? 'border-[#00b8ff] bg-[#00b8ff]/10'
                                : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                            onClick={() => toggleItem(item.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="mt-1">
                                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                                    selection.enabled 
                                      ? 'border-[#00b8ff] bg-[#00b8ff]' 
                                      : 'border-white/40'
                                  }`}>
                                    {selection.enabled && (
                                      <div className="w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{item.name}</h4>
                                  <p className="text-sm text-white/60 mb-2">{item.description}</p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-white/50">{item.unit}</span>
                                    <span className="text-sm font-medium text-[#00b8ff]">
                                      ${item.unitPrice.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {selection.enabled && (
                              <div className="mt-3 pt-3 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-white/70">Quantity:</span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        updateQuantity(item.id, selection.quantity - 1)
                                      }}
                                      className="w-8 h-8 sm:w-6 sm:h-6 rounded bg-white/10 hover:bg-white/20 text-white text-sm font-bold flex items-center justify-center touch-manipulation"
                                      disabled={selection.quantity <= 1}
                                    >
                                      −
                                    </button>
                                    <span className="w-10 sm:w-8 text-center text-white font-medium">
                                      {selection.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        updateQuantity(item.id, selection.quantity + 1)
                                      }}
                                      className="w-8 h-8 sm:w-6 sm:h-6 rounded bg-white/10 hover:bg-white/20 text-white text-sm font-bold flex items-center justify-center touch-manipulation"
                                      disabled={selection.quantity >= (item.maxQty || 99)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-sm text-white/70">Subtotal:</span>
                                  <span className="font-bold text-[#00b8ff]">
                                    ${subtotal.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Budget Calculator & Submit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="space-y-4 sm:space-y-6">
              {/* Budget Calculator */}
              <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl">
                <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
                    Budget Calculator
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-[#00b8ff]/20 to-[#0021a7]/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80">Total Estimate:</span>
                        <span className="text-3xl font-bold text-[#00b8ff]">
                          ${totalEstimate.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-white/60">
                        USD • Excluding taxes and hosting fees
                      </p>
                    </div>

                    {/* Selected Items Summary */}
                    {Object.entries(formData.selectedItems).some(([_, selection]) => selection.enabled) && (
                      <div className="space-y-2">
                        <h3 className="font-semibold text-white/90">Selected Services:</h3>
                        <div className="max-h-[400px] overflow-y-auto scrollbar-none space-y-2">
                          {Object.entries(formData.selectedItems)
                            .filter(([_, selection]) => selection.enabled)
                            .map(([itemId, selection]) => {
                              const item = pricingItems.find(p => p.id === itemId)
                              if (!item) return null
                              const subtotal = item.unitPrice * selection.quantity
                              
                              return (
                                <div key={itemId} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-white/5 rounded-lg gap-1 sm:gap-0">
                                  <div className="flex items-center">
                                    <span className="text-white text-sm font-medium">{item.name}</span>
                                    <span className="text-white/60 text-xs ml-2">×{selection.quantity}</span>
                                  </div>
                                  <span className="text-[#00b8ff] font-semibold text-right">
                                    ${subtotal.toLocaleString()}
                                  </span>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl">
                <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] rounded-lg text-white font-semibold text-lg transition-all ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-[#00b8ff]/20'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Request Quote</span>
                    )}
                  </motion.button>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">What happens next?</h4>
                    <ol className="space-y-2 sm:space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b8ff]/20 flex items-center justify-center text-sm font-bold text-[#00b8ff]">1</span>
                        <span className="text-white/80 text-sm">We'll review your requirements within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b8ff]/20 flex items-center justify-center text-sm font-bold text-[#00b8ff]">2</span>
                        <span className="text-white/80 text-sm">Our team will contact you to discuss details</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00b8ff]/20 flex items-center justify-center text-sm font-bold text-[#00b8ff]">3</span>
                        <span className="text-white/80 text-sm">We'll provide a detailed proposal and timeline</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Project Terms & Details Section - Now standalone below the main grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-10 lg:mt-12"
        >
          <div className="bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] rounded-2xl">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8">
                                           <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">
                 Project Terms & Details
               </h2>
               
                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#00b8ff] mt-2"></div>
                    <div>
                      <span className="font-semibold text-white text-lg">Payment:</span>
                      <p className="text-white/80 mt-1">50% upfront payment, 50% upon project handover</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#00b8ff] mt-2"></div>
                    <div>
                      <span className="font-semibold text-white text-lg">Timeline:</span>
                      <p className="text-white/80 mt-1">~3–5 weeks from start date</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#00b8ff] mt-2"></div>
                    <div>
                      <span className="font-semibold text-white text-lg">Revisions:</span>
                      <p className="text-white/80 mt-1">Up to 2 rounds included per deliverable</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#00b8ff] mt-2"></div>
                    <div>
                      <span className="font-semibold text-white text-lg">Validity:</span>
                      <p className="text-white/80 mt-1">Quote valid for 14 days</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#00b8ff] mt-2"></div>
                    <div>
                      <span className="font-semibold text-white text-lg">Maintenance:</span>
                      <p className="text-white/80 mt-1">Always free of charge (applicable only if error comes from our production)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-orange-400 mt-2"></div>
                    <div>
                      <span className="font-semibold text-white text-lg">Optional add-ons:</span>
                      <p className="text-white/80 mt-1">Google Ads setup, Video shooting, CRM integration (quoted separately)</p>
                    </div>
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