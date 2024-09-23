/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontSize: {
        contentTitle: ["4.5rem", "5rem"],
        content: ["3rem", "4rem"],
        contentLg: ["4rem", "4.75rem"],
      },
      fontFamily: {
        baiti: ["Microsoft Yi Baiti", "Arial", "sans-serif"],
        "d-din": ["D-Din", "Arial", "sans-serif"],
        "d-din-condensed": ["D-Din-Condensed", "Arial", "sans-serif"],
      },
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
