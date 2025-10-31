/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {fontFamily: {
    inter: ["Inter", "sans-serif"],
    montserrat:["Montserrat", "sans-serif"]
  },},
  },
  plugins: [],
};
