"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Star,
  LayoutGrid,
  Megaphone,
  Handshake,
  FileText,
  Calculator,
} from "lucide-react"

type BookingHubItem = {
  href: string
  title: string
  description: string
  badge?: string
  icon: React.ReactNode
  borderClass: string
  iconWrapClass: string
  /** When false, card is greyed out and not a link */
  supported?: boolean
}

const secondaryBookingLinks: BookingHubItem[] = [
  {
    href: "/booking/point-based-pricing",
    title: "Point-based scope rubric",
    description: "$50 per scope point — pages, components, features, modifiers, and revision rules.",
    badge: "Rubric",
    icon: <Calculator className="h-5 w-5" />,
    borderClass: "from-sky-500/50 to-blue-800/50",
    iconWrapClass: "bg-sky-500/20 text-sky-200",
    supported: true,
  },
  {
    href: "/booking/premium-web-pricing-table",
    title: "Premium pricing table",
    description: "Line-item rates for premium web work before you open the builder.",
    badge: "Reference",
    icon: <LayoutGrid className="h-5 w-5" />,
    borderClass: "from-slate-500/60 to-slate-600/60",
    iconWrapClass: "bg-slate-500/20 text-slate-200",
    supported: true,
  },
  {
    href: "/booking/marketing-social-and-seo",
    title: "Marketing, social & SEO",
    description: "Packages for growth, social, and search — compare tiers on one page.",
    badge: "Marketing",
    icon: <Megaphone className="h-5 w-5" />,
    borderClass: "from-zinc-600/40 to-zinc-700/40",
    iconWrapClass: "bg-zinc-600/30 text-zinc-400",
    supported: false,
  },
  {
    href: "/booking/reseller",
    title: "Reseller & partners",
    description: "Partner pricing and white-label options for agencies and resellers.",
    badge: "Partners",
    icon: <Handshake className="h-5 w-5" />,
    borderClass: "from-emerald-600/50 to-cyan-700/50",
    iconWrapClass: "bg-emerald-500/20 text-emerald-200",
    supported: true,
  },
]

const DEPRECATED_TAG = "No longer supported"

function HubLinkCard({ item, index }: { item: BookingHubItem; index: number }) {
  const supported = item.supported !== false
  const inner = (
    <div
      className={`flex h-full flex-col rounded-2xl bg-black/80 backdrop-blur-xl p-5 sm:p-6 ${
        supported ? "" : "opacity-[0.72] grayscale"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className={`rounded-lg p-2 ${item.iconWrapClass}`}>{item.icon}</div>
        <div className="flex flex-wrap justify-end gap-1">
          {!supported && (
            <span className="rounded-full border border-zinc-500/50 bg-zinc-800/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-zinc-300">
              {DEPRECATED_TAG}
            </span>
          )}
          {supported && item.badge && (
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/55">
              {item.badge}
            </span>
          )}
        </div>
      </div>
      <h3
        className={`text-lg font-bold transition-colors ${
          supported ? "text-white group-hover:text-[#00b8ff]" : "text-zinc-400"
        }`}
      >
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{item.description}</p>
      {supported ? (
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#00b8ff]">
          Open
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      ) : (
        <span className="mt-4 text-xs font-medium text-zinc-500">Unavailable — use premium web quote or contact us.</span>
      )}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index }}
    >
      {supported ? (
        <Link
          href={item.href}
          className={`group block h-full rounded-2xl bg-gradient-to-br p-[1px] ${item.borderClass} transition-opacity hover:opacity-95`}
        >
          {inner}
        </Link>
      ) : (
        <div
          className={`block h-full cursor-not-allowed rounded-2xl bg-gradient-to-br p-[1px] ${item.borderClass}`}
          aria-disabled
        >
          {inner}
        </div>
      )}
    </motion.div>
  )
}

export default function QuotesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 pt-16 sm:pt-24 pb-12 px-3 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0021a7]/10 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#00b8ff]/5 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-[#0021a7]/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00b8ff]/90 mb-2">
            Quotes & booking hub
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent px-2">
            Estimates & requests
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto px-4">
            Premium web quotes, rate tables, and partner pricing. Legacy flows are retired below.
          </p>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          aria-label="Booking pages"
        >
          {[
            { href: "/booking/client-project-quote-7f8a9b2c", label: "Premium web quote", supported: true },
            { href: "/booking/point-based-pricing", label: "Scope rubric", supported: true },
            { href: "/booking/premium-web-pricing-table", label: "Premium rates", supported: true },
            { href: "/booking/marketing-social-and-seo", label: "Marketing & SEO", supported: false },
            { href: "/booking/reseller", label: "Reseller", supported: true },
          ].map((l) =>
            l.supported ? (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/85 hover:border-[#00b8ff]/50 hover:bg-[#00b8ff]/10 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <span
                key={l.href}
                title={DEPRECATED_TAG}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-600/50 bg-zinc-800/60 px-3 py-1.5 text-xs sm:text-sm text-zinc-400 cursor-not-allowed grayscale"
              >
                {l.label}
                <span className="rounded bg-zinc-700 px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wide text-zinc-300">
                  Retired
                </span>
              </span>
            )
          )}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Website project quotes</h2>
            <p className="text-xs text-white/45 max-w-md">
              Modular calculators — instant totals, then submit your details.
            </p>
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0">
              <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 px-3 py-1 text-xs font-medium text-white">
                <Star className="h-3.5 w-3.5" />
                Popular
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff] h-full">
              <div className="flex h-full flex-col rounded-2xl bg-black/80 backdrop-blur-xl p-6 sm:p-8 pt-8 sm:pt-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-[#00b8ff]/20 p-2">
                    <Star className="h-6 w-6 text-[#00b8ff]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Premium web development</h3>
                    <p className="text-sm font-medium text-[#00b8ff]">Custom scope & line items</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-2xl font-bold text-white">
                    From <span className="text-[#00b8ff]">$2,500</span>
                    <span className="text-base font-normal text-white/50"> project</span>
                  </p>
                  <p className="mt-2 text-sm text-white/65">
                    Full modular quote — pair with the rate table for transparency.
                  </p>
                </div>
                <ul className="mb-6 flex-1 space-y-2.5">
                  {[
                    "Brand, pages, 3D, tours, multilingual",
                    "Two-step flow: scope → your contact details",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-white/80">
                      <Check className="h-4 w-4 shrink-0 text-[#00b8ff]" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-2 sm:flex-row">
                  <Link
                    href="/booking/client-project-quote-7f8a9b2c"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] py-3.5 text-base font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-[#00b8ff]/20 group"
                  >
                    Open premium quote
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/booking/premium-web-pricing-table"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/20 py-3.5 text-sm font-semibold text-white/90 hover:bg-white/5"
                  >
                    <FileText className="h-4 w-4" />
                    Rate table
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">More estimates & tools</h2>
          <p className="text-sm text-white/50 mb-6">Same design language — jump in when you need these flows.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-16 sm:mb-20">
          {secondaryBookingLinks.map((item, i) => (
            <HubLinkCard key={item.href} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="rounded-2xl bg-gradient-to-r p-[1px] from-[#0021a7] to-[#00b8ff]">
            <div className="rounded-2xl bg-black/80 backdrop-blur-xl p-6 sm:p-8">
              <h3 className="text-center text-2xl font-bold text-white mb-3">Need help choosing?</h3>
              <p className="text-center text-sm text-white/65 max-w-2xl mx-auto mb-8">
                You do not need a perfect brief first. Use whichever entry point feels easiest — you can always move
                to a call, a quote, or the rubric later.
              </p>

              <ul className="max-w-2xl mx-auto space-y-5 text-sm text-white/85">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00b8ff]" aria-hidden />
                  <div>
                    <p className="font-semibold text-white">You want a live number without a meeting</p>
                    <p className="mt-1 text-white/70">
                      Turn services on and off in the{" "}
                      <Link
                        href="/booking/client-project-quote-7f8a9b2c"
                        className="text-[#00b8ff] hover:underline font-medium"
                      >
                        quote builder
                      </Link>{" "}
                      — the estimate updates as you go. Nothing is sent until you choose to submit.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00b8ff]" aria-hidden />
                  <div>
                    <p className="font-semibold text-white">You think in pages, modules, and add-ons</p>
                    <p className="mt-1 text-white/70">
                      Skim the{" "}
                      <Link href="/booking/point-based-pricing" className="text-[#00b8ff] hover:underline font-medium">
                        scope rubric
                      </Link>{" "}
                      to see how we translate scope into points and ballpark dollars before you touch the builder.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00b8ff]" aria-hidden />
                  <div>
                    <p className="font-semibold text-white">You would rather talk it through</p>
                    <p className="mt-1 text-white/70">
                      Tell us goals, timeline, and budget band — we will suggest a sensible path and next steps. No
                      pressure to pick a product name up front.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 text-center">
                <p className="mb-4 text-sm text-white/55">Want a human to sanity-check your plan?</p>
                <Link
                  href="/about/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Contact us — we will help you choose
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
