const { fn } = require('./utils/utilityFunction');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },

            colors: {
                emBlue: `#1565D8`,
                emRed: `#FF0000`,
                emGrey: `#83979B`,
                emBgColor: `#83979B50`,
            },
            fontSize: {
                h1: "2.5rem",
                h2: "2rem",
                h3: "1.75rem",
                h4: "1.5rem",
                h5: "1.25rem",
                h6: fn.rem(18),
            },
        },
    },
    plugins: [],
};
