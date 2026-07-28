/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        surface: {
          DEFAULT: '#111827',
          card: '#1E293B',
          hover: '#334155',
          border: '#334155'
        },
        brand: {
          blue: '#3B82F6',
          ibm: '#0F62FE',
          k8s: '#326CE5',
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          purple: '#8B5CF6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'JetBrains Mono', 'Consolas', 'monospace'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(59, 130, 246, 0.3)',
        'glow-ibm': '0 0 25px -5px rgba(15, 98, 254, 0.4)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}
