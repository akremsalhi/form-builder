const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        serif: [...defaultTheme.fontFamily.serif],
        mono: [...defaultTheme.fontFamily.mono],
      },
      backgroundPosition: {
        "right-two-images": "right 2rem center, right .5rem center"
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('tw-elements/dist/plugin'),
  ],
};
