import localFont from "next/font/local"

export const betelgeuse = localFont({
  src: "../public/font/betelguesse/Betelguesse.ttf",
  variable: "--font-betelgeuse"
})

export const raleway = localFont({
  src: [
    {
      path: "../public/font/Raleway/Raleway-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../public/font/Raleway/Raleway-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-raleway"
})

export const deltha = localFont({
  src: "../public/font/Deltha/Deltha.ttf",
  variable: "--font-deltha"
}) 