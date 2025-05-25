/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      keyframes: {
        'glow-slow-1': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(50px, 30px) scale(1.05)' },
          '50%': { transform: 'translate(0, 60px) scale(1)' },
          '75%': { transform: 'translate(-50px, 30px) scale(0.95)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        'glow-slow-2': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(-40px, -20px) scale(0.98)' },
          '50%': { transform: 'translate(-80px, 0) scale(1.02)' },
          '75%': { transform: 'translate(-40px, 20px) scale(1)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        'glow-slow-3': {
          '0%': { transform: 'translate(-50%, -50%) scale(1)' },
          '33%': { transform: 'translate(-45%, -55%) scale(1.03)' },
          '66%': { transform: 'translate(-55%, -45%) scale(0.97)' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)' },
        },
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'glow-slow-1': 'glow-slow-1 15s infinite ease-in-out',
        'glow-slow-2': 'glow-slow-2 18s infinite ease-in-out',
        'glow-slow-3': 'glow-slow-3 12s infinite ease-in-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}