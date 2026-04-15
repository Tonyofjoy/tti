"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pricingItems } from '@/data/pricing'
import type { PricingItem, PricingLayer } from '@/types/booking'

const layerOrder: PricingLayer[] = ['structure', 'component', 'feature', 'effort']

const layerGradients: Record<PricingLayer, string> = {
  structure: 'from-indigo-500 to-indigo-800',
  component: 'from-cyan-500 to-blue-800',
  feature: 'from-emerald-500 to-teal-800',
  effort: 'from-amber-500 to-orange-800',
}

const layerTitles: Record<PricingLayer, string> = {
  structure: 'Structure',
  component: 'Component layer',
  feature: 'Feature layer',
  effort: 'Effort multipliers',
}

function formatUnitPrice(item: PricingItem): string {
  if (item.layer === 'effort' && item.globalMultiplier) {
    return `×${item.globalMultiplier} on line items`
  }
  if (item.unitPrice === 0) {
    return 'Included'
  }
  return `$${item.unitPrice.toLocaleString('en-US')}`
}

function maxQtyLabel(item: PricingItem): string {
  if (item.maxQty == null) return '—'
  return String(item.maxQty)
}

function formatRubricTier(item: PricingItem): string {
  if (item.layer === 'component' && item.componentTier) {
    return item.componentTier.charAt(0).toUpperCase() + item.componentTier.slice(1)
  }
  if (item.layer === 'feature' && item.featureTier) {
    return item.featureTier.charAt(0).toUpperCase() + item.featureTier.slice(1)
  }
  return '—'
}

export default function PremiumWebPricingTablePage() {
  const byLayer = layerOrder.reduce<Record<PricingLayer, PricingItem[]>>(
    (acc, layer) => {
      acc[layer] = []
      return acc
    },
    { structure: [], component: [], feature: [], effort: [] }
  )

  for (const item of pricingItems) {
    byLayer[item.layer].push(item)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 pt-16 sm:pt-24 pb-12 px-3 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0021a7]/10 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#00b8ff]/5 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-[#0021a7]/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent px-2">
            Premium Web Development Pricing
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto px-2">
            Reference rates per line item. Final quotes combine your selections in the builder.
          </p>
          <p className="text-xs text-white/45 mt-2 max-w-2xl mx-auto">
            Website enterprise package and homepage + subpage lines are mutually exclusive in the quote tool.
          </p>
          <div className="mt-6 max-w-3xl mx-auto text-left rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white/60 space-y-2">
            <p>
              <span className="text-white/80 font-medium">Component tier</span> — simple: lightweight blocks (popups,
              image batches); medium: richer modules (static 3D embeds); complex: interaction, motion, advanced 3D.
            </p>
            <p>
              <span className="text-white/80 font-medium">Feature tier</span> — basic: baseline setup (SEO meta,
              speed pass, hosting handoff); medium: deeper product work (project copy, extra languages); advanced: large
              experiential scope (virtual tour).
            </p>
            <p className="text-white/50">
              Most rows use ~$50 USD per scope point; batch or included lines can sit off that curve by design.
            </p>
          </div>
        </motion.div>

        <div className="space-y-10">
          {layerOrder
            .filter((layer) => byLayer[layer].length > 0)
            .map((layer, sectionIndex) => {
              const items = byLayer[layer]
              const gradient = layerGradients[layer]

              return (
                <motion.section
                  key={layer}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * sectionIndex }}
                  className="rounded-2xl bg-gradient-to-r p-[1px] from-[#0021a7]/80 to-[#00b8ff]/80"
                >
                  <div className="rounded-2xl bg-black/85 backdrop-blur-xl overflow-hidden">
                    <div
                      className={`px-4 sm:px-6 py-4 bg-gradient-to-r ${gradient} bg-opacity-30 border-b border-white/10`}
                    >
                      <h2 className="text-xl font-bold text-white">{layerTitles[layer]}</h2>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[720px] text-left text-sm text-white/90">
                        <thead className="border-b border-white/10 text-white/55 text-xs uppercase tracking-wide">
                          <tr>
                            <th className="px-4 sm:px-6 py-3 font-medium">Service</th>
                            <th className="px-4 py-3 font-medium hidden sm:table-cell whitespace-nowrap">Tier</th>
                            <th className="px-4 py-3 font-medium hidden sm:table-cell">Unit</th>
                            <th className="px-4 py-3 font-medium text-right">Price</th>
                            <th className="px-4 py-3 font-medium text-center hidden md:table-cell">Max qty</th>
                            <th className="px-4 sm:px-6 py-3 font-medium text-right hidden lg:table-cell">
                              Points / unit
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {items.map((item) => (
                            <tr key={item.id} className="hover:bg-white/[0.04] transition-colors">
                              <td className="px-4 sm:px-6 py-4 align-top">
                                <div className="font-semibold text-white">{item.name}</div>
                                <p className="text-white/55 text-xs mt-1 max-w-md">{item.description}</p>
                                <span className="text-white/40 text-xs sm:hidden mt-1 inline-block">{item.unit}</span>
                                <span className="text-white/40 text-xs sm:hidden mt-0.5 inline-block">
                                  Tier: {formatRubricTier(item)}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-white/65 hidden sm:table-cell align-top whitespace-nowrap">
                                {formatRubricTier(item)}
                              </td>
                              <td className="px-4 py-4 text-white/60 hidden sm:table-cell align-top whitespace-nowrap">
                                {item.unit}
                              </td>
                              <td className="px-4 py-4 text-right align-top whitespace-nowrap">
                                <span className="font-semibold text-[#00b8ff]">{formatUnitPrice(item)}</span>
                              </td>
                              <td className="px-4 py-4 text-center text-white/60 hidden md:table-cell align-top">
                                {maxQtyLabel(item)}
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-right text-white/55 hidden lg:table-cell align-top">
                                {item.pointsPerUnit === 0 ? '—' : item.pointsPerUnit}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.section>
              )
            })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/booking/client-project-quote-7f8a9b2c"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] text-white font-semibold hover:opacity-95 transition-opacity"
          >
            Build your quote
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/quotes" className="text-[#00b8ff] hover:underline text-sm">
            All quote options
          </Link>
        </motion.div>

        <p className="text-center text-white/40 text-xs mt-8 max-w-xl mx-auto space-y-2">
          <span className="block">
            USD. Taxes and third-party hosting/domain renewals billed separately where applicable. Scope points are an
            internal estimate score in the quote system.
          </span>
          <Link href="/booking/point-based-pricing" className="text-[#00b8ff]/80 hover:text-[#00b8ff] hover:underline">
            New unified scope rubric ($50 / point)
          </Link>
        </p>
      </div>
    </div>
  )
}
