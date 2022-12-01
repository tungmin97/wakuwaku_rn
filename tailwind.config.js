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
        dark: '#222725ff',
        lavenderFloral: '#b892ffff',
        ghostWhite: '#f8f7ffff',
        platinum: '#E6E6E6',
        eerieBlack: '#1A1A1A',
        maxRed: '#E50813ff',
        gray: 'rgb(26, 26, 26)',
        darkGray: '#6a6a6a',
      },
    },
  },
  plugins: [],
};
