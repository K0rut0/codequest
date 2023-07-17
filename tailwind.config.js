/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        128: "32rem",
      },
      colors: {
        primary: "#706819",
        secondary: "#e8f6d5",
        accent: "#d06f2f",
        fieldDrab: "#706819",
        darkGreen: "#1C2A09",
        buff: "#e3a982",
        seasalt: "#fafafa",
        black: "#050505",
        night: "#0d0d0d",
      },
    },
  },
  plugins: [],
};
