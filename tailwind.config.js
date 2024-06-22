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
        'sm': '590px', // 640px - 100px
        'md': '718px', // 768px - 100px
        'lg': '974px', // 1024px - 100px
        'xl': '1230px', // 1280px - 100px
        '2xl': '1486px', // 1536px - 100px
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
        '8xl': '6rem',
        // Add or customize other sizes as needed
      },
      maxWidth: {
        'xs': '20rem',       // 320px
        'sm': '24rem',       // 384px
        'md': '28rem',       // 448px
        'lg': '64rem',       // 1024px
        'xl': '80rem',       // 1280px
        '2xl': '96rem',      // 1536px
        // Custom sizes
        'screen-sm': '590px',
        'screen-md': '718px',
        'screen-lg': '974px',
        'screen-xl': '1230px',
        'screen-2xl': '1486px',
      },
    },
  },
  darkMode: 'class', // or 'media' for automatic switching based on user's system settings
  plugins: [],
};
