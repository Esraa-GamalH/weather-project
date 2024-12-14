/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "orange": "#FB8500",
        "yellow": "#FFB703",
        "dark-blue": "#023047",
        "blue": "#2E6F95",
        "light-blue": "#8ECAE6"
      },
    },
  },
  plugins: [
    require('flowbite/plugin') // add flowbite library
  ],
}

