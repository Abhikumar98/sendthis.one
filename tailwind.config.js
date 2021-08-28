const defaultTheme = require("tailwindcss/defaultTheme");

const fontFamily = defaultTheme.fontFamily;
fontFamily["sans"] = ["Quicksand"];

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily,
			colors: {
				textPrimaryColor: "#272343",
				textSecondaryColor: "#2d334a",
				bgColor: "#fffffe",
				buttonColor: "#ffd803",
				buttonTextColor: "#272343",
				primaryColor: "#ffd803",
				secondaryColor: "#e3f6f5",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/custom-forms"),
		require("@tailwindcss/forms"),
	],
};
