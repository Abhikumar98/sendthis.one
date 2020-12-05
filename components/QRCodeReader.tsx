import React, { useState } from "react";
import QrReader from "react-qr-reader";
import Select from "react-select";

const QRCodeReader = ({ getData }: { getData: (data: string) => void }) => {
    const handleError = (error: any) => {
        console.error(error);
    };

    const handleScan = (result: string) => {
        console.log(result);
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
                className="w-1/4 mb-24"
                defaultValue={options[0]}
                options={options}
                onChange={(e) => console.log(e)}
            />
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                facingMode={cameraState}
                className="w-96"
            />
        </div>
    );
};

export default QRCodeReader;
