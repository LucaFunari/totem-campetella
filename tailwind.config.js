/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        buttonblue: "#2a6fb1",
        buttonbluedarker: "#1E4F7D",
        buttongray: "#41444d",
        buttongraydarker: "#212227",
        textlightblue: "#6a94cc",
        babyblue: "#9dccf2",
      },
    },
  },
  plugins: [],
};
