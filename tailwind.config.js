/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",
  'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
  'node_modules/flowbite/**/*.{js,jsx,ts,tsx,vue}'],
  content: [
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx,vue}',
    "./src/**/*.{html,js,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

