/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // SwapRunn Brand Palette
        'swaprunn': {
          'red': '#E50914',
          'red-light': '#FF4B2B',
          'black': '#111111',
          'gray': '#1A1A1A',
          'silver': '#D1D1D1',
          'off-white': '#F8F8F8',
          'charcoal': '#2A2A2A',
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'work-sans': ['Work Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-red': 'linear-gradient(to right, #E50914, #FF4B2B)',
        'gradient-red-dark': 'linear-gradient(135deg, #E50914 0%, #C40812 100%)',
        'gradient-silver': 'linear-gradient(to right, #D1D1D1, #E8E8E8)',
        'gradient-dark': 'linear-gradient(135deg, #111111 0%, #2A2A2A 100%)',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 13px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px rgba(0, 0, 0, 0.1), 0 25px 50px rgba(0, 0, 0, 0.15)',
        'elevated': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'focus': '0 0 0 3px rgba(229, 9, 20, 0.1), 0 0 0 1px rgba(229, 9, 20, 0.5)',
        'glow': '0 0 20px rgba(229, 9, 20, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      spacing: {
        'section': '80px',
        'section-sm': '40px',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
      },
    },
  },
  plugins: [],
}
