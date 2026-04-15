"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { BookingFormData } from "@/types/booking"
import { pricingItems, categoryColors } from "@/data/pricing"
import {
  emptySelectionsFromCatalog,
  BASE_SCOPE_ANCHOR,
  OUT_OF_SCOPE_RULES,
  CHANGE_REQUEST_COPY,
} from "@/data/pricing-anchor"
import { computeQuote, applyItemToggle } from "@/lib/pricing-engine"
import { Input } from "@/components/ui/input"

const money = (n: number) => `$${n.toLocaleString("en-US")}`

export default function ClientProjectBookingPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const [formData, setFormData] = useState<BookingFormData>({
    clientName: "",
    projectName: "",
    email: "",
    phone: "",
    company: "",
    projectDescription: "",
    timeline: "",
    budget: "",
    selectedItems: {},
    additionalRequirements: "",
    preferredContactMethod: "email",
    quoteType: "premium",
    salesTier: "custom",
  })

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedItems: emptySelectionsFromCatalog(pricingItems),
    }))
    setIsMounted(true)
  }, [])

  const quote = computeQuote(formData.selectedItems, "premium")
  const totalEstimate = quote.totalEstimate

  const itemsByCategory = useMemo(() => {
    return pricingItems.reduce<Record<string, typeof pricingItems>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    }, {})
  }, [])

  const categoryOrder = ["design", "development", "content", "optimization", "hosting", "effort"]

  const toggleItem = (itemId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedItems: applyItemToggle(prev.selectedItems, itemId, pricingItems),
    }))
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const item = pricingItems.find((p) => p.id === itemId)
    if (!item) return
    const quantity = Math.max(1, Math.min(newQuantity, item.maxQty || 99))
    setFormData((prev) => ({
      ...prev,
      selectedItems: {
        ...prev.selectedItems,
        [itemId]: {
          ...prev.selectedItems[itemId],
          quantity,
        },
      },
    }))
  }

  const hasSelection = Object.values(formData.selectedItems).some((s) => s.enabled)

  const goToContactStep = () => {
    if (!hasSelection) {
      toast.error("Select at least one line item to continue")
      return
    }
    setStep(2)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.clientName || !formData.email || !formData.phone) {
        toast.error("Please fill in all required fields")
        setIsSubmitting(false)
        return
      }

      if (!hasSelection) {
        toast.error("Please select at least one service")
        setIsSubmitting(false)
        return
      }

      const q = computeQuote(formData.selectedItems, "premium")

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          quoteType: "premium" as const,
          totalEstimate: q.totalEstimate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking")
      }

      toast.success("Booking submitted successfully! We'll contact you within 24 hours.")

      setStep(1)
      setFormData({
        clientName: "",
        projectName: "",
        email: "",
        phone: "",
        company: "",
        projectDescription: "",
        timeline: "",
        budget: "",
        selectedItems: emptySelectionsFromCatalog(pricingItems),
        additionalRequirements: "",
        preferredContactMethod: "email",
        quoteType: "premium",
        salesTier: "custom",
      })
    } catch (error) {
      console.error("Error submitting booking:", error)
      toast.error(error instanceof Error ? error.message : "Failed to submit booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00b8ff]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 pt-16 sm:pt-20 pb-28 sm:pb-24 px-3 sm:px-5 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0021a7]/10 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#00b8ff]/5 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-[#0021a7]/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-[1600px]">
        <div className="mb-4 flex justify-center sm:justify-start">
          <Link
            href="/quotes"
            className="inline-flex items-center gap-1 text-sm text-white/55 hover:text-[#00b8ff] transition-colors"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
            Back to quote page
          </Link>
        </div>

        {/* Header + stepper */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent px-2">
            Premium Web Development Quote
          </h1>
          <p className="text-sm sm:text-lg text-white/70 max-w-2xl mx-auto px-2">
            {step === 1
              ? "Choose scope and add-ons — see your estimate update live."
              : "Almost done — tell us how to reach you."}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 sm:gap-4">
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium ${
                step === 1 ? "bg-[#00b8ff]/20 text-[#00b8ff]" : "bg-white/10 text-white/50"
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00b8ff] text-black text-xs font-bold">
                1
              </span>
              Scope & pricing
            </div>
            <ChevronRight className="h-4 w-4 text-white/30 hidden sm:block" aria-hidden />
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium ${
                step === 2 ? "bg-[#00b8ff]/20 text-[#00b8ff]" : "bg-white/10 text-white/50"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  step === 2 ? "bg-[#00b8ff] text-black" : "bg-white/20 text-white/70"
                }`}
              >
                2
              </span>
              Your details
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 max-w-4xl">
                <p className="text-[11px] font-semibold text-[#00b8ff]">{BASE_SCOPE_ANCHOR.headline}</p>
                <ul className="mt-1 space-y-0.5 text-[11px] text-white/55 list-disc list-inside">
                  {BASE_SCOPE_ANCHOR.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>

              {/* Category grids — no max-height scroll */}
              <div className="space-y-5">
                {categoryOrder
                  .filter((c) => itemsByCategory[c]?.length)
                  .map((category) => {
                    const items = itemsByCategory[category]
                    const gradient = categoryColors[category] ?? "from-slate-500 to-slate-700"
                    return (
                      <div key={category} className="rounded-xl border border-white/10 bg-black/50 overflow-hidden">
                        <div
                          className={`px-3 py-2 bg-gradient-to-r ${gradient} bg-opacity-25 border-b border-white/10`}
                        >
                          <h2 className="text-sm font-bold text-white capitalize tracking-wide">
                            {category}
                          </h2>
                        </div>
                        <div className="p-2 sm:p-3">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                            {items.map((item) => {
                              const selection = formData.selectedItems[item.id] || {
                                quantity: item.defaultQty,
                                enabled: false,
                              }
                              const subtotal = item.unitPrice * selection.quantity
                              const isEffort =
                                item.layer === "effort" && item.globalMultiplier && item.globalMultiplier > 0
                              const priceLabel =
                                isEffort && item.globalMultiplier
                                  ? `×${item.globalMultiplier}`
                                  : item.unitPrice === 0
                                    ? "Included"
                                    : money(item.unitPrice)

                              return (
                                <div
                                  key={item.id}
                                  role="button"
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault()
                                      toggleItem(item.id)
                                    }
                                  }}
                                  onClick={() => toggleItem(item.id)}
                                  className={`flex flex-col rounded-lg border p-2 sm:p-2.5 text-left transition-all cursor-pointer min-h-[112px] sm:min-h-[100px] ${
                                    selection.enabled
                                      ? "border-[#00b8ff] bg-[#00b8ff]/12 ring-1 ring-[#00b8ff]/30"
                                      : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.06]"
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-1 mb-1">
                                    <span
                                      className={`mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-2 flex items-center justify-center ${
                                        selection.enabled ? "border-[#00b8ff] bg-[#00b8ff]" : "border-white/35"
                                      }`}
                                      aria-hidden
                                    >
                                      {selection.enabled && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                      )}
                                    </span>
                                    <span className="text-[10px] font-semibold text-[#00b8ff] text-right leading-tight">
                                      {priceLabel}
                                    </span>
                                  </div>
                                  <h3 className="text-xs sm:text-[13px] font-semibold text-white leading-snug line-clamp-2">
                                    {item.name}
                                  </h3>
                                  <p className="mt-0.5 text-[10px] sm:text-[11px] text-white/45 line-clamp-2 flex-1">
                                    {item.description}
                                  </p>
                                  <p className="mt-1 text-[9px] text-white/35 truncate">{item.unit}</p>

                                  {selection.enabled && (
                                    <div
                                      className="mt-2 pt-2 border-t border-white/10 space-y-1.5"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="text-[10px] text-white/55">Qty</span>
                                        <div className="flex items-center gap-0.5">
                                          <button
                                            type="button"
                                            onClick={() => updateQuantity(item.id, selection.quantity - 1)}
                                            className="h-6 w-6 rounded bg-white/10 text-xs font-bold text-white hover:bg-white/20 disabled:opacity-40"
                                            disabled={selection.quantity <= 1}
                                          >
                                            −
                                          </button>
                                          <span className="w-5 text-center text-[11px] text-white font-medium">
                                            {selection.quantity}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => updateQuantity(item.id, selection.quantity + 1)}
                                            className="h-6 w-6 rounded bg-white/10 text-xs font-bold text-white hover:bg-white/20 disabled:opacity-40"
                                            disabled={selection.quantity >= (item.maxQty || 99)}
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                      <div className="flex justify-between text-[10px]">
                                        <span className="text-white/45">{isEffort ? "Effect" : "Sub"}</span>
                                        <span className="font-semibold text-[#00b8ff]">
                                          {isEffort
                                            ? `×${item.globalMultiplier}`
                                            : money(subtotal)}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>

              <p className="text-center text-[11px] text-white/40">{CHANGE_REQUEST_COPY}</p>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8"
            >
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="rounded-xl border border-white/10 bg-black/60 p-4 sm:p-6 lg:sticky lg:top-24">
                  <h2 className="text-lg font-bold text-white mb-3">Estimate summary</h2>
                  <div className="rounded-lg bg-gradient-to-r from-[#00b8ff]/15 to-[#0021a7]/15 p-4 mb-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-white/70 text-sm">Total</span>
                      <span className="text-2xl sm:text-3xl font-bold text-[#00b8ff]">{money(totalEstimate)}</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">USD • Excl. taxes & renewals</p>
                    {quote.totalPoints > 0 && (
                      <p className="text-[10px] text-white/40 mt-2">
                        Scope points: {quote.totalPoints}
                        {quote.combinedMultiplier !== 1 ? ` • Effort ×${quote.combinedMultiplier}` : ""}
                      </p>
                    )}
                  </div>
                  <div className="max-h-[min(50vh,420px)] overflow-y-auto space-y-1.5 pr-1">
                    {Object.entries(formData.selectedItems)
                      .filter(([, s]) => s.enabled)
                      .map(([itemId, selection]) => {
                        const item = pricingItems.find((p) => p.id === itemId)
                        if (!item) return null
                        const subtotal = item.unitPrice * selection.quantity
                        const effort =
                          item.layer === "effort" && item.globalMultiplier && item.globalMultiplier > 0
                        return (
                          <div
                            key={itemId}
                            className="flex justify-between gap-2 rounded-md bg-white/5 px-2 py-1.5 text-xs"
                          >
                            <span className="text-white/85 truncate">{item.name}</span>
                            <span className="text-[#00b8ff] shrink-0 font-medium">
                              {effort ? `×${item.globalMultiplier}` : money(subtotal)}
                            </span>
                          </div>
                        )
                      })}
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 py-2.5 text-sm text-white/90 hover:bg-white/5"
                    >
                      <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
                      Edit scope
                    </button>
                    <Link
                      href="/quotes"
                      className="w-full inline-flex items-center justify-center rounded-lg border border-white/15 py-2.5 text-sm text-white/60 hover:text-white/85 hover:bg-white/5 transition-colors"
                    >
                      Quote page
                    </Link>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 order-1 lg:order-2">
                <div className="rounded-xl border border-white/10 bg-black/60 p-4 sm:p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Contact & project</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium mb-1.5 text-white/70">Client name *</label>
                        <Input
                          type="text"
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                          placeholder="Jane Doe"
                          required
                          className="text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-white/70">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@company.com"
                          required
                          className="text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-white/70">Phone *</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 …"
                          required
                          className="text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium mb-1.5 text-white/70">Company</label>
                        <Input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium mb-1.5 text-white/70">Project name</label>
                        <Input
                          type="text"
                          value={formData.projectName}
                          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                          className="text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-white/70">Timeline</label>
                        <Input
                          type="text"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          placeholder="e.g. Q2 launch"
                          className="text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-white/70">Budget range</label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full h-10 rounded-md border border-white/20 bg-black/50 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff]"
                        >
                          <option value="">Select range</option>
                          <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                          <option value="$50,000+">$50,000+</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium mb-1.5 text-white/70">Project description</label>
                        <textarea
                          value={formData.projectDescription}
                          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                          rows={3}
                          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff] resize-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium mb-1.5 text-white/70">Additional notes</label>
                        <textarea
                          value={formData.additionalRequirements}
                          onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                          rows={3}
                          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00b8ff] resize-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <span className="block text-xs font-medium mb-2 text-white/70">Preferred contact</span>
                        <div className="flex flex-wrap gap-3 text-sm">
                          {(["email", "phone", "both"] as const).map((m) => (
                            <label key={m} className="inline-flex items-center gap-2 text-white/80 cursor-pointer">
                              <input
                                type="radio"
                                name="pcm"
                                checked={formData.preferredContactMethod === m}
                                onChange={() => setFormData({ ...formData, preferredContactMethod: m })}
                                className="accent-[#00b8ff]"
                              />
                              {m === "both" ? "Email & phone" : m.charAt(0).toUpperCase() + m.slice(1)}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.99 }}
                      disabled={isSubmitting}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] py-3.5 text-white font-semibold disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Submit quote request"
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky bar step 1 */}
        {step === 1 && (
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/90 backdrop-blur-md px-3 py-3 sm:px-6 pb-[max(12px,env(safe-area-inset-bottom))]">
            <div className="container mx-auto max-w-[1600px] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 min-w-0">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-white/45">Estimate</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#00b8ff]">{money(totalEstimate)}</p>
                </div>
                {hasSelection && (
                  <p className="text-xs text-white/50 hidden md:block max-w-md truncate">
                    {quote.breakdown.length} line item{quote.breakdown.length !== 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 shrink-0 sm:min-w-0">
                <Link
                  href="/quotes"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white/85 hover:bg-white/5 transition-colors"
                >
                  Quote page
                </Link>
                <button
                  type="button"
                  onClick={goToContactStep}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] px-6 py-2.5 sm:py-3 text-white font-semibold text-sm sm:text-base"
                >
                  Build your quote
                  <ChevronRight className="h-5 w-5 shrink-0 hidden sm:inline" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Terms — both steps, collapsible feel via spacing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className={`mt-10 ${step === 1 ? "mb-24 sm:mb-20" : "mb-10"}`}
        >
          <div className="rounded-xl border border-white/10 bg-black/50 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-white mb-4">Project terms & scope limits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/75">
              <ul className="space-y-2 list-disc list-inside">
                <li>50% upfront, 50% on handover</li>
                <li>~3–5 weeks typical timeline</li>
                <li>Quote valid 14 days</li>
              </ul>
              <ul className="space-y-2 list-disc list-inside">
                {OUT_OF_SCOPE_RULES.bullets.slice(0, 3).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
