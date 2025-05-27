/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      fontFamily: {
        vazir: ['Vazirmatn', 'Tahoma', 'Arial', 'sans-serif'],
      },
      extend: {
        colors: {
          primary: "#7c3aed",
          secondary: "#06b6d4",
          accent: "#f59e42",
          dark: "#21213a"
        },
        boxShadow: {
          'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.17)'
        }
      },
    },
    plugins: [],
  }