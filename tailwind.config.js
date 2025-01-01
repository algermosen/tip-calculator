/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: 'hsl(172, 67%, 45%)',
          dark: 'hsl(183, 100%, 15%)',
        },
        'secondary': {
          100: 'hsl(189, 41%, 97%)',
          light: 'hsl(185, 41%, 84%)',
          DEFAULT: 'hsl(184, 14%, 56%)',
          dark: 'hsl(186, 14%, 43%)',
        }
      }
    },
  },
  plugins: [],
}

