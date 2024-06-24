/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bkg': "rgb(var(--color-bkg) / <alpha-value>)",
        'title': "rgb(var(--color-title) / <alpha-value>)",
        'subtitle': "rgb(var(--color-subtitle) / <alpha-value>)",
        'description': "rgb(var(--color-description) / <alpha-value>)",
        'accent-font': "rgb(var(--accent-font) / <alpha-value>)",
        'sub-info': "rgb(var(--sub-info) / <alpha-value>)",
        'accent-theme': "rgb(var(--accent-theme) / <alpha-value>)",
        'hover': "rgb(var(--hover) / <alpha-value>)",
        'bkg-chat': "rgb(var(--color-bkg-chat) / <alpha-value>)",
        'primary-color': "hsl(var(--primary-color) / <alpha-value>)",
        'secondary-color': "hsl(var(--secondary-color) / <alpha-value>)",
        'shadow': "rgb(var(--color-shadow) / <alpha-value>)",
        'transparent': 'rgba(var(--transparent)) / <alpha-value>)',
      },
      fontFamily: {
        cursive: "'Source Serif 4', serif",
        montserrat: "'Montserrat', sans-serif",
      },
    },
  },
  plugins: [],
}
