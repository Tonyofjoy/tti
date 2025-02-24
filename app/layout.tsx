import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import MainNavigation from "@/components/layout/main-navigation"
import SiteFooter from "@/components/layout/site-footer"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/ui/theme-provider"
import LoadingScreen from "@/components/layout/loading-screen"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TTI",
  description: "Technology Transformation Initiative",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={cn("min-h-screen antialiased", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          suppressHydrationWarning
        >
          <LoadingScreen />
          <MainNavigation />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}

