/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        red: {
          600: '#FF0000',
          700: '#CC0000',
        },
        'brand-white': '#FFFFFF',
        'brand-black': '#000000',
        'brand-red': '#FF0000',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Brush Script MT', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  corePlugins: {
    preflight: true,
  },
} 