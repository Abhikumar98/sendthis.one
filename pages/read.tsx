import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";
import DownloadFile from "downloadjs";
import TextareaAutosize from "react-textarea-autosize";
import filesize from "filesize";

import { DocumentData, PageStatus } from "../contracts";
import toast, { Toaster } from "react-hot-toast";
import firebase from "../lib/firebase";
import OtpInput from "react-otp-input";
import Button from "../components/Button";
import copy from "copy-to-clipboard";
import styled from "styled-components";
import Heading from "../components/Text/Heading";
import Paragraph from "../components/Text/Paragraph";
import SubTitle from "../components/Text/SubTitle";

const Loader = styled.div`
	display: flex;
	margin: auto;
	justify-content: center;
	margin-top: 5rem;
	position: relative;
	width: min-content;

	.loader {
		border-radius: 6px;
		margin-right: 1rem;
		height: 1rem;
		width: 2rem;
		background: var(--light-bg);
		height: 6rem;
		width: 6rem;
		border-radius: 50%;
		border: 0.5rem solid var(--light-bg);
		border-top-color: unset;

		&::before {
			content: "";
			position: absolute;
			top: 0;
			bottom: 0.5rem;
			left: 0;
			right: 0.25rem;
			height: 5rem;
			width: 5rem;
			border-radius: 50%;
			box-shadow: var(--box-shadow-inset);
			border-top: 1px solid;
		}

		&::after {
			content: "";
		}
	}

	.shadow {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: 6rem;
		width: 6rem;
		border-radius: 50%;
		box-shadow: 3px 3px 4px 0px #bababa, -3px -4px 4px white;
	}
	transform-origin: center center;

	.loader-1 {
		animation: loader-1 1200ms infinite ease-in-out;
	}
	// .loader-2 {
	// 	animation: loader-2 1200ms infinite;
	// }
	// .loader-3 {
	// 	animation: loader-3 1200ms infinite;
	// }
	// .loader-4 {
	// 	animation: loader-4 1200ms infinite;
	// }

	@keyframes loader-1 {
		to {
			transform: rotate(360deg);
		}
	}
	// @keyframes loader-1 {
	// 	0%,
	// 	25%,
	// 	100% {
	// 		height: 1rem;
	// 	}

	// 	12.5% {
	// 		height: 5rem;
	// 	}
	// }
	// @keyframes loader-2 {
	// 	0%,
	// 	12.5%,
	// 	37.5%,
	// 	100% {
	// 		height: 1rem;
	// 	}

	// 	25% {
	// 		height: 5rem;
	// 	}
	// }
	// @keyframes loader-3 {
	// 	0%,
	// 	37.5%,
	// 	62.5%,
	// 	100% {
	// 		height: 1rem;
	// 	}

	// 	50% {
	// 		height: 5rem;
	// 	}
	// }
	// @keyframes loader-4 {
	// 	0%,
	// 	62.5%,
	// 	87.5%,
	// 	100% {
	// 		height: 1rem;
	// 	}

	// 	75% {
	// 		height: 5rem;
	// 	}
	// }
`;

interface FilesMetadata {
	readonly name: string;
	readonly fullPath: string;
	readonly size: number;
	readonly contentType: string;
}

const Read = () => {
	const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.Idle);
	const [files, setFiles] = useState<FilesMetadata[]>([]);
	const [requiresPassword, setRequiresPassword] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [isIncorrectPassword, setIsIncorrectPassword] =
		useState<boolean>(false);
	const [checkingPassword, setCheckingPassword] = useState<boolean>(false);

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

			const queryCode = code["code"] as string;

			const data = await fetch(`/api/read?code=${queryCode}`);
			const parsedData = (await data.json()) as Partial<DocumentData>;

			if (parsedData.isPasswordProtected) {
				setRequiresPassword(true);
			} else {
				setData(parsedData as DocumentData);
				setRequiresPassword(false);
			}

			const firebaseStorageRef = firebase.storage().ref(parsedData.id);
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
		copy(data?.textContent ?? "");
		toast.success("Copied to clipboard");
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

	const checkPassword = async () => {
		try {
			setCheckingPassword(true);
			setIsIncorrectPassword(false);
			const code = queryString.parseUrl(router.asPath).query;
			const queryCode = code["code"] as string;
			const data = await fetch(
				`/api/password?code=${queryCode}&password=${password}`
			);
			const parsedData = await data.json();

			if (parsedData.message === "incorrect_password") {
				setIsIncorrectPassword(true);
			} else {
				setIsIncorrectPassword(false);
				setData(parsedData as DocumentData);
				const firebaseStorageRef = firebase.storage().ref(parsedData.id);
				const allFiles = await firebaseStorageRef.listAll();

				const promises = allFiles.items.map((file) => file.getMetadata());

				const result = await Promise.all(promises);
				setFiles(result);
				setPageStatus(PageStatus.Success);
				setRequiresPassword(false);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setCheckingPassword(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (
		pageStatus !== PageStatus.Loading &&
		(!data || !Object.keys(data).length) &&
		!requiresPassword
	) {
		return (
			<div className="h-full w-full flex flex-col justify-center items-center">
				<svg
					className="h-20 w-20"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
						clipRule="evenodd"
					/>
				</svg>
				<div className="font-bold m-5">
					The data you are looking for doesn&apos;t exist anymore.
				</div>
			</div>
		);
	}
	return (
		<>
			{requiresPassword ? (
				<div className="h-1/3 w-3/4 mt-40 m-auto flex items-center justify-around rounded-md flex-col">
					The contents here are password protected
					{isIncorrectPassword ? <div>Incorrect password</div> : <div />}
					<OtpInput
						value={password}
						onChange={(e: React.SetStateAction<string>) => {
							setPassword(e);
							setIsIncorrectPassword(false);
						}}
						shouldAutoFocus={true}
						numInputs={6}
						separator={<span></span>}
						isInputSecure={true}
						isDisabled={checkingPassword}
						hasErrored={isIncorrectPassword}
						errorStyle={{
							border: "1px solid red",
							color: "red",
						}}
						inputStyle={{
							height: "4rem",
							width: "3rem",
							marginRight: "1rem",
							fontSize: "1.8rem",
							borderRadius: "6px",
							border: "3px solid var(--light-bg)",
						}}
						className="w-12 mr-4"
						disabledStyle={{
							border: "1px solid #8e8e8e",
							color: "#8e8e8e",
							backgroundColor: "#dedede",
						}}
					/>
					<div className="flex">
						<Button
							className="mr-4"
							onClick={() => {
								setPassword("");
								setIsIncorrectPassword(false);
							}}
							disabled={checkingPassword}
						>
							Clear
						</Button>
						<Button onClick={checkPassword} disabled={checkingPassword}>
							Submit
						</Button>
					</div>
				</div>
			) : pageStatus === PageStatus.Idle ||
			  pageStatus === PageStatus.Loading ? (
				<Loader>
					<div className="loader loader-1" />
					<div className="shadow" />
					{/* <div className="loader loader-3" />
					<div className="loader loader-4" /> */}
				</Loader>
			) : (
				<div className="md:w-3/5 px-6 sm:w-4/5 w-full">
					<SubTitle>Shared data</SubTitle>
					<Paragraph></Paragraph>
					<div
						className={`grid ${
							!!data?.textContent && !!files.length
								? "grid-cols-1 md:grid-cols-2"
								: "grid-cols-auto"
						} gap-4 w-full`}
					>
						{!!data?.textContent?.length && (
							<div className="w-full">
								<div className="mb-4 text-sm">
									<label
										htmlFor="text"
										className="font-medium text-textPrimaryColor cursor-pointer underline"
									>
										<Paragraph className="underline mb-2">Text</Paragraph>
									</label>
								</div>
								<div className="w-full">
									<textarea
										id="about"
										name="about"
										rows={3}
										className={`shadow-sm block w-full  sm:text-sm border border-gray-300 rounded-md`}
										disabled={true}
										value={data.textContent}
										// defaultValue={""}
										// disabled={isUploading || !isText}
										// value={textContent}
										// onChange={(e) => setTextContent(e.target.value)}
										// onClick={(e) => e.stopPropagation()}
									/>
									{/* <TextareaAutosize
										maxRows={10}
										disabled={true}
										value={data.textContent}
										className="resize-none border border-gray-300 rounded-md w-full max-w-full"
									/> */}
								</div>
								<Button onClick={copyToClipboard} className="mx-auto my-4">
									Copy text
								</Button>
							</div>
						)}
						{!!files.length && (
							<div className="">
								<div className="text-sm">
									<label
										htmlFor="text"
										className="font-medium text-textPrimaryColor cursor-pointer underline"
									>
										<Paragraph className="underline mb-2">
											Download files
										</Paragraph>
									</label>
								</div>
								<div className="flex flex-col justify-center w-full">
									<ul
										role="list"
										className="divide-gray-200 h-80 my-4 overflow-y-auto"
									>
										{files?.map((file, index) => (
											<li
												key={index}
												className="px-4 mb-4 sm:px-0 flex items-center justify-between border border-gray-300 rounded-lg"
											>
												<div className=" overflow-hidden px-1 whitespace-pre overflow-ellipsis rounded-sm w-48 md:w-auto">
													{file.name}
												</div>
												<div className="flex items-center">
													<div className="w-max ml-2 rounded-sm px-1  flex items-center">
														{filesize(file.size)}
													</div>
													<div
														className="w-min m-1 rounded-lg p-1 flex items-center bg-gray-100 hover:bg-gray-200 cursor-pointer"
														onClick={() => downloadFile(file.fullPath, index)}
													>
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
																d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
															/>
														</svg>
													</div>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
			<Toaster />
		</>
	);
};

export default Read;
