/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "lofi",
      "bumblebee",
      "retro",
      "valentine",
      "pastel",
      "autumn",
      "acid",
      "nord",
      "black",
      "synthwave",
      "forest",
      "aqua",
      "luxury",
      "business",
      "night",
      "dim",
    ],
  },
}
