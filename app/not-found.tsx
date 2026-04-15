import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page not found | Tony Tech Insights",
}

export default function NotFound() {
  return (
    <div className="relative min-h-[75vh] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 to-[#0021a7]/20" />
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-[#00b8ff]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#0021a7]/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-lg flex-col items-center text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#00b8ff]/90">Error 404</p>
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Page not found</h1>
        <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
          This URL does not exist or has moved. Use the menu above, or go home and try again.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[#00b8ff]/15 transition hover:opacity-95"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
