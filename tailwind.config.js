/** @type {import('tailwindcss').Config} */
module.exports = {
  // This configuration implies that a class called dark will be added to the <html> tag.
  // Once this class is active, your dark:{class} classes will become active.
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
