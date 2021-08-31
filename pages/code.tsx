import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QRCode from "qrcode.react";
import queryString from "query-string";
import dynamic from "next/dynamic";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
	ssr: false,
});

const code = () => {
	const router = useRouter();

	const code = queryString.parseUrl(router.asPath).query;

	const copyToClipboard = () => {
		copy(String(code["code"]) ?? "");
		console.log("here");
		toast.success("Copied to clipboard");
	};

	return (
		<div className="container m-auto h-1/2 lg:w-full xl:w-1/2 grid grid-rows-2 sm:grid-cols-2 items-center justify-center text-center">
			<div className="flex items-center flex-col h-full justify-center">
				<div className="text-bold text-xl mb-10 text-center">
					Scan to get download link
				</div>
				<QRCode
					value={
						code["code"]
							? `${window.location.origin}/read?code=${code["code"]}`
							: "invalid"
					}
				/>
			</div>

			<div className="flex items-center flex-col h-full justify-center sm:border-l border-gray-300 px-12">
				Or, you can use the unique code to access files:
				<span
					onClick={copyToClipboard}
					className="font-bold text-xl"
					data-tip={"Click to copy"}
				>
					{code["code"]}
				</span>
			</div>
		</div>
	);
};

export default code;
