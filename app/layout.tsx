import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import MainNavigation from "@/components/layout/main-navigation"
import SiteFooter from "@/components/layout/site-footer"
import { cn } from "@/lib/utils"
import LoadingScreen from "@/components/layout/loading-screen"
import { betelgeuse, raleway, deltha } from "@/lib/fonts"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Tony Tech Insights",
  description: "Technology Transformation Initiative",
  icons: {
    icon: '/images/logotonywhite.png',
    shortcut: '/images/logotonywhite.png',
    apple: '/images/logotonywhite.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/logotonywhite.png',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${betelgeuse.variable} ${raleway.variable} ${deltha.variable}`}>
      <body className={cn(
        "min-h-screen antialiased bg-black text-white",
        raleway.className
      )} suppressHydrationWarning>
        <LoadingScreen />
        <MainNavigation />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

