/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-bg' : '#FFFFFF',
        'dark-bg' : '#111827',// '#162B44',
        'margin-light' : '#E66BBC',
        'margin-dark' : '#2cf4ab',
        'link-dark' : '#00d8ff',
      },
    },
  },
  plugins: [],
}