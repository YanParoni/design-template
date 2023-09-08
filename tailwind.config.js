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
        'bkg': "rgb(var(--color-bkg) / <alpha-value>)",
        'bkg-chat': "rgb(var(--color-bkg-chat) / <alpha-value>)",
        'primary-color': "hsl(var(--primary-color) / <alpha-value>)",
        'secondary-color': "hsl(var(--secondary-color) / <alpha-value>)",
        'shadow': "rgb(var(--color-shadow) / <alpha-value>)",
        'transparent': 'rgba(var(--transparent)) / <alpha-value>'
      }
    },
  },
  plugins: [],
}

