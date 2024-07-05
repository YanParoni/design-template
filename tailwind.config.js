/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/*.{png,svg}"
  ],
  theme: {
    extend: {
      colors: {
        'bkg': "rgb(31 25 36 / <alpha-value>)",
        'title': "rgb(255 255 255 / <alpha-value>)",
        'description': "rgb(171 150 183 / <alpha-value>)",
        'comp-description': "rgb(228 221 255 / <alpha-value>)",
        'comp-muted': "rgb(83 82 117 / <alpha-value>)",
        'secondary-bkg': "rgb(68 56 79 / <alpha-value>)",
        'secondary-comp': "rgb(73 61 85 / <alpha-value>)",
        'tertiary-bkg': "rgb(98 68 102)",
        'accent-theme': "rgb(221 0 218 / <alpha-value>)",
        'accent-theme-comp': "rgb(206 0 203 / <alpha-value>)",
        'accent-secondary': "rgb(0 221 248 / <alpha-value>)",
        'light-purple': 'rgb(74 69 79 / <alpha-value>)',
        'dark-background': "rgb(23 18 25 / <alpha-value>)",
        'hover': "rgb(122 0 170 / <alpha-value>)",
        'bkg-chat': "rgb(84 67 135 / <alpha-value>)",
        'primary-color': "hsl(0deg 0% 0% / <alpha-value>)",
        'secondary-color': "hsl(0deg 0% 16% / <alpha-value>)",
        'shadow': "rgb(51 65 85 / <alpha-value>)",
        'transparent': 'rgba(76 175 80 0 / <alpha-value>)',
        'shadow': "rgb(var(--color-shadow) / <alpha-value>)",

      },
      fontFamily: {
        cursive: "'Source Serif 4', serif",
        montserrat: "'Montserrat', sans-serif",
      },
      boxShadow: {
        'custom-inset': 'inset 0 0 1px 1px rgba(20,24,28,.125)',
          'light': 'inset 0 .1rem  rgba(255, 255, 255, .7)',
      },
    },
  },
  plugins: [],
}
