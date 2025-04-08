"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Client logos with real brand logos
const clientLogos = [
  {
    name: "Client 1",
    logo: "/Website_image/Website/Logo màu/Logo màu-01.png", 
  },
  {
    name: "Client 2",
    logo: "/Website_image/Website/Logo màu/Logo màu-02.png",
  },
  {
    name: "Client 3",
    logo: "/Website_image/Website/Logo màu/Logo màu-03.png",
  },
  {
    name: "Client 4",
    logo: "/Website_image/Website/Logo màu/Logo màu-04.png",
  },
  {
    name: "Client 5",
    logo: "/Website_image/Website/Logo màu/Logo màu-05.png",
  },
  {
    name: "Client 6",
    logo: "/Website_image/Website/Logo màu/Logo màu-06.png",
  },
  {
    name: "Client 7",
    logo: "/Website_image/Website/Logo màu/Logo màu-07.png",
  },
  {
    name: "KFC",
    logo: "/Website_image/Website/Logo màu/Logo màu-15.png",
  },
]

const ClientsSection = () => {
  return (
    <section className="relative py-24 bg-black">
      <div className="relative container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent text-center">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto text-center">
            Collaborating with industry leaders to deliver exceptional solutions.
          </p>
        </motion.div>
      </div>
      
      {/* Infinite scrolling marquee */}
      <div className="relative flex flex-col gap-10 overflow-hidden">
        {/* First row - left to right */}
        <div className="flex animate-marquee whitespace-nowrap">
          {clientLogos.concat(clientLogos).map((client, index) => (
            <motion.div
              key={`row1-${index}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="mx-8 py-6"
            >
              <div className="w-48 h-24 relative bg-white/10 hover:bg-white/20 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:scale-110">
                <Image src={client.logo} alt={client.name} fill className="object-contain filter-none" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Second row - right to left */}
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {clientLogos.concat(clientLogos).reverse().map((client, index) => (
            <motion.div
              key={`row2-${index}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="mx-8 py-6"
            >
              <div className="w-48 h-24 relative bg-white/10 hover:bg-white/20 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:scale-110">
                <Image src={client.logo} alt={client.name} fill className="object-contain filter-none" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Third row - left to right (slower) */}
        <div className="flex animate-marquee-slow whitespace-nowrap">
          {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
            <motion.div
              key={`row3-${index}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="mx-8 py-6"
            >
              <div className="w-48 h-24 relative bg-white/10 hover:bg-white/20 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:scale-110">
                <Image src={client.logo} alt={client.name} fill className="object-contain filter-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 35s linear infinite;
        }
      `}</style>
    </section>
  )
}

export default ClientsSection 