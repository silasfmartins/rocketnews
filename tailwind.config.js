/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        spartan: "'League Spartan', sans-serif",
        work: "'Work Sans', sans-serif",
      }    
    },
  },
  plugins: [],
}
