"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Logo from "@/components/ui/logo"
import { navigationData } from "@/lib/navigation-data"

export default function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const renderNavigationItems = (section: typeof navigationData[keyof typeof navigationData][0], idx: number) => (
    <div key={idx} className="space-y-2">
      {/* Type guard to check if section has name property */}
      {'name' in section && section.name && (
        <h3 className="text-sm font-semibold text-white/40 px-3 mb-2">
          {section.name}
        </h3>
      )}
      {section.items.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </div>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <motion.nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <Logo />
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Tony Tech Insights
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {Object.entries(navigationData).map(([key, sections]) => (
              <div key={key} className="relative group">
                <button className="py-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="w-64 p-4 rounded-lg bg-black/95 backdrop-blur-sm border border-white/10">
                    {sections.map(renderNavigationItems)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 top-20 bottom-0 bg-black/95 backdrop-blur-sm lg:hidden overflow-y-auto"
            >
              <div className="container px-4 py-6">
                <div className="space-y-6">
                  {Object.entries(navigationData).map(([key, sections]) => (
                    <div key={key}>
                      <h3 className="text-lg font-semibold mb-3">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </h3>
                      <div className="space-y-6">
                        {sections.map(renderNavigationItems)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link
                    href="/about/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-3 text-center text-white font-medium rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#0021a7]"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}

