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
          primary: "#6842ff",
          secondary: "#a855f7",
          accent: "#1e40af"
        }
      },
    },
    plugins: [],
  }