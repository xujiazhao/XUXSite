/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Helvetica',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
      },
      colors: {
        notion: {
          bg: '#ffffff',
          text: '#37352f',
          gray: '#787774',
          brown: '#9f6b53',
          orange: '#d9730d',
          yellow: '#cb912f',
          green: '#448361',
          blue: '#337ea9',
          purple: '#9065b0',
          pink: '#c14c8a',
          red: '#d44c47',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  // Don't purge react-notion-x styles
  safelist: [
    { pattern: /notion-/ },
  ],
}
