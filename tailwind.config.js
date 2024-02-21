/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',    // Your primary color
        secondary: '#2ecc71',  // Your secondary color
        accent: '#f39c12',
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/forms')
  ],
}

