/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
    "./public/*.{png,svg}"
  ],
  theme: {
    extend: {
      colors: {
        'bkg': "rgb(31 25 36 / <alpha-value>)",
        'bkg-accent': "rgb(125 101 137/ <alpha-value>) ",
        'modal-backdrop': "rgb( 116 91 133/<alpha-value>)", 
        'auth-bkg': "rgb(90 68 102/<alpha-value>)",
        'auth-primary': "rgb(231 203 237 /<alpha-value>)",
        'primary-border-button': "rgb(244 129 242 /<alpha-value>)",
        'label':"rgb(207 154 214/<alpha-value>)",
        'disabled-bkg': "rgb(135 122 147/<alpha-value>)",
        'disabled-border': "rgb(148 139 158/<alpha-value>)",
        'title': "rgb(255 255 255 / <alpha-value>)",
        'description': "rgb(188 167 201 / <alpha-value>)",
        'comp-description': "rgb(228 221 255 / <alpha-value>)",
        'comp-muted': "rgb(83 82 117 / <alpha-value>)",
        'secondary-bkg': "rgb(63 53 73 / <alpha-value>)",
        'secondary-comp': "rgb(73 61 85 / <alpha-value>)",
        'secondary-border':'rgb(88 74 102/ <alpha-value>)',
        'tertiary-bkg': "rgb(98 68 102)",
        'accent-theme': "rgb(221 0 218 / <alpha-value>)",
        'alt-accent': 'rgb(255 144 16/ <alpha-value>)',
        'accent-theme-comp': "rgb(206 0 203 / <alpha-value>)",
        'accent-secondary': "rgb(0 221 248 / <alpha-value>)",
        'dark-purple': 'rgb(101 94 107 / <alpha-value>)',
        'light-purple': 'rgb(241 221 255 / <alpha-value>)',
        'light-purple-hover': 'rgb(216 199 226 / <alpha-value>)',
        'dark-background': "rgb(23 18 25 / <alpha-value>)",
        'hover': "rgb(122 0 170 / <alpha-value>)",
        'bkg-chat': "rgb(84 67 135 / <alpha-value>)",
        'primary-color': "hsl(0deg 0% 0% / <alpha-value>)",
        'secondary-color': "hsl(0deg 0% 16% / <alpha-value>)",
        'shadow': "rgb(51 65 85 / <alpha-value>)",
        'transparent': 'rgba(76 175 80 0 / <alpha-value>)',

      },
      fontFamily: {
        cursive: "'Source Serif 4', serif",
        montserrat: "'Montserrat', sans-serif",
      },
      boxShadow: {
        'custom-inset': 'inset 0 0 1px 1px rgba(20,24,28,.125)',
        'light': 'inset 0 0.02rem  rgba(255, 255, 255, 1)',
      },
    },
  },
  plugins: [],
}
