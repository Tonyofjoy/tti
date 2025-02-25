"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { navigationData } from "@/lib/navigation-data"

interface MultiLevelDropdownProps {
  title: string
  items: Array<{
    name: string;
    subItems?: Array<{ name: string; path: string }>;
    heading?: string;
    links?: Array<{ name: string; path: string }>;
  }>
  isActive: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function MultiLevelDropdown({ title, items, isActive, isOpen, onOpenChange }: MultiLevelDropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      <button
        className={cn(
          "relative py-2 text-sm font-medium text-white/70 hover:text-white transition-colors",
          isActive && "text-white"
        )}
      >
        {title}
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00b8ff] to-[#0021a7]"
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 pt-2">
          <div className="w-[480px] grid grid-cols-2 gap-4 rounded-lg bg-black/95 backdrop-blur-sm border border-white/10 p-4">
            {items.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-sm font-semibold text-white">{section.name}</h3>
                <div className="space-y-1">
                  {section.subItems?.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

