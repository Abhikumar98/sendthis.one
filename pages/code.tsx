import { useRouter } from "next/router";
import QRCode from "qrcode.react";
import queryString from "query-string";

const code = () => {
    const router = useRouter();

    const code = queryString.parseUrl(router.asPath).query;

    return (
        <div className="container m-auto flex h-screen items-center justify-center flex-col font-sans">
            <div className="text-bold text-3xl mb-10">
                Scan this code to get the download link
            </div>
            <QRCode
                value={
                    code["code"]
                        ? `${window.location.origin}/read?code=${code["code"]}`
                        : "invalid"
                }
            />
        </div>
    );
};

export default code;
