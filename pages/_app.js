/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
	ssr: false,
});
// const Toaster = dynamic(() => import("react-hot-toast"), {
// 	ssr: false,
// });

import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head></Head>
			<div className="bg-bgColor text-textSecondaryColor h-screen w-screen overflow-auto font-sans">
				<div className="flex flex-col w-full h-full items-center">
					<Component {...pageProps} />
				</div>
			</div>
			<ReactTooltip />
			<Toaster />
		</>
	);
}

export default MyApp;
