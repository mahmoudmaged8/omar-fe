/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  blocklist: [
    'container',
    'container:before',
  ],
  theme: {
    extend: {
      container: {
        before: {
          background: 'none',
        }
       }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
