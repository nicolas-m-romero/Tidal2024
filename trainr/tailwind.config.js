/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary100: '#C21D03',  // Define your custom colors
        primary200: '#FD5732',
        primary300: "#FFB787",
        accent100: "#393939",
        accent200: "#BEBEBE",
        text100: "#231121",
        text200: "#4B4848",
        bg100: "#FBFBFB",
        bg200: "#F1F1F1",
        bg300: "#C8C8C8"
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        h1: ['Bree Serif', 'serif'],
        h2: ['Fugaz One', 'cursive']
      }
    },
  },
  plugins: [],
}

