"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function AnimatedButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative mt-8 inline-flex items-center justify-center",
        "rounded-lg px-8 py-4 bg-black border border-[#0021a7]/30",
      )}
    >
      {/* Button content */}
      <span className="relative z-10 text-lg font-semibold text-white">Start Your Journey</span>

      {/* Border element for flowing gradient */}
      <span
        className={cn(
          "absolute inset-0 rounded-lg pointer-events-none",
          "border-2 border-transparent",
          "opacity-40 group-hover:opacity-100",
          "group-hover:animate-flowBorder",
        )}
        style={{
          background: "linear-gradient(90deg, #000000, #0021a7, #000000) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "exclude",
          maskComposite: "exclude",
        }}
      />
    </motion.button>
  )
} 