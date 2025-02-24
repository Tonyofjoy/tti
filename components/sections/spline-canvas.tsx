"use client"

import { motion } from "framer-motion"
import Spline from '@splinetool/react-spline'

export default function SplineCanvas() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full h-full"
    >
      <Spline
        scene="https://prod.spline.design/Xt0PV9olFJEaQEQ2/scene.splinecode"
        className="w-full h-full"
      />
    </motion.div>
  )
} 