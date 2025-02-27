"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Client logos with real brand logos
const clientLogos = [
  {
    name: "Amazon",
    logo: "/images/clients/amazon.svg", 
  },
  {
    name: "MINI",
    logo: "/images/clients/mini.svg",
  },
  {
    name: "Cadbury",
    logo: "/images/clients/cadbury.svg",
  },
  {
    name: "Standard Chartered",
    logo: "/images/clients/standard-chartered.svg",
  },
  {
    name: "Transport for London",
    logo: "/images/clients/tfl.svg",
  },
  {
    name: "Singapore Airlines",
    logo: "/images/clients/singapore-airlines.svg",
  },
  {
    name: "Müller",
    logo: "/images/clients/muller.svg",
  },
  {
    name: "KFC",
    logo: "/images/clients/kfc.svg",
  },
]

const ClientsSection = () => {
  return (
    <section className="relative py-24 bg-black">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-slate-950/90" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent uppercase tracking-wider">
              Our Trusted Partners
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Collaborating with industry leaders to deliver exceptional solutions that drive innovation and growth.
            </p>
          </motion.div>
        </div>

        {/* Client Logo Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 max-w-5xl mx-auto"
        >
          {clientLogos.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "bg-gray-200 rounded-lg p-7 flex items-center justify-center",
                "transition-all duration-300 ease-in-out",
                "hover:bg-gradient-to-br hover:from-[#00b8ff]/90 hover:to-[#0021a7]/80",
                "border border-gray-300",
                "group shadow-md hover:shadow-[#00b8ff]/30",
                "relative overflow-hidden"
              )}
            >              
              <div className="relative w-full aspect-[3/2] transition-transform duration-300 ease-in-out group-hover:scale-110">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain filter grayscale group-hover:filter-none opacity-75 group-hover:opacity-100 transition-all duration-300"
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ClientsSection 