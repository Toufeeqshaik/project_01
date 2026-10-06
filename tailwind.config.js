/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00D26A',
          50: '#051a0e',
          100: '#0a351c',
          200: '#146a38',
          300: '#1e9e54',
          400: '#2ad470',
          500: '#00D26A',
          600: '#00b35a',
          700: '#009449',
          800: '#007538',
          900: '#005627',
        },
        secondary: {
          DEFAULT: '#0A0A0A',
          50: '#1a1a1a',
          100: '#2a2a2a',
          200: '#3a3a3a',
          300: '#4a4a4a',
          400: '#5a5a5a',
          500: '#6a6a6a',
          600: '#7a7a7a',
          700: '#8a8a8a',
          800: '#9a9a9a',
          900: '#0A0A0A',
        },
        success: '#00D26A',
        warning: '#FFC107',
        danger: '#FF5252',
        dark: {
          DEFAULT: '#0A0A0A',
          surface: '#1A1A1A',
          card: '#252525',
        },
        emerald: {
          DEFAULT: '#00D26A',
          dim: 'rgba(0, 210, 106, 0.15)',
          glow: 'rgba(0, 210, 106, 0.3)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(0, 210, 106, 0.2)' },
          '50%': { 'box-shadow': '0 0 30px rgba(0, 210, 106, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}

