/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/sabspl-admin/src/**/*.{html,ts}',
    './libs/shared/src/lib/**/*.{html,ts}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',    // Your primary color
        secondary: '#2ecc71',  // Your secondary color
        accent: '#f39c12',
        txtColor: '#e5e9eb',
        txtDarkColor: '#211827'
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
}

