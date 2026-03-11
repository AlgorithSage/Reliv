// Tailwind config — Neomorphic design system for Reliv AI kiosk
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
        'heading-2': ['Recoleta', 'Georgia', 'serif'],
        'heading-3': ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        'neu-bg': '#E4E0DC',
        'neu-bg-light': '#EAE6E1',
        'neu-surface': '#FAFAF8',
        'brand-orange': '#F06922',
        'brand-orange-dark': '#E85C25',
        'brand-orange-light': '#FF8A4C',
      },
      boxShadow: {
        'neu-raised-sm': '4px 4px 10px rgba(0, 0, 0, 0.12), -4px -4px 10px rgba(255, 255, 255, 0.65)',
        'neu-raised': '8px 8px 20px rgba(0, 0, 0, 0.12), -8px -8px 20px rgba(255, 255, 255, 0.65)',
        'neu-raised-lg': '12px 12px 28px rgba(0, 0, 0, 0.12), -12px -12px 28px rgba(255, 255, 255, 0.65)',
        'neu-raised-xl': '16px 16px 36px rgba(0, 0, 0, 0.12), -16px -16px 36px rgba(255, 255, 255, 0.65)',
        'neu-inset-sm': 'inset 2px 2px 6px rgba(0, 0, 0, 0.12), inset -2px -2px 6px rgba(255, 255, 255, 0.65)',
        'neu-inset': 'inset 4px 4px 10px rgba(0, 0, 0, 0.12), inset -4px -4px 10px rgba(255, 255, 255, 0.65)',
        'neu-inset-lg': 'inset 6px 6px 16px rgba(0, 0, 0, 0.12), inset -6px -6px 16px rgba(255, 255, 255, 0.65)',
        'glow': '8px 8px 20px rgba(0, 0, 0, 0.12), -8px -8px 20px rgba(255, 255, 255, 0.65), 0 0 40px rgba(240, 105, 34, 0.3)',
      },
      borderRadius: {
        'neu': '24px',
        'neu-lg': '32px',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '8px 8px 20px rgba(0,0,0,0.12), -8px -8px 20px rgba(255,255,255,0.65), 0 0 30px rgba(240,105,34,0.3)' },
          '50%': { boxShadow: '8px 8px 20px rgba(0,0,0,0.12), -8px -8px 20px rgba(255,255,255,0.65), 0 0 60px rgba(240,105,34,0.5)' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 1.2s infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
