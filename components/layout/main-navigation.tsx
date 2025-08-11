"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Logo from "@/components/ui/logo"
import NavDropdown from "@/components/ui/nav-dropdown"
import MultiLevelDropdown from "@/components/ui/multi-level-dropdown"
import { navigationData } from "@/lib/navigation-data"

export default function MainNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu when window width exceeds lg breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // 1024px is the lg breakpoint in Tailwind
        setIsMobileMenuOpen(false)
      }
    }
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // When mobile menu opens, prevent body scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 z-[100] w-full transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent",
      )}
    >
      <nav className="container mx-auto px-4 h-20">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Company Name */}
          <Link href="/" className="flex items-center group" onMouseEnter={() => setActiveDropdown(null)}>
            <div className="transition-transform duration-300 group-hover:scale-110">
              <Logo />
            </div>
            <span className="ml-2 text-lg sm:text-xl md:text-2xl font-bold font-deltha bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Tony Tech Insights
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8" onMouseLeave={() => setActiveDropdown(null)}>
            <MultiLevelDropdown
              title="Services"
              items={navigationData.services}
              isActive={pathname.startsWith("/services")}
              isOpen={activeDropdown === "services"}
              onOpenChange={(open) => setActiveDropdown(open ? "services" : null)}
            />

            <NavDropdown
              title="Work"
              items={navigationData.work}
              isActive={pathname.startsWith("/work")}
              isOpen={activeDropdown === "work"}
              onOpenChange={(open) => setActiveDropdown(open ? "work" : null)}
            />

            <NavDropdown
              title="Resources"
              items={navigationData.resources}
              isActive={pathname.startsWith("/resources")}
              isOpen={activeDropdown === "resources"}
              onOpenChange={(open) => setActiveDropdown(open ? "resources" : null)}
            />

            <NavDropdown
              title="About"
              items={navigationData.about}
              isActive={pathname.startsWith("/about")}
              isOpen={activeDropdown === "about"}
              onOpenChange={(open) => setActiveDropdown(open ? "about" : null)}
            />

            <Link
              href="/quotes"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg",
                "bg-gradient-to-r from-[#00b8ff] to-[#0021a7]",
                "hover:opacity-90 transition-opacity",
              )}
              onMouseEnter={() => setActiveDropdown(null)}
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
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
              className="fixed inset-x-0 top-20 bottom-0 z-[99] bg-black/95 backdrop-blur-sm lg:hidden"
              style={{ 
                touchAction: "pan-y",
                position: "fixed",
                height: "calc(100vh - 5rem)"
              }}
            >
              <div 
                className="container h-full px-4 py-6 overflow-y-auto"
                style={{
                  scrollbarWidth: 'none', /* Firefox */
                  msOverflowStyle: 'none', /* IE and Edge */
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {/* Hide scrollbar for Chrome, Safari and Opera */}
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                <div className="space-y-6">
                  {Object.entries(navigationData).map(([key, sections]) => (
                    <div key={key}>
                      <h3 className="text-lg font-semibold mb-3">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </h3>
                      <div className="space-y-6">
                        {sections.map((section, idx) => (
                          <div key={idx} className="space-y-2">
                            {section.name && (
                              <h4 className="text-sm font-semibold text-white/40 px-3 mb-2">
                                {section.name}
                              </h4>
                            )}
                            {section.items.map((item) => (
                              <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        ))}
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
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

