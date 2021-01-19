import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db, FirebaseCollections } from "../lib/firebase";
import { useRouter } from "next/router";
import queryString from "query-string";
import DownloadFile from "downloadjs";
import TextareaAutosize from "react-textarea-autosize";
import filesize from "filesize";

import { DocumentData, PageStatus } from "../contracts";
import toast, { Toaster } from "react-hot-toast";

interface FilesMetadata {
	readonly name: string;
	readonly fullPath: string;
	readonly size: number;
	readonly contentType: string;
}

const Read = () => {
	const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.Idle);
	const [files, setFiles] = useState<FilesMetadata[]>([]);

	const signUpAnonymously = async () => {
		await firebase.auth().signInAnonymously();
	};

	const router = useRouter();
	const [data, setData] = useState<DocumentData | null>(null);
	const fetchData = async () => {
		try {
			setPageStatus(PageStatus.Loading);
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

			if (!docSnapshot.exists) {
				throw new Error("No such document exists");
			}

			setData(docSnapshot.data() as DocumentData);

			const firebaseStorageRef = firebase.storage().ref(id);
			const allFiles = await firebaseStorageRef.listAll();

			const promises = allFiles.items.map((file) => file.getMetadata());

			const result = await Promise.all(promises);
			setFiles(result);
			setPageStatus(PageStatus.Success);
		} catch (error) {
			setPageStatus(PageStatus.Error);
			console.error(error);
		}
	};

	const copyToClipboard = () => {
		const el = document.createElement("textarea");
		el.value = data.textContent;
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
	};

	const downloadFile = async (filePath: string, index: number) => {
		try {
			toast.loading("Downloading file");

			const downloadRef = await firebase
				.storage()
				.ref(filePath)
				.getDownloadURL();

			const promiseBlobData = await fetch(downloadRef);

			const blobData = await promiseBlobData.blob();

			DownloadFile(blobData, files[index].name);
		} catch (error) {
			toast.error(error);
			console.error(error);
		} finally {
			toast.dismiss();
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="h-screen w-screen">
			{pageStatus === PageStatus.Idle ||
			pageStatus === PageStatus.Loading ? (
				<img
					className="h-60 w-80 m-auto flex mt-10"
					src="/downloading-animation.gif"
				/>
			) : (
				<div className="w-screen h-screen bg-blue-50 overflow-scroll">
					<div className="text-4xl py-5 text-center font-bold font-sans">
						Shared data
					</div>
					{!!data?.textContent?.length && (
						<div className="flex mx-auto  w-5/6 md:w-1/2 flex-col">
							<div className="my-4">
								<TextareaAutosize
									maxRows={10}
									disabled={true}
									value={data.textContent}
									className="form-textarea resize-none border rounded-md w-full max-w-full"
								/>
							</div>
							<button
								onClick={copyToClipboard}
								className={
									"my-5 bg-blue-500 mx-auto py-2 px-4 rounded-sm text-white focus:ring-1 flex "
								}
							>
								Copy text
							</button>
						</div>
					)}
					{!!files.length && (
						<div className="flex flex-col justify-center max-h-80 overflow-y-auto">
							{files.map((file, index) => (
								<div
									key={index}
									className=" my-1 flex items-center justify-center w-max bg-blue-100 p-1 m-auto"
								>
									<div className=" overflow-hidden px-1 whitespace-pre overflow-ellipsis rounded-sm bg-blue-200 w-48 md:w-auto">
										{file.name
											.split(".")
											.slice(0, -1)
											.join(".")}
									</div>
									<div className=" ml-2 rounded-sm px-1  flex items-center bg-blue-200">
										{file.name.split(".").slice(-1)}
									</div>
									<div className="w-max ml-2 rounded-sm px-1  flex items-center bg-blue-200">
										{filesize(file.size)}
									</div>
									<div
										className="w-min ml-2 rounded-sm p-1 flex items-center bg-blue-500 hover:bg-blue-300 cursor-pointer"
										onClick={() =>
											downloadFile(file.fullPath, index)
										}
									>
										<svg
											className="h-4 w-4 bg-blue-500 hover:bg-blue-300 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
											/>
										</svg>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
			<Toaster />
		</div>
	);
};

export default Read;
