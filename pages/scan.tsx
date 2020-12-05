import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DynamicComponent = dynamic(() => import("../components/QRCodeReader"), {
    ssr: false,
});

const Scan = () => {
    const router = useRouter();
    console.log(router);

    const handleDataValidation = (value: string) => {
        console.log("data ----> ", window.location);
    };

    return (
        <div className="w-screen h-screen bg-blue-50">
            <div className="text-4xl py-5 text-center font-bold font-sans">
                Scan code
            </div>
            <div className="text-xl py-5 w-3/4 font-sans flex mx-auto justify-center mb-5 text-center">
                Your data will be uploaded anonymously and will be deleted
                automatically after 24 hours
            </div>
            <DynamicComponent getData={handleDataValidation} />
        </div>
    );
};

export default Scan;
