/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Soft pastel teacup-boutique palette (was a sturdy pitbull-breeder theme).
        forest: {
          50: '#fbeef2',
          100: '#f6dce4',
          200: '#eab8c8',
          300: '#dd8fa8',
          400: '#cc6a8a',
          500: '#b8506f',
          DEFAULT: '#b8506f',
          600: '#954059',
          700: '#753347',
          800: '#5c2938',
          900: '#451f2a',
        },
        sky: {
          DEFAULT: '#e0b25c',
          500: '#e0b25c',
          600: '#c99a3d',
          700: '#a87d2c',
        },
        ember: {
          50: '#fdf0f0',
          100: '#fbdfe0',
          200: '#f5bcc0',
          300: '#ee98a0',
          400: '#e5717e',
          500: '#d95468',
          DEFAULT: '#d95468',
          600: '#b8425a',
          700: '#93344a',
        },
        cream: '#fdf6f0',
        sand: '#f3e3e0',
        ink: '#2c2230',
        muted: '#7a6b72',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(33, 31, 28, 0.18)',
        lift: '0 22px 45px -18px rgba(33, 31, 28, 0.30)',
        glow: '0 0 0 4px rgba(217, 84, 104, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(217, 84, 104, 0.45)' },
          '50%': { transform: 'scale(1.04)', boxShadow: '0 0 0 12px rgba(217, 84, 104, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease forwards',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      backgroundImage: {
        'paw-pattern':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23b8506f' fill-opacity='0.06'%3E%3Ccircle cx='30' cy='34' r='8'/%3E%3Ccircle cx='18' cy='22' r='3.5'/%3E%3Ccircle cx='30' cy='18' r='3.5'/%3E%3Ccircle cx='42' cy='22' r='3.5'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
