/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        betelgeuse: ['var(--font-betelgeuse)'],
        raleway: ['var(--font-raleway)'],
        deltha: ['var(--font-deltha)'],
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};