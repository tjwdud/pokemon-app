const percentageWidth = require('tailwindcss-percentage-width'); // load the plugin

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        backgroundColor: '#CAEEC4',
        blackRgba: 'rgba(196, 196, 196, 0.5)',
      },
      backgroundImage: {
        bgImg: "url('/assets/img/gameBackground.png')",
      },
      keyframes: {
        vibration: {
          from: {
            transform: 'rotate(1deg)',
          },
          to: {
            transform: 'rotate(-1deg)',
          },
        },
      },
      animation: {
        vibration: 'vibration .1s 10',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [percentageWidth, require('tailwind-scrollbar-hide')],
};
