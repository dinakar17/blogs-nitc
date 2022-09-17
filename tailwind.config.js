/** @type {import('tailwindcss').Config} */
module.exports = {
  // This configuration implies that a class called dark will be added to the <html> tag.
  // Once this class is active, your dark:{class} classes will become active.
  darkMode: 'class',
  // change default dark bg color to gray
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      default: ['"Inter"', "sans-serif"],
      opensans: ['"Open Sans"', "sans-serif"],
      logo: ['"Pacifico"', "cursive"]
    },
    extend: {
      colors: {
        primary: "#8035dd",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
