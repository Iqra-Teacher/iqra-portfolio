/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FAF8F5",
          200: "#F4F0E8",
          300: "#EFECE6",
          400: "#E5DEC9",
        },
        gold: {
          DEFAULT: "#C5A059",
          light: "#DFCA9B",
          dark: "#9E7B3B",
          subtle: "#E8DFD1",
          border: "#D9CDB8",
          muted: "rgba(197, 160, 89, 0.15)",
        },
        charcoal: {
          DEFAULT: "#1C1917",
          light: "#332F2B",
          medium: "#57534E",
          muted: "#78716C",
          soft: "#A8A29E",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Manrope'", "'Inter'", "sans-serif"],
      },
      boxShadow: {
        'academic': '0 4px 20px -2px rgba(28, 25, 23, 0.05), 0 2px 6px -1px rgba(197, 160, 89, 0.08)',
        'academic-hover': '0 12px 30px -4px rgba(28, 25, 23, 0.08), 0 4px 12px -2px rgba(197, 160, 89, 0.12)',
        'gold-glow': '0 0 25px -5px rgba(197, 160, 89, 0.25)',
      },
      borderWidth: {
        '1': '1px',
      },
      letterSpacing: {
        'widest-academic': '0.15em',
        'super-wide': '0.25em',
      }
    },
  },
  plugins: [],
}
