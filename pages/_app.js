/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<div className="bg-gray-100 text-gray-500 h-screen w-screen overflow-auto">
			<Component {...pageProps} />;
		</div>
	);
}

export default MyApp;
