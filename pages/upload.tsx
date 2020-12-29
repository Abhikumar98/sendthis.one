import React, { useEffect, useState } from "react";
import { dataCollectionRef } from "../utils/firebase";
import firebase from "firebase";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

import { DocumentData, uploadLimit } from "../contracts";

const Upload = () => {
	const router = useRouter();

	const [isText, setIsText] = useState(false);
	const [isFiles, setIsFiles] = useState(false);

	const [textContent, setTextContent] = useState("");

	const [isUploading, setIsUploading] = useState(false);
	const [files, setFiles] = useState<File[]>([]);

	const signUpAnonymously = async () => {
		await firebase.auth().signInAnonymously();
	};

	const uploadDate = async () => {
		try {
			const docRef = dataCollectionRef;
			toast.loading("Uploading your data...");

			await signUpAnonymously();

			const deleteOn = new Date();
			deleteOn.setDate(deleteOn.getDate() + 1);

			const savingDocument: DocumentData = {
				id: docRef.id,
				deleteDate: deleteOn,
			};

			if (isText && textContent.length) {
				savingDocument.textContent = textContent;
			}

			if (isFiles && files.length) {
				const firebaseStorageRef = firebase
					.storage()
					.ref(`${docRef.id}/${files[0].name}`);
				await firebaseStorageRef.put(files[0]);
				const downloadURL = await firebaseStorageRef.getDownloadURL();
				savingDocument.storageURL = String(downloadURL);
			}

			await docRef.set({
				...savingDocument,
			});

			router.push(`/code?code=${docRef.id}`);
			toast.dismiss();

			setIsUploading(true);
		} catch (error) {
			console.error(error);
			toast.error(error);
		} finally {
			setIsText(false);
			setTextContent("");
			setIsFiles(false);
			setIsUploading(false);
		}
	};

	const handleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
		const allFields = value.target.files;

		const isLimitCrossed =
			[...Object.values(allFields)]
				.map((f) => f.size)
				.reduce((total, current) => total + current, 0) > uploadLimit;

		if (isLimitCrossed) {
			toast.error("Oops, you have crossed the upload limit of 20MB");
			return;
		}

		setFiles([...files, ...Object.values(allFields)]);
		toast.success("File added ");
	};

	const removeFile = (index: number) => {
		const updatedFiles = [...files];

		const newObj = updatedFiles.filter((_file, i) => index !== i);

		setFiles([...newObj]);
	};

	useEffect(() => {
		return () => {
			firebase.auth().signOut();
		};
	}, []);

	const currentUploadedFilesSize =
		files
			.map((f) => f.size)
			.reduce((total, current) => total + current, 0) > uploadLimit;

	const isButtonDisabled =
		!(isText || isFiles) || !(textContent.length || files.length);
	return (
		<div className="w-screen h-screen bg-blue-50 overflow-scroll">
			<div className="text-4xl py-5 text-center font-bold font-sans">
				Upload files
			</div>
			<div className="text-xl py-5 w-5/6 md:w-3/4 font-sans flex mx-auto justify-center mb-10 text-center">
				Your data will be uploaded anonymously and will be deleted
				automatically after 24 hours
			</div>
			<div className="flex mx-auto w-5/6 md:w-1/2 flex-col">
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
							Do you have files that you want to share? (max. 20
							MB)
						</span>
					</label>
				</div>

				{isFiles && (
					<>
						<div className="flex w-full my-8 items-center justify-center ">
							<label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue-300 cursor-pointer hover:bg-blue-400 hover:text-white">
								<svg
									className="w-8"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
								</svg>
								<span className="mt-2 text-base leading-normal">
									Select a file
								</span>
								<input
									type="file"
									multiple
									onChange={handleChange}
									hidden
									size={uploadLimit}
								/>
							</label>
						</div>

						<div className="flex flex-col justify-center max-h-80 overflow-y-auto">
							{files &&
								Object.values(files)?.map((file, index) => (
									<div
										key={index}
										className=" my-1 flex items-center max-w-5/6 md:w-4/5 bg-blue-100 p-1 m-auto"
									>
										<div className=" overflow-hidden px-1 w-56 sm:w-auto whitespace-pre overflow-ellipsis rounded-sm bg-blue-200">
											{file.name
												.split(".")
												.slice(0, -1)
												.join(".")}
										</div>
										<div className="w-10 ml-2 rounded-sm px-1  flex items-center bg-blue-200">
											{file.name.split(".").slice(-1)}
										</div>
										<div
											className="w-min ml-2 rounded-sm p-1 flex items-center bg-blue-200 hover:bg-blue-300 cursor-pointer"
											onClick={() => removeFile(index)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="h-4 w-4"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</div>
									</div>
								))}
						</div>
					</>
				)}

				<div className="w-full bg-gray-200 h-0.5 mt-3 rounded-sm" />
				<button
					disabled={isButtonDisabled}
					onClick={uploadDate}
					className={`my-5 w-max mx-auto py-2 px-4 rounded-sm text-white focus:ring-1 flex ${
						isUploading ? "bg-gray-400" : ""
					} ${!isButtonDisabled ? "bg-blue-500" : "bg-gray-200"}`}
				>
					Upload ⬆
				</button>
			</div>
			<Toaster />
		</div>
	);
};

export default Upload;
