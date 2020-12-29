const defaultTheme = require("tailwindcss/defaultTheme");

const fontFamily = defaultTheme.fontFamily;
fontFamily["sans"] = ["Quicksand"];

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily,
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/custom-forms")],
};
