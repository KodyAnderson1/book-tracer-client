// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: ["class"],
//   content: [
//     './pages/**/*.{ts,tsx}',
//     './components/**/*.{ts,tsx}',
//     './app/**/*.{ts,tsx}',
//     './src/**/*.{ts,tsx}',
// 	],
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       keyframes: {
//         "accordion-down": {
//           from: { height: 0 },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: 0 },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// }

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
        dark: {
          colors: {
            primary: {
              DEFAULT: "#286040",
              foreground: "#ffffff",
              hover: "#30A070",
            },
            secondary: {
              DEFAULT: "#4D6679", // Dark blue-gray
              foreground: "#ffffff",
              hover: "#1A1A1A",
            },
            background: {
              DEFAULT: "#1E1E1E", // Slightly darker background
              foreground: "#C0C0C0",
              card: "#292929", // Darker card for better contrast
            },
            text: {
              DEFAULT: "#C0C0C0",
              primary: "#ffffff",
              accent: "#8899A6", // Medium blue-gray for less emphasized text
            },
            accent: {
              DEFAULT: "#735c0f", // A darker gold accent color
              foreground: "#ffffff",
            },
            foreground: {
              white: "#ffffff",
            },
            danger: {
              DEFAULT: "#B83227", // Dark Red for dark mode
              foreground: "#ffffff",
            },
            hr: {
              DEFAULT: "#ffffff",
            },
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#50c878",
              foreground: "#ffffff",
              hover: "#48B68E", // Slightly darker green for hover states
            },
            secondary: {
              DEFAULT: "#1A4A72", // Darker blue for better contrast
              foreground: "#ffffff",
              hover: "#E0E0E0", // Slightly darker blue for hover states
            },
            background: {
              DEFAULT: "#FFF5E1", // A warm beige background
              foreground: "#333333",
              card: "#FFEDC5", // A lighter warm beige for cards in light mode
            },
            text: {
              DEFAULT: "#333333",
              primary: "#212121", // Almost black for higher contrast
              accent: "#667788", // Medium blue-gray for less emphasized text
            },
            accent: {
              DEFAULT: "#FFAA00", // A vibrant gold accent color
              foreground: "#ffffff",
            },
            foreground: {
              white: "#ffffff",
            },
            danger: {
              DEFAULT: "#E74C3C", // Bright Red for light mode
              foreground: "#ffffff",
            },
            hr: {
              DEFAULT: "#000000",
            },
          },
        },
      },
    }),
  ],
};

/*
Color Usage Guidelines:

1. primary:
  - Use for main interactive elements such as buttons, links, or highlighted information.
  - `foreground`: Color for text or icons that appear on a primary colored background.

2. secondary:
  - Use for secondary UI elements or information which shouldn't take precedence over primary items.
  - `foreground`: Color for text or icons that are on top of a secondary colored background.

3. background:
  - `DEFAULT`: Main background color for the entire app or page.
  - `foreground`: Default color for text on the main background.
  - `card`: Background color for UI cards or panels. This should be distinguishable from the main background but not too contrasting.

4. text:
  - `DEFAULT`: The standard text color, suitable for most textual content.
  - `primary`: For important text or headings that need more emphasis.
  - `accent`: For text that should be less emphasized or for secondary information.

5. accent:
  - Use for elements or text that need to stand out but shouldn't be as dominant as primary elements.
  - `foreground`: Color for text or icons that appear on an accent colored background.

6. foreground:
  - `white`: A general-purpose white color. Can be used wherever a pure white is needed, such as icons, borders, or specific text elements.

7. danger:
  - Use for warning or alert elements, or for actions that may result in significant consequences.
  - `foreground`: Color for text or icons that appear on a danger colored background. This color ensures the text/icons are readable against the red background.
Always remember to maintain visual consistency and ensure readability when choosing where to apply these colors.
*/
