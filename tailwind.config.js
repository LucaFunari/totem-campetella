/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        buttonblue: "#2a6fb1",
        buttongray: "#41444d",
        textlightblue: "#6a94cc",
      },
    },
  },
  plugins: [],
};
