/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "#00000000",
      white: "#fff",
      text: "#030607",
      background: "#ffffff",
      "background-dark": "#f5f2fc",
      "primary-light": "#686086",
      primary: "#514B68",
      "primary-dark": "#3A364A",
      "secondary-light": "#ffffff",
      secondary: "#eae5f8",
      "secondary-dark": "#dfd8f4",
      "accent-light": "#7151b7",
      accent: "#6143a3",
      "accent-dark": "#4b347f",
    },
    fontFamily: {
      display: ["Urbanist", ...defaultTheme.fontFamily.sans],
      sans: ["Outfit", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
