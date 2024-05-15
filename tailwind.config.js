/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT ({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      backgroundColor: {
        'darkbg': '#252B42',
        "lightbg": "#FAFAFA",
        "redish": "#E74040",
        "blcarou": "#02b8dd",
      },
      fontFamily: {
        monster: ['Montserrat', "sans-serif"]
      }
    },
    colors: {
      lightText: "#FFFFFF",
      darkText: "#252B42",
      lighterDark: "#737373",
      navBlue: "#23A6F0",
      btnGreen: "#2DC071",
      priceGray: "#BDBDBD",
      priceGreen: "#23856D",
      ratingY: "#F3CD03",
      cpurple: "#977DF4",
      clpink: "#FFE9EA",
      bluebg: "#2A7CC7",
    }
  },
  plugins: [],
});