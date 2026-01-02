import {colors, spacing} from './src/assets/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors,
    spacing
  },
  plugins: [],
  prefix: '',
}
