"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import SpaceshipModel from "@/components/3d/spaceship-model"
import AnimatedButton from "@/components/ui/animated-button"
import Image from "next/image"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video ref={videoRef} autoPlay muted loop playsInline className="h-full w-full object-cover">
          <source src="/videos/tech-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0021a7]/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto grid min-h-screen grid-cols-1 items-center gap-12 px-4 pt-20 md:pt-0 lg:grid-cols-2">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h1 className="bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-6xl font-bold text-transparent sm:text-7xl">
            Innovating for
            <br />
            Limitless Growth
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl lg:max-w-none mx-auto lg:mx-0">
            We drive business growth through cutting-edge technology solutions
          </p>

          {/* CTA Button */}
          <div className="mt-8 flex justify-center lg:justify-start">
            <AnimatedButton />
          </div>
        </motion.div>

        {/* 3D Spaceship */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] -mt-20 lg:mt-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <SpaceshipModel />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

