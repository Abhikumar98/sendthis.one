/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import "../styles/globals.css";
import dynamic from "next/dynamic";
import Heading from "../components/Text/Heading";
import Paragraph from "../components/Text/Paragraph";

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
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="57x57"
					href="/apple-icon-57x57.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="/apple-icon-60x60.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="72x72"
					href="/apple-icon-72x72.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/apple-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="/apple-icon-114x114.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/apple-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="/apple-icon-144x144.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/apple-icon-152x152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-icon-180x180.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/android-icon-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/favicon-96x96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/manifest.json" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
				<meta name="theme-color" content="#ffffff" />
			</Head>

			<div className="bg-bgColor text-textSecondaryColor h-screen w-screen overflow-auto font-sans">
				<div className="flex flex-col w-full h-full items-center">
					{!pageProps.hideBanner && (
						<>
							<Link href="/">
								<>
									<Heading className="cursor-pointer">
										<span className="mr-8">
											<Image
												src="/logo.svg"
												height={56}
												width={56}
												alt="sendthis.one logo"
											/>
										</span>
										Sendthis.one
									</Heading>
								</>
							</Link>
							<Paragraph>Share files and text anonymously.</Paragraph>
							<div className="w-screen border-b border-b-gray-800"></div>
						</>
					)}
					<Component {...pageProps} />
				</div>
			</div>
			<ReactTooltip />
			<Toaster />
		</>
	);
}

export default MyApp;
