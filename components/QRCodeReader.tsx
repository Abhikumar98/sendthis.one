import React, { useState } from "react";
import QrReader from "react-qr-reader";
import Select from "react-select";

const QRCodeReader = ({ getData }: { getData: (data: string) => void }) => {
	const handleError = (error: any) => {
		alert(error);
		console.error(error);
	};

	const handleScan = (result: string) => {
		getData(result);
	};

	const [cameraState, setCameraState] = useState<"environment" | "user">(
		"environment"
	);

	const options = [
		{ value: "environment", label: "Rear Camera" },
		{ value: "user", label: "Front Camera" },
	];

	return (
		<div className="flex justify-center items-center flex-col">
			<Select
				className="w-1/2 md:w-1/4 mb-10"
				defaultValue={options[0]}
				options={options}
				onChange={(e) =>
					setCameraState(e.value as "environment" | "user")
				}
			/>
			<QrReader
				delay={500}
				onError={handleError}
				onScan={handleScan}
				facingMode={cameraState}
				className="w-96"
			/>
		</div>
	);
};

export default QRCodeReader;
