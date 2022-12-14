/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs", "./views/partials/*.ejs"],
  theme: {    
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        montserrat: ["Montserrat Alternates", "sans-serif"],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'pinky': '#FA95C1',
        'lightblue': '#42BAF2',
        'lightpeach': '#FBD8AB',
        'lavender': '#AC97EB',
        'easteregg': '#89F875',
        'darkskyblue': '#649FEE',
        'lightkhaki': '#E6FBA6',
        'perrywinkle': '#94A1F4',
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ],
        'neo-sm': '4px 4px 0 rgba(0, 0, 0, 1)',
        'neo-md': '6px 6px 0 rgba(0, 0, 0, 1)',
        'neo-lg': '12px 12px 0 rgba(0, 0, 0, 1)',
        'neo-brown': '4px 4px 0 hsl(35, 52%, 34%)',
        'neo-green': '4px 4px 0 hsl(35, 72%, 17%)',
        'neo-pink': '4px 4px 0 hsl(306, 71%, 37%)',
        'neo-olive': '4px 4px 0 hsl(78, 35%, 27%)',
        'neo-purple': '4px 4px 0 hsl(258, 100%, 68%)',
        'neo-blue': '4px 4px 0 hsl(172, 100%, 46%)',
        'neo-tan': '4px 4px 0 hsl(16, 92%, 38%)',
        'neo-xsm': '1px 1px 0px hsl(0, 100%, 0%)',
        'neo-white-xsm': '1px 1px 0px hsl(0, 100%, 100%)',
        
      },
      boxShadow: {
        'neo-sm': '4px 4px 0 0 rgba(0, 0, 0, 1)',
        'neo-md': '6px 6px 0 0 rgba(0, 0, 0, 1)',
        'neo-lg': '12px 12px 0 0 rgba(0, 0, 0, 1)',
      },
      animation: {
        wiggle1: 'wiggle1 1.7s ease-in-out infinite',
        wiggle2: 'wiggle2 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle1: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        wiggle2: {
          '0%': { transform: 'rotate(10deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      },
      textFillColor: theme => theme('borderColor'),
      textStrokeColor: theme => theme('borderColor'),
      textStrokeWidth: theme => theme('borderWidth'),
      paintOrder: {
        'fsm': { paintOrder: 'fill stroke markers' },
        'fms': { paintOrder: 'fill markers stroke' },
        'sfm': { paintOrder: 'stroke fill markers' },
        'smf': { paintOrder: 'stroke markers fill' },
        'mfs': { paintOrder: 'markers fill stroke' },
        'msf': { paintOrder: 'markers stroke fill' },
      },
    },
  },
  plugins: [
    require('tailwindcss-text-fill-stroke'),
  ],
}
