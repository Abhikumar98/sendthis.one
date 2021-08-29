import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SubTitle from "../components/Text/SubTitle";
import Paragraph from "../components/Text/Paragraph";

const DynamicComponent = dynamic(() => import("../components/QRCodeReader"), {
	ssr: false,
});

const Scan = () => {
	const router = useRouter();

	const handleDataValidation = (value: string) => {
		if (value) {
			router.push(value);
		}
	};

	return (
		<div>
			<SubTitle>Scan qr code</SubTitle>
			<Paragraph>Scan the generate QR code from the sender</Paragraph>
			<DynamicComponent getData={handleDataValidation} />
		</div>
	);
};

export default Scan;
