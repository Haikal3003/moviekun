/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        workSans: ['Work Sans', 'sans-serif'],
      },

      colors: {
        primary: '#212121',
        secondary: '#2C2C2C',
        gray: '#404040',
        cyan: '#5CFEF0',
      },
    },
  },
  plugins: [],
};
