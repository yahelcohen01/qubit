import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // Your primary color
          light: '#93c5fd',
          dark: '#1d4ed8',
        },
        secondary: {
          DEFAULT: '#10b981', // Your secondary color
          light: '#6ee7b7',
          dark: '#047857',
        },
        tertiary: '#8b5cf6', // If you need a tertiary color
        test: '#f5f5f7', // Your background color
      },
      fontFamily: {
        michroma: ['Michroma', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
