"use client"

import { type ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  POINT_USD,
  pageTiers,
  componentTiers,
  featureRows,
  modifiers,
  revisionPolicy,
  usdFromPoints,
} from "@/data/point-pricing-rubric"

const sectionGradients = [
  "from-indigo-500 to-indigo-800",
  "from-cyan-500 to-blue-800",
  "from-emerald-500 to-teal-800",
  "from-amber-500 to-orange-800",
  "from-violet-500 to-purple-800",
] as const

export default function PointBasedPricingPage() {
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
            Point-based scope pricing
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto px-2">
            Rubric for scoping web projects: structure, components, features, modifiers, and revision rules.
          </p>
          <p className="text-sm text-[#00b8ff] font-semibold mt-3">
            1 point = ${POINT_USD.toLocaleString("en-US")} USD
          </p>
          <p className="text-xs text-white/45 mt-2 max-w-2xl mx-auto">
            Modifiers compound (multiply). Final proposals may round. Premium quote builder still uses its legacy
            catalog; this page is the forward-looking matrix.
          </p>
        </motion.div>

        <div className="space-y-10">
          <RubricSection
            index={0}
            title="A. Pages (structure layer)"
            gradient={sectionGradients[0]}
            table={
              <table className="w-full min-w-[640px] text-left text-sm text-white/90">
                <thead className="border-b border-white/10 text-white/55 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 font-medium text-right">Points</th>
                    <th className="px-4 sm:px-6 py-3 font-medium text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {pageTiers.map((row) => (
                    <tr key={row.id} className="hover:bg-white/[0.04] transition-colors">
                      <td className="px-4 sm:px-6 py-4 font-semibold text-white whitespace-nowrap">{row.type}</td>
                      <td className="px-4 py-4 text-white/60">{row.description}</td>
                      <td className="px-4 py-4 text-right text-white/80">{row.points}</td>
                      <td className="px-4 sm:px-6 py-4 text-right font-semibold text-[#00b8ff]">
                        ${usdFromPoints(row.points).toLocaleString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          />

          <RubricSection
            index={1}
            title="B. Components (design system)"
            gradient={sectionGradients[1]}
            table={
              <table className="w-full min-w-[640px] text-left text-sm text-white/90">
                <thead className="border-b border-white/10 text-white/55 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Examples</th>
                    <th className="px-4 py-3 font-medium text-right">Points</th>
                    <th className="px-4 sm:px-6 py-3 font-medium text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {componentTiers.map((row) => (
                    <tr key={row.id} className="hover:bg-white/[0.04] transition-colors">
                      <td className="px-4 sm:px-6 py-4 font-semibold text-white whitespace-nowrap">{row.type}</td>
                      <td className="px-4 py-4 text-white/60">{row.examples}</td>
                      <td className="px-4 py-4 text-right text-white/80">{row.points}</td>
                      <td className="px-4 sm:px-6 py-4 text-right font-semibold text-[#00b8ff]">
                        ${usdFromPoints(row.points).toLocaleString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          />

          <RubricSection
            index={2}
            title="C. Features (functionality layer)"
            gradient={sectionGradients[2]}
            table={
              <table className="w-full min-w-[520px] text-left text-sm text-white/90">
                <thead className="border-b border-white/10 text-white/55 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 font-medium">Feature</th>
                    <th className="px-4 py-3 font-medium text-right">Points</th>
                    <th className="px-4 sm:px-6 py-3 font-medium text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {featureRows.map((row) => (
                    <tr key={row.id} className="hover:bg-white/[0.04] transition-colors">
                      <td className="px-4 sm:px-6 py-4 font-semibold text-white">{row.feature}</td>
                      <td className="px-4 py-4 text-right text-white/80">{row.points}</td>
                      <td className="px-4 sm:px-6 py-4 text-right font-semibold text-[#00b8ff]">
                        ${usdFromPoints(row.points).toLocaleString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          />

          <RubricSection
            index={3}
            title="D. Modifiers (protection layer)"
            gradient={sectionGradients[3]}
            table={
              <table className="w-full min-w-[480px] text-left text-sm text-white/90">
                <thead className="border-b border-white/10 text-white/55 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 font-medium">Condition</th>
                    <th className="px-4 sm:px-6 py-3 font-medium text-right">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {modifiers.map((row) => (
                    <tr key={row.id} className="hover:bg-white/[0.04] transition-colors">
                      <td className="px-4 sm:px-6 py-4 font-semibold text-white">{row.condition}</td>
                      <td className="px-4 sm:px-6 py-4 text-right text-[#00b8ff] font-semibold">
                        {row.label} (×{row.multiplier})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          />

          <RubricSection
            index={4}
            title="E. Revisions & limits"
            gradient={sectionGradients[4]}
            table={
              <table className="w-full text-left text-sm text-white/90">
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-white">Revision rounds (included)</td>
                    <td className="px-4 sm:px-6 py-4 text-right text-white/75">
                      {revisionPolicy.includedRevisionRounds} rounds
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-white">Extra revision</td>
                    <td className="px-4 sm:px-6 py-4 text-right text-[#00b8ff]">
                      {revisionPolicy.extraRevisionPoints} pts ($
                      {revisionPolicy.extraRevisionUsd.toLocaleString("en-US")}) each
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-white">Content upload limit</td>
                    <td className="px-4 sm:px-6 py-4 text-right text-white/75">
                      {revisionPolicy.contentUploadLimit} items included
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-white">Extra content</td>
                    <td className="px-4 sm:px-6 py-4 text-right text-[#00b8ff]">
                      ${revisionPolicy.extraContentUsdPerBatch.toLocaleString("en-US")} per batch of{" "}
                      {revisionPolicy.extraContentItemsPerBatch} items (
                      {revisionPolicy.extraContentPointsPerBatch} pt/batch)
                    </td>
                  </tr>
                </tbody>
              </table>
            }
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-12 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none"
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

        <p className="text-center text-white/40 text-xs mt-8 max-w-xl mx-auto">
          USD. Line-item prices follow points × ${POINT_USD}; modifiers compound on subtotals when you apply this
          rubric in proposals.
        </p>
      </div>
    </div>
  )
}

function RubricSection({
  index,
  title,
  gradient,
  table,
}: {
  index: number
  title: string
  gradient: string
  table: ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      className="rounded-2xl bg-gradient-to-r p-[1px] from-[#0021a7]/80 to-[#00b8ff]/80"
    >
      <div className="rounded-2xl bg-black/85 backdrop-blur-xl overflow-hidden">
        <div className={`px-4 sm:px-6 py-4 bg-gradient-to-r ${gradient} bg-opacity-30 border-b border-white/10`}>
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <div className="overflow-x-auto">{table}</div>
      </div>
    </motion.section>
  )
}
