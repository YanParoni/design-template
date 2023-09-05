/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  darkMode: false,
  theme: {
    extend: {
      colors:{
        'bkg': "hsl(var(--color-bkg) / <alpha-value>)",
        'primary-color': "hsl(var(--primary-color) / <alpha-value>)",
        'secondary-color': "hsl(var(--secondary-color) / <alpha-value>)",
      }
    },
  },
  plugins: [],
}

