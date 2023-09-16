/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.js",
    ],
      theme: {
      extend: {
        fontFamily: {
          brand: ['Roboto Serif', 'serif'],
          //this is the font for the logo
          general: ['Open Sans', 'Helvetica'],
        },
        colors: {
          "light-mint": "#d7e9e6",
          "light-green": "#9cbb89",
          "primary-green": "#638262",
          "dark-green": "#416f5d",
          "light-pink": "#d5b1c8",
        },
      },
    },
    plugins: [],
  };