"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import LoadingParticles from "@/components/3d/loading-particles"

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Fast-track loading to complete in ~0.5 seconds
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Remove delay after reaching 100%
          setLoading(false)
          return 100
        }
        // Increment by larger steps to reach 100% faster
        return Math.min(prev + 10, 100)
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }} // Speed up exit animation
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black to-[#0021a7]"
        >
          <div className="relative flex flex-col items-center">
            <div className="h-[400px] w-[400px]">
              <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <LoadingParticles progress={progress} />
              </Canvas>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }} // Speed up animation
              className="absolute bottom-16 flex flex-col items-center"
            >
              <div className="relative h-1 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00b8ff] to-[#0021a7]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }} // Speed up progress bar
                />
              </div>
              <p className="mt-4 font-mono text-sm text-white/50">Initializing {progress}%</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

