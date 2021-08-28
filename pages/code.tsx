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
		<div className="container m-auto flex h-screen items-center justify-center flex-col font-sans">
			<div className="text-bold text-3xl mb-10 text-center">
				Scan this code to get the download your files
			</div>
			<QRCode
				value={
					code["code"]
						? `${window.location.origin}/read?code=${code["code"]}`
						: "invalid"
				}
			/>

			<div className="my-6">
				Unique code to access files:
				<span
					onClick={copyToClipboard}
					className="ml-4 font-bold text-xl"
					data-tip={"Click to copy"}
				>
					{code["code"]}
				</span>
			</div>
		</div>
	);
};

export default code;
