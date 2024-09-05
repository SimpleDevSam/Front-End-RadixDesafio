/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#4B1C5B',
        'custom-red': '#EE3A1F',
        'custom-green': '#BAC31F'
      },
    },
  },
  plugins: [],
}

