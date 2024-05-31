/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000', // Set to black
        text: '#ffffff' // Ensure text is white
      },
      fontFamily: {
        dosis: ['dosis', 'sans-serif'] // Add Roboto to the font family
        
      }
    },
  },
  darkMode: 'class', // or 'media' for automatic switching based on user's system settings
  plugins: [],
};