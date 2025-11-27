import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5EB',
          100: '#FFE5CC',
          200: '#FFCB99',
          300: '#FFB166',
          400: '#FF9733',
          500: '#FF8C42',
          600: '#E67A3A',
          700: '#CC6832',
          800: '#B3562A',
          900: '#994422',
          orange: '#FF8C42',
          navy: '#2B2F77',
        },
        success: '#00D09C',
        error: '#FF6B6B',
        warning: '#FFB020',
      },
      boxShadow: {
        'card': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.1)',
        'button': '0 6px 20px rgba(255, 140, 66, 0.3)',
      },
      borderRadius: {
        'card': '20px',
        'button': '16px',
      },
    },
  },
  plugins: [],
}
export default config





