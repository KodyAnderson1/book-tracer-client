import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {},
        light: {
          colors: {
            primary: {
              DEFAULT: "#40a060",
              foreground: "#ffffff",
            },
            background: {
              DEFAULT: "#FAEBD7",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#0B3D91",
              foreground: "#ffffff",
            },
            text: {
              DEFAULT: "#ffffff",
              primary: "#ffffff",
            },
            foreground: {
              white: "#ffffff",
            },
          },
        },
      },
    }),
  ],
};

// green: {
//     100: "#dcf4e4",
//     200: "#b9e9c9",
//     300: "#96deae",
//     400: "#73d393",
//     500: "#50c878",
//     600: "#40a060",
//     700: "#307848",
//     800: "#205030",
//     900: "#102818"
// },
