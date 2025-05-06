/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
      },
      colors: {
        coral: {
          50: '#FFF5F4',
          100: '#FFECE9',
          200: '#FFD9D3',
          300: '#FFC1B8',
          400: '#FFA299',
          500: '#F97066',
          600: '#E54F4F',
          700: '#C53030',
          800: '#9B2C2C',
          900: '#742A2A',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            'h1, h2, h3, h4': {
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              fontWeight: '700',
            },
          },
        },
      },
    },
  },
  plugins: [],
};