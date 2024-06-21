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
        dosis: ['dosis', 'sans-serif']
        
      },
      screens: {
        'sm': '540px', // 640px - 100px
        'md': '668px', // 768px - 100px
        'lg': '924px', // 1024px - 100px
        'xl': '1180px', // 1280px - 100px
        '2xl': '1436px', // 1536px - 100px
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'tiny': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
        '8x1': '6rem',
        // Add or customize other sizes as needed
      },
  
    },
  },
  darkMode: 'class', // or 'media' for automatic switching based on user's system settings
  plugins: [],
};