/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"LINE Seed Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
