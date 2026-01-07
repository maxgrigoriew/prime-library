import {colors, spacing, screens} from './src/assets/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 0px 8px rgba(28, 41, 61, 0.05), 0px 2px 4px rgba(28, 41, 61, 0.06)',
      }
    },
    colors,
    spacing,
    screens
  },
  plugins: [],
  prefix: '',
}
