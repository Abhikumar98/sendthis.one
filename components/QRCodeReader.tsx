import React, { useState } from "react";
import toast from "react-hot-toast";
import QrReader from "react-qr-reader";
import Select from "react-select";

const QRCodeReader = ({ getData }: { getData: (data: string) => void }) => {
	const handleError = (error: any) => {
		alert(error);
		console.error(error);
	};

	const handleScan = (result: string | null) => {
		if (!result) {
			toast.error(
				"Something went wrong while scanning the code. Please try another scanner or use the unique code"
			);
			return;
		}
		getData(result);
	};

	const [cameraState, setCameraState] = useState<"environment" | "user">(
		"environment"
	);

	const toggleCamera = () =>
		cameraState === "environment"
			? setCameraState("user")
			: setCameraState("environment");

	return (
		<div className="flex justify-center items-center flex-col">
			<QrReader
				delay={500}
				onError={handleError}
				onScan={handleScan}
				facingMode={cameraState}
				className="w-96"
			/>
			<img
				src="/camera-switch.png"
				onClick={toggleCamera}
				className="cursor-pointer hover:bg-blue-100 rounded-md mt-4"
			/>
		</div>
	);
};

export default QRCodeReader;
