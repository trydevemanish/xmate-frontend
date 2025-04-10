/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", 'sans-serif'],
        yatraone: ["Yatra One", 'system-ui'],
        cabinsketch : [ "Cabin Sketch", 'sans-serif']
      },
    },
  },
  plugins: [],
};