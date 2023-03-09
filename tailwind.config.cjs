/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.tsx'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        default: {
          primary: '#ffffff',
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto'],
      },
    },
  },
};
