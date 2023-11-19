/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in .5s ease-in-out forwards",
        "fade-out": "fade-out .5s ease-in-out forwards",
        "pulse-fast": "pulse 1s infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        "fade-out": {
          "0%": { opacity: 100 },
          "100%": { opacity: 0 },
        },
      },
      transitionProperty: {
        height: "height",
        borderRadius: "border-radius",
        spacing: "margin, padding",
      },
      screens: {
        xs: "475px",
      },
      minHeight: {
        60: "15rem",
        144: "36rem",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
};
