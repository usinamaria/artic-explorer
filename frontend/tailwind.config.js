/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand accent - warm copper/bronze
        accent: '#C17A3A',
        'accent-dark': '#A86830',
        'accent-light': '#D9985D',
        
        // Light mode - elegant neutral palette
        'gallery-bg': '#FFFFFF',
        'gallery-surface': '#F9F7F4',
        'gallery-text': '#1A1A1A',
        'gallery-muted': '#7A7A7A',
        'gallery-border': '#E5E1DC',
        
        // Dark mode - sophisticated palette
        'dark-bg': '#0F0F0F',
        'dark-surface': '#1A1A1A',
        'dark-text': '#F5F5F5',
        'dark-muted': '#A0A0A0',
        'dark-border': '#2D2D2D',
      },
      fontFamily: {
        // UI font - elegant sans-serif
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Display font - refined serif for headings
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.125rem' }],
        sm: ['0.9375rem', { lineHeight: '1.375rem' }],
        base: ['1rem', { lineHeight: '1.6rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.375rem', { lineHeight: '2rem' }],
        '2xl': ['1.75rem', { lineHeight: '2.25rem' }],
        '3xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '4xl': ['3rem', { lineHeight: '3.5rem' }],
        '5xl': ['3.75rem', { lineHeight: '4.25rem' }],
      },
      borderRadius: {
        none: '0px',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
        md: '0 4px 6px -1px rgba(16, 24, 40, 0.1)',
        lg: '0 10px 15px -3px rgba(16, 24, 40, 0.1)',
        xl: '0 6px 18px rgba(16, 24, 40, 0.08)',
        '2xl': '0 20px 25px -5px rgba(16, 24, 40, 0.1)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      aspectRatio: {
        square: '1 / 1',
        portrait: '3 / 4',
        landscape: '4 / 3',
        widescreen: '16 / 9',
        ultrawide: '21 / 9',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
        screens: {
          xs: '320px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      maxWidth: {
        'gallery-sm': '800px',
        'gallery': '1200px',
        'gallery-lg': '1400px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
