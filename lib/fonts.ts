import localFont from "next/font/local"
import { Raleway } from "next/font/google"

export const betelgeuse = localFont({
  src: "../public/font/betelguesse/Betelguesse.ttf",
  variable: "--font-betelgeuse"
})

export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

export const deltha = localFont({
  src: "../public/font/Deltha/Deltha.ttf",
  variable: "--font-deltha"
}) 