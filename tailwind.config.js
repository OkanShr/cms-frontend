/** @type {import('tailwindcss').Config} */
// Some colors and styles are overwritten in App.css
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pink_light: "#f2eaf4",
        pink_medium: "#fa89cc",
        pink_dark: "#db5ea7",
      },
    },
  },

  plugins: [],
};
