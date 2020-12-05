import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db, FirebaseCollections } from "../utils/firebase";
import { useRouter } from "next/router";
import queryString from "query-string";

const Read = () => {
    const textContent = "";

    const signUpAnonymously = async () => {
        await firebase.auth().signInAnonymously();
    };

    const router = useRouter();
    const [data, setData] = useState({});
    const fetchData = async () => {
        try {
            const code = queryString.parseUrl(router.asPath).query;
            if (!firebase.auth().currentUser) {
                await signUpAnonymously();
            }
            if (!code["code"]) {
                throw new Error("Invalid doc id");
            }

            const id = code["code"] as string;

            const docSnapshot = await db
                .collection(FirebaseCollections.Data)
                .doc(id)
                .get();

            if (docSnapshot.exists) {
                setData(docSnapshot.data());
            }
        } catch (error) {
            console.error(error);
        }
    };

    const copyToClipboard = () => {
        const el = document.createElement("textarea");
        el.value = data.text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-screen h-screen bg-blue-50 overflow-scroll">
            <div className="text-4xl py-5 text-center font-bold font-sans">
                Here is the data shared to you
            </div>
            <div className="flex mx-auto w-1/2 flex-col">
                <div className="my-4">
                    <textarea
                        disabled={true}
                        value={data.text}
                        className="form-textarea resize-none border rounded-md w-full max-w-full"
                    />
                </div>

                {data.text && (
                    <button
                        onClick={copyToClipboard}
                        className={`my-5 bg-blue-500 mx-auto py-2 px-4 rounded-sm text-white focus:ring-1 flex `}
                    >
                        Copy text
                    </button>
                )}
            </div>
        </div>
    );
};

export default Read;
