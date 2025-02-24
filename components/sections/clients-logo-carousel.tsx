"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

const clientLogos = [
  {
    name: "Mai Phu Hung",
    logo: "/images/header.png",
  },
  {
    name: "Kin Living",
    logo: "/images/header.png",
  },
  {
    name: "Fitzone",
    logo: "/images/header.png",
  },
  {
    name: "DFW",
    logo: "/images/header.png",
  },
  {
    name: "Iprotect",
    logo: "/images/header.png",
  },
  {
    name: "Mobihome",
    logo: "/images/header.png",
  },
]

const ClientsLogoCarousel = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              Our Clients
            </h2>
            <p className="text-lg text-white/70">We're proud to partner with innovative businesses including:</p>
          </motion.div>
        </div>

        {/* Logos Carousel */}
        <div className="relative mx-auto max-w-[1400px]">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll">
              {/* We create 4 sets for smoother looping */}
              {[0, 1, 2, 3].map((setIndex) => (
                <div key={setIndex} className="flex shrink-0 items-center py-8">
                  {clientLogos.map((client) => (
                    <div
                      key={`${client.name}-${setIndex}`}
                      className={cn(
                        "w-48 h-24 mx-8",
                        "rounded-xl border border-white/10 bg-white/5",
                        "flex items-center justify-center",
                        "transition-all duration-300 hover:border-[#00b8ff]/30 hover:bg-white/10",
                        "hover:scale-105 overflow-hidden",
                      )}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientsLogoCarousel 