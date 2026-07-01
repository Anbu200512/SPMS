/** @type {import('tailwindcss').Config} */
import { THEME } from './src/utils/theme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: THEME.colors.primary,
        secondary: THEME.colors.secondary,
        accent: THEME.colors.accent,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
