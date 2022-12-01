/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Nunito Sans'],
        title: ['Paytone One'],
      },
      colors: {
        dark: '#222725',
        lavenderFloral: '#B892FF',
        ghostWhite: '#F8F7FF',
        platinum: '#E6E6E6',
        eerieBlack: '#1A1A1A',
        maxRed: '#E50813',
        darkGray: '#6A6A6A',
      },
    },
  },
  plugins: [],
};
