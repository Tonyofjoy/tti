"use client"

import Image from "next/image"

const Logo = () => {
  return (
    <div className="relative w-10 h-10">
      <Image
        src="/images/logotonywhite.png"
        alt="Tony Tech Insights Logo"
        fill
        priority
        className="object-contain"
        onError={(e) => {
          console.error('Error loading logo:', e)
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}

export default Logo
  