/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        fluid: "clamp(1rem, 2vw, 1.6rem)",
      },
    },
  },
  plugins: [],
};
