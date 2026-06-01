/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'dm': ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        navy: '#1B3A8C',
        'navy-dark': '#0F2460',
        'navy-light': '#2A4FA8',
        gold: '#E8C44A',
        'gold-dark': '#C9A020',
        cream: '#F4F6FB',
        'cream-2': '#E8ECF5',
        ink: '#1A2240',
        'ink-sub': '#3A4260',
        'ink-pale': '#7A82A8',
      },
      animation: {
        'slide-right': 'slideRight 0.8s ease-in-out forwards',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'dots': 'dots 1.4s infinite',
      },
      keyframes: {
        slideRight: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120vw)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        dots: {
          '0%, 80%, 100%': { opacity: '0' },
          '40%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
