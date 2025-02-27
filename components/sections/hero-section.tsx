"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import BrainModel from "@/components/3d/brain-model"
import AnimatedButton from "@/components/ui/animated-button"
import Image from "next/image"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video ref={videoRef} autoPlay muted loop playsInline className="h-full w-full object-cover">
          <source src="/videos/ai-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/50 to-indigo-900/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen w-full">
        {/* Text Content - Higher z-index */}
        <div className="container relative z-20 mx-auto flex flex-col items-center lg:items-start justify-center min-h-screen lg:min-h-0 lg:h-screen px-6 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left w-full lg:max-w-xl xl:max-w-2xl pt-8 lg:pt-0"
          >
            <h1 className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent leading-tight">
              <span className="inline-block">Empowering</span>{' '}
              <span className="inline-block">Business</span>{' '}
              <span className="inline-block">with</span>{' '}
              <span className="inline-block">AI</span>{' '}
              <span className="inline-block">Innovation</span>
            </h1>
            <p className="mt-3 md:mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0">
              Transforming industries through cutting-edge AI solutions and technology
            </p>

            {/* CTA Button */}
            <div className="mt-5 md:mt-8 flex justify-center lg:justify-start">
              <AnimatedButton href="#contact">Get In Touch</AnimatedButton>
            </div>
          </motion.div>
        </div>

        {/* 3D Brain - Different positioning based on screen size */}
        <div className="absolute z-10 w-full 
                       lg:w-1/2 lg:right-0 lg:top-1/2 lg:-translate-y-1/2
                       bottom-0 xs:bottom-10 sm:bottom-20
                       h-[250px] xs:h-[280px] sm:h-[320px] md:h-[350px] lg:h-[500px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <BrainModel />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

