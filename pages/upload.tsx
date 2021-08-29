import React, { useEffect, useState } from "react";
import { dataCollectionRef } from "../lib/firebase";
import firebase from "firebase";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import OtpInput from "react-otp-input";

import { DocumentData, uploadLimit } from "../contracts";
import Button from "../components/Button";
import NeumorphismWrapper from "../components/NeumorphismWrapper";
import Radio from "../components/Radio";
import Heading from "../components/Text/Heading";
import Paragraph from "../components/Text/Paragraph";
import Switch from "../components/Switch";
import Image from "next/image";
import Link from "next/link";
import SubTitle from "../components/Text/SubTitle";

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
			deleteOn.setHours(deleteOn.getHours() + 1);

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
			toast.error(
				typeof (error as any)?.message === "string"
					? (error as any).message
					: "Something went wrong while uploading the file"
			);
		} finally {
			setIsUploading(false);
		}
	};

	const handleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
		const allFields = value.target.files;

		if (!allFields) {
			return;
		}
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
		files.map((f) => f.size).reduce((total, current) => total + current, 0) >
		uploadLimit;

	const isButtonDisabled =
		!(isText || isFiles) ||
		!(textContent.length || files.length) ||
		(password.length !== 6 && requiredPassword);

	return (
		<div className="overflow-scroll">
			<SubTitle>Upload files</SubTitle>
			<Paragraph className="w-5/6 md:w-3/4 flex mx-auto justify-center mb-10 text-center">
				Your data will be uploaded anonymously and will be deleted automatically
				after 24 hours
			</Paragraph>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-5/6 sm:w-4/5 mx-auto md:w-full justify-between ">
				<div className={" rounded-lg p-2 pb-0 z-0"}>
					<div className="flex justify-between items-center my-5">
						<div className="relative flex items-start">
							<div className="flex items-center h-5">
								<input
									checked={isText}
									onChange={(e) => setIsText(e.target.checked)}
									id="text"
									aria-describedby="comments-description"
									name="text"
									type="checkbox"
									className="h-4 w-4 text-textPrimaryColor border-gray-300 rounded outline-none"
								/>
							</div>
							<div className="ml-3 text-sm">
								<label
									htmlFor="text"
									className="font-medium text-textPrimaryColor cursor-pointer underline"
								>
									Upload text
								</label>
							</div>
						</div>
					</div>
					<div className="mt-1 sm:mt-0 sm:col-span-2">
						<textarea
							id="about"
							name="about"
							rows={3}
							className={`max-w-lg shadow-sm block w-full  sm:text-sm border border-gray-300 rounded-md ${
								isText ? "" : "opacity-50"
							} `}
							defaultValue={""}
							disabled={isUploading || !isText}
							value={textContent}
							onChange={(e) => setTextContent(e.target.value)}
							onClick={(e) => e.stopPropagation()}
						/>
					</div>
				</div>
				<div className={"rounded-lg p-2  "}>
					<div className="flex justify-between items-center my-5">
						<div className="relative flex items-start">
							<div className="flex items-center h-5">
								<input
									checked={isFiles}
									onChange={(e) => setIsFiles(e.target.checked)}
									id="files"
									aria-describedby="comments-description"
									name="files"
									type="checkbox"
									className="h-4 w-4 text-textPrimaryColor border-gray-300 rounded focus:outline-none"
								/>
							</div>
							<div className="ml-3 text-sm">
								<label
									htmlFor="files"
									className="font-medium text-textPrimaryColor cursor-pointer underline"
								>
									Upload files
								</label>
							</div>
						</div>
					</div>
					<div
						className={`mx-auto my-4 ${
							isFiles ? "" : "opacity-50 cursor-not-allowed pointer-events-none"
						}`}
					>
						<div className="flex w-full mx-auto items-center justify-center">
							<label className="w-full flex flex-col items-center px-4 py-6 bg-gray-100 hover:bg-gray-200 uppercase rounded-md">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
									/>
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
					</div>

					<div className="flex flex-col justify-center max-h-80 overflow-y-auto">
						<span>
							{isFiles && (
								<>
									{Object.values(files).length} file
									{Object.values(files).length > 1 ? "s" : ""} selected
								</>
							)}
							&nbsp;
						</span>
						{isFiles && files && (
							<>
								{!!Object.values(files).length && (
									<ul role="list" className="divide-y divide-gray-200 h-40">
										{Object.values(files)?.map((file, index) => (
											<li
												key={index}
												className="px-4 py-4 sm:px-0 flex items-center justify-between"
											>
												<div className="overflow-hidden px-1 sm:w-auto whitespace-pre overflow-ellipsis rounded-sm bg-white">
													{file.name}
												</div>
												<div
													className="bg-white cursor-pointer  border border-gray-300 rounded-md flex items-center"
													onClick={() => removeFile(index)}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														className="h-6 w-6"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>
												</div>
											</li>
										))}
									</ul>
								)}
							</>
						)}
					</div>
				</div>
			</div>
			<div className="flex justify-center flex-col items-start">
				<div className="my-6 flex w-5/6 sm:w-4/5 mx-auto md:w-full">
					Require password:{" "}
					<Switch
						className="ml-4"
						enabled={requiredPassword}
						onChange={(value) => {
							setRequirePassword(value);
							if (!value) {
								setPassword("");
							}
						}}
					/>
				</div>

				{requiredPassword && (
					<div className="mb-6 mx-auto md:mx-0 md:ml-2">
						<OtpInput
							value={password}
							onChange={(e: React.SetStateAction<string>) => setPassword(e)}
							className="w-8 sm:w-12 mr-4"
							shouldAutoFocus={true}
							numInputs={6}
							isDisabled={isUploading}
							inputStyle={{
								outline: "none",
								outlineOffset: "0",
								height: "4rem",
								width: "3rem",
								marginRight: "1rem",
								fontSize: "1.8rem",
								borderRadius: "6px",
								border: "3px solid var(--light-bg)",
							}}
							disabledStyle={{
								border: "1px solid #8e8e8e",
								color: "#8e8e8e",
								backgroundColor: "#dedede",
							}}
						/>
					</div>
				)}
			</div>

			<div className="w-full bg-gray-200 h-0.5 mt-3 rounded-sm" />
			<div className="flex justify-center">
				<Button
					className="my-5 mx-auto"
					disabled={isButtonDisabled}
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
