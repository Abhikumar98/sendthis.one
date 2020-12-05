import { useEffect, useState } from "react";
import { dataCollectionRef, db } from "../utils/firebase";
import firebase from "firebase";
import { useRouter } from "next/router";
import Link from "next/link";

const Upload = () => {
    const router = useRouter();

    const [isText, setIsText] = useState(false);
    const [isFiles, setIsFiles] = useState(false);

    const [textContent, setTextContent] = useState("");

    const [isUploading, setIsUploading] = useState(false);

    const signUpAnonymously = async () => {
        await firebase.auth().signInAnonymously();
    };

    const uploadDate = async () => {
        try {
            const docRef = dataCollectionRef;

            await signUpAnonymously();

            await docRef.set({
                text: textContent,
            });

            router.push(`/code?code=${docRef.id}`);

            setIsUploading(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsText(false);
            setTextContent("");
            setIsFiles(false);
            setIsUploading(false);
        }
    };

    useEffect(() => {
        return () => {
            firebase.auth().signOut();
        };
    }, []);

    return (
        <div className="w-screen h-screen bg-blue-50 overflow-scroll">
            (
            <div className="text-4xl py-5 text-center font-bold font-sans">
                Upload files
            </div>
            <div className="text-xl py-5 w-3/4 font-sans flex mx-auto justify-center mb-10 text-center">
                Your data will be uploaded anonymously and will be deleted
                automatically after 24 hours
            </div>
            <div className="flex mx-auto w-1/2 flex-col">
                <div>
                    <label className="inline-flex items-center">
                        <input
                            disabled={isUploading}
                            type="checkbox"
                            className="form-checkbox text-blue-600"
                            checked={isText}
                            onChange={(e) => {
                                if (!e.target.checked) {
                                    setTextContent("");
                                }
                                setIsText(e.target.checked);
                            }}
                        />
                        <span className="ml-2">
                            Do you have text content that you want to share?
                        </span>
                    </label>
                </div>
                {isText && (
                    <div className="my-4">
                        <textarea
                            disabled={isUploading}
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            className="form-textarea resize-y border rounded-md w-full max-w-full"
                        />
                    </div>
                )}
                <div>
                    <label className="inline-flex items-center">
                        <input
                            disabled={isUploading}
                            type="checkbox"
                            className="form-checkbox text-blue-600"
                            checked={isFiles}
                            onChange={(e) => setIsFiles(e.target.checked)}
                        />
                        <span className="ml-2">
                            Do you have files that you want to share?
                        </span>
                    </label>
                </div>

                <button
                    onClick={uploadDate}
                    className={`my-5 bg-blue-500 w-min mx-auto py-2 px-4 rounded-sm text-white focus:ring-1 flex ${
                        isUploading ? "bg-gray-400" : ""
                    }`}
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default Upload;
