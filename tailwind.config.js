/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#020510',
          DEFAULT: '#030817',
          900: '#06132D',
          800: '#0A1F48',
          700: '#112D69',
        },
        electric: {
          DEFAULT: '#286BFF',
          glow: '#3b82f6',
          bright: '#4f8cff',
          deep: '#1a50cc',
        },
        ice: {
          DEFAULT: '#8EBFFF',
          light: '#c8e2ff',
          pale: '#eaf4ff',
        },
        luminous: '#F5F8FF',
        silver: {
          DEFAULT: '#B8C7E4',
          light: '#D3DEEE',
          dark: '#8596B8',
        },
        blossom: {
          DEFAULT: '#F2A7D4',
          light: '#FBD2EB',
          deep: '#E27CB7',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Cinzel Decorative', 'Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-electric': 'radial-gradient(circle at center, rgba(40, 107, 255, 0.18) 0%, rgba(3, 8, 23, 0) 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'metallic-silver': 'linear-gradient(135deg, #F5F8FF 0%, #B8C7E4 35%, #8EBFFF 70%, #F5F8FF 100%)',
      },
      boxShadow: {
        'electric-glow': '0 0 35px -5px rgba(40, 107, 255, 0.45)',
        'electric-lg': '0 0 60px -10px rgba(40, 107, 255, 0.55)',
        'glass': '0 8px 32px 0 rgba(0, 8, 30, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-very-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
