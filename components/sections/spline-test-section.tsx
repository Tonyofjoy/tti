"use client"

import { motion } from "framer-motion"
import Spline from '@splinetool/react-spline'
import { useEffect } from 'react'

export default function SplineTestSection() {
  useEffect(() => {
    // Additional runtime cleanup
    const removeWatermark = () => {
      const watermarks = document.querySelectorAll('[data-spline-uiblock], .spline-watermark, #spline-watermark');
      watermarks.forEach(watermark => {
        if (watermark instanceof HTMLElement) {
          watermark.style.display = 'none';
        }
      });
    };

    // Run initially and set up an observer for dynamic content
    removeWatermark();
    const observer = new MutationObserver(removeWatermark);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden [&_[data-spline-uiblock]]:!hidden [&_canvas+div]:!hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00b8ff] to-[#0021a7] bg-clip-text text-transparent">
              3D Model Showcase
            </h2>
            <p className="text-lg text-white/70">
              Interactive 3D model powered by Spline
            </p>
          </motion.div>
        </div>

        {/* Spline Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[600px] w-full rounded-xl border border-white/10 bg-white/5 overflow-hidden"
        >
          <Spline
            scene="https://prod.spline.design/Xt0PV9olFJEaQEQ2/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  )
} 