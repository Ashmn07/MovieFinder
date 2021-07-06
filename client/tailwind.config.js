const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  purge:[],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{ 
        sans: ['Comic Sans', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat'],
        roboto:['Roboto'],
        kaushan:['Kaushan Script']
      },
      colors:{
        bgGray:"#141414",
        bgButton:'rgba(51, 51, 51, 0.5)',
        textImage:'#777',
        // fade:'rgba(37, 37, 37, 0.6)'
      },
      boxShadow:{
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.55)',
        'card':'4px 4px 10px rgb(0 0 0 / 50%)'
      },
    },
  },
  variants: {
    extend: {
      listStyleType: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'), 
    require('tailwind-scrollbar-hide')
  ],
}
