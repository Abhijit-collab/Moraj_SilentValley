/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B2447', // Deep navy
          light: '#19376D',   // Medium navy
          dark: '#04152D',    // Darker navy
        },
        secondary: {
          DEFAULT: '#576CBC', // Vibrant blue
          light: '#A5D7E8',   // Light blue
          dark: '#2D3F8A',    // Deep blue
        },
        accent: {
          DEFAULT: '#FFA41B', // Vibrant orange
          light: '#FFB74D',   // Light orange
          dark: '#E67E00',    // Deep orange
        },
      },
      animation: {
        'scroll-down': 'scroll-down 2s ease-in-out infinite',
      },
      keyframes: {
        'scroll-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
    },
  },
  plugins: [],
};