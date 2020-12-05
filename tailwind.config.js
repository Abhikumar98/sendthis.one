const defaultTheme = require("tailwindcss/defaultTheme");

const fontFamily = defaultTheme.fontFamily;
fontFamily["sans"] = ["Mulish"];

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: fontFamily,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/custom-forms")],
};
