/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add custom font family
        SourGummy: ['Sour Gummy', 'sans-serif'],
      },

    },
  },
  plugins: [],
}