import React, { useEffect, useState } from "react";
import { dataCollectionRef } from "../lib/firebase";
import firebase from "firebase";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import OtpInput from "react-otp-input";

import { DocumentData, uploadLimit } from "../contracts";
import Button from "../components/Button";
import NeumorphismWrapper from "../components/NeumorphismWrapper";

const Upload = () => {
	const router = useRouter();

	const [isText, setIsText] = useState(false);
	const [isFiles, setIsFiles] = useState(false);

	const [textContent, setTextContent] = useState("");

	const [isUploading, setIsUploading] = useState(false);
	const [files, setFiles] = useState<File[]>([]);
	const [requiredPassword, setRequirePassword] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");

	const uploadDate = async () => {
		try {
			if (password.length !== 6 && requiredPassword) {
				toast.error("Please enter a 6 character password");
				return;
			}

			setIsUploading(true);
			toast.loading("Uploading your data...");

			const deleteOn = new Date();
			deleteOn.setDate(deleteOn.getDate() + 1);

			const formData = new FormData();

			formData.append("textContent", textContent);
			formData.append("isPasswordProtected", String(requiredPassword));
			formData.append("password", password);
			formData.append("deleteDate", deleteOn.toISOString());

			files.forEach((file) => {
				formData.append(file.name, file);
			});

			const code = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});
			const resolvedCode = await code.json();

			toast.dismiss();
			router.push(`/code?code=${resolvedCode.code}`);
			setIsText(false);
			setTextContent("");
			setIsFiles(false);
		} catch (error) {
			console.error(error);
			toast.error(error);
		} finally {
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

	const currentUploadedFilesSize =
		files
			.map((f) => f.size)
			.reduce((total, current) => total + current, 0) > uploadLimit;

	const isButtonDisabled =
		!(isText || isFiles) ||
		!(textContent.length || files.length) ||
		(password.length !== 6 && requiredPassword);
	console.log(isText);
	return (
		<div className="w-screen h-screen bg-gray-100 overflow-scroll">
			<div className="text-4xl py-5 text-center font-bold font-sans">
				Upload files
			</div>
			<div className="text-xl py-5 w-5/6 md:w-3/4 font-sans flex mx-auto justify-center mb-10 text-center">
				Your data will be uploaded anonymously and will be deleted
				automatically after 24 hours
			</div>
			<div className="flex mx-auto w-5/6 md:w-1/2 flex-col">
				<div
					className={`neumorphism-component cursor-pointer p-2 ${
						!isText ? "disable-neumorphism" : " pb-0 z-0"
					}`}
					onClick={() => setIsText(true)}
				>
					<div className="flex justify-between items-center">
						Do you have text content that you want to share?{" "}
						{isText && (
							<Button
								onClick={(e) => {
									setIsText(false);
									setTextContent("");
									e.stopPropagation();
								}}
								rounded={true}
								className="p-1"
								icon={
									<svg
										className="h-4 w-4 rounded-full"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
									>
										<g data-name="Layer 2">
											<g data-name="close">
												<rect
													width="24"
													height="24"
													transform="rotate(180 12 12)"
													opacity="0"
												/>
												<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
											</g>
										</g>
									</svg>
								}
							/>
						)}
					</div>
					{isText && (
						<textarea
							disabled={isUploading}
							value={textContent}
							onChange={(e) => setTextContent(e.target.value)}
							className="form-textarea resize-y rounded-md w-full max-w-full z-10 mt-2"
							onClick={(e) => e.stopPropagation()}
						/>
					)}
				</div>
				<div
					className={`neumorphism-component cursor-pointer p-2 mt-4 ${
						!isFiles ? "disable-neumorphism" : "z-0"
					}`}
					onClick={() => setIsFiles(true)}
				>
					<div className="flex justify-between items-center">
						Do you have text content that you want to share?{" "}
						{isFiles && (
							<Button
								onClick={(e) => {
									setIsFiles(false);
									setFiles([]);
									e.stopPropagation();
								}}
								rounded={true}
								className="p-1"
								icon={
									<svg
										className="h-4 w-4 rounded-full"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
									>
										<g data-name="Layer 2">
											<g data-name="close">
												<rect
													width="24"
													height="24"
													transform="rotate(180 12 12)"
													opacity="0"
												/>
												<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
											</g>
										</g>
									</svg>
								}
							/>
						)}
					</div>
					{isFiles && (
						<>
							<NeumorphismWrapper className="mx-auto my-4">
								<div className="flex w-max mx-auto items-center justify-center">
									<label className="w-64 flex flex-col items-center px-4 py-6 bg-gray-100 uppercase rounded-md">
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
							</NeumorphismWrapper>

							<div className="flex flex-col justify-center max-h-80 overflow-y-auto">
								{files &&
									Object.values(files)?.map((file, index) => (
										<div
											key={index}
											className=" my-1 flex items-center max-w-5/6 md:w-4/5 p-1 m-auto upload-files border border-gray-300 rounded-sm"
										>
											<div className=" overflow-hidden px-1 w-56 sm:w-auto whitespace-pre overflow-ellipsis rounded-sm bg-white">
												{file.name
													.split(".")
													.slice(0, -1)
													.join(".")}
											</div>
											<div className="w-10 ml-2 rounded-sm px-1  flex items-center bg-white">
												{file.name.split(".").slice(-1)}
											</div>
											<NeumorphismWrapper
												className="w-min ml-2 rounded-sm p-1 flex items-center bg-white cursor-pointer"
												onClick={() =>
													removeFile(index)
												}
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
											</NeumorphismWrapper>
										</div>
									))}
							</div>
						</>
					)}
				</div>

				<div className="my-6">
					Require password:{" "}
					<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ml-6">
						<input
							type="checkbox"
							name="toggle"
							id="toggle"
							checked={requiredPassword}
							onChange={(e) => {
								if (!e.target.checked) {
									setPassword("");
								}
								setRequirePassword(e.target.checked);
							}}
							className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer outline-none"
						/>
						<label
							htmlFor="toggle"
							className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
						></label>
					</div>
				</div>

				{requiredPassword && (
					<div className="my-6">
						<OtpInput
							value={password}
							onChange={(e) => {
								setPassword(e);
							}}
							className="m-auto"
							shouldAutoFocus={true}
							numInputs={6}
							isDisabled={isUploading}
							inputStyle={{
								height: "4rem",
								width: "3rem",
								marginRight: "1rem",
								fontSize: "2rem",
								border: "1px solid",
								borderRadius: "5px",
							}}
							disabledStyle={{
								border: "1px solid #8e8e8e",
								color: "#8e8e8e",
								backgroundColor: "#dedede",
							}}
						/>
					</div>
				)}

				<div className="w-full bg-gray-200 h-0.5 mt-3 rounded-sm" />
				<Button
					className="my-5 mx-auto"
					disabled={isButtonDisabled}
					loading={isUploading}
					onClick={uploadDate}
				>
					Upload
				</Button>
			</div>
			<Toaster />
		</div>
	);
};

export default Upload;
