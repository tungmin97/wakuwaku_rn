/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Nunito Sans'],
      },
      colors: {
        dark: '#222725ff',
        lavenderFloral: '#b892ffff',
        ghostWhite: '#f8f7ffff',
      },
    },
  },
  plugins: [],
};
