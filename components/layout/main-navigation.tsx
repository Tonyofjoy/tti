"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Logo from "@/components/ui/logo"
import NavDropdown from "../ui/nav-dropdown"
import MultiLevelDropdown from "@/components/ui/multi-level-dropdown"
import { navigationData } from "@/lib/navigation-data"

// Update the type definitions
type NavigationLink = {
  name: string;
  path: string;
}

type NavigationSection = {
  heading?: string;
  links?: NavigationLink[];
  subItems?: NavigationLink[];
}

type NavigationData = {
  [key: string]: NavigationSection[];
}

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

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-black/50 backdrop-blur-lg border-b border-white/10" : "bg-transparent",
      )}
    >
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="border-b border-white/10 bg-black/50 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
                Tony Tech Insights
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8" onMouseLeave={() => setActiveDropdown(null)}>
              <Link
                href="/"
                className={cn(
                  "relative py-2 text-sm font-medium text-white/70 hover:text-white transition-colors",
                  pathname === "/" && "text-white",
                )}
                onMouseEnter={() => setActiveDropdown(null)}
              >
                Home
                {pathname === "/" && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00b8ff] to-[#0021a7]"
                  />
                )}
              </Link>

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
                href="/contact"
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg",
                  "bg-gradient-to-r from-[#00b8ff] to-[#0021a7]",
                  "hover:opacity-90 transition-opacity",
                )}
                onMouseEnter={() => setActiveDropdown(null)}
              >
                Get in Touch
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-white"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 md:hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-4">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "py-2 text-lg font-medium text-white/70 hover:text-white transition-colors",
                      pathname === "/" && "text-white",
                    )}
                  >
                    Home
                  </Link>

                  {/* Mobile Dropdowns */}
                  {Object.entries(navigationData as NavigationData).map(([key, items]) => (
                    <div key={key} className="border-t border-white/10 pt-4">
                      <h3 className="text-lg font-medium text-white mb-2 capitalize">{key}</h3>
                      {items.map((section, idx) => (
                        <div key={idx} className="ml-4 mb-4">
                          {section.heading && (
                            <h4 className="text-sm font-semibold text-white/40 mb-2">{section.heading}</h4>
                          )}
                          <div className="flex flex-col gap-2">
                            {(section.links || section.subItems || []).map((item) => (
                              <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white/70 hover:text-white transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}

                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "py-2 text-lg font-medium text-white/70 hover:text-white transition-colors",
                      pathname === "/about" && "text-white",
                    )}
                  >
                    About
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "py-3 text-lg font-medium text-center rounded-lg",
                      "bg-gradient-to-r from-[#00b8ff] to-[#0021a7]",
                      "hover:opacity-90 transition-opacity",
                    )}
                  >
                    Get in Touch
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

