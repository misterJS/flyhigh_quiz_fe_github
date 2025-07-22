/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "4px 4px 20px 0px #7A818B1A",
      },
      colors: {
        primary: {
          blue: "#0076FF",
          red: "#F1403C",
        },
        alert: {
          green: "#24B47E",
          yellow: "#FFB020",
          red: "#F1403C",
        },
        base: {
          white: "#FFFFFF",
          lightgray: "#F6F6F6",
          pink: "#FBE4E4",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#E4E7EC",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
        },
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
