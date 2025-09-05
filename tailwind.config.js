/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 70%, 50%)',
        accent: 'hsl(140, 60%, 45%)',
        surface: 'hsl(220, 25%, 100%)',
        background: 'hsl(220, 25%, 96%)',
        border: 'hsl(220, 25%, 85%)',
        'text-primary': 'hsl(220, 25%, 20%)',
        'text-secondary': 'hsl(220, 25%, 50%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        'xxl': '24px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(220, 25%, 20%, 0.12)',
        'modal': '0 12px 32px hsla(220, 25%, 20%, 0.16)',
      },
      animation: {
        'pulse-recording': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
