import React, { FormEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Input from "../components/Input";
import Button from "../components/Button";
import Heading from "../components/Text/Heading";
import Paragraph from "../components/Text/Paragraph";

const Home = () => {
	const router = useRouter();

	const [code, setCode] = useState<string>("");

	const handleFormSubmit = (e?: { preventDefault: () => void }) => {
		e?.preventDefault();
		if (code.length !== 6) {
			toast.error("Invalid code");
			return;
		}

		const uppercaseCode = code.toUpperCase();

		router.push(`/read?code=${uppercaseCode}`);
	};

	useEffect(() => {
		return () => {
			setCode("");
		};
	}, []);

	return (
		<>
			<Heading>Sendthis.one</Heading>
			<Paragraph>Share files and text anonymously.</Paragraph>
			<div className="flex mt-10 items-center justify-center ">
				<Link href="/upload">
					<div className="h-80 w-80 border border-primaryColor transition-all hover:bg-primaryColor hover:text-primaryTextColor rounded-lg cursor-pointer flex items-center justify-center">
						<div className="text-4xl text-center font-semibold p-4">
							Upload
						</div>
					</div>
				</Link>
				<div className="mx-4">or</div>
				<Link href="/scan">
					<div className="h-80 w-80 border border-primaryColor transition-all hover:bg-primaryColor hover:text-primaryTextColor rounded-lg cursor-pointer flex items-center justify-center">
						<div className="text-4xl text-center font-semibold p-4">
							Scan & Download
						</div>
					</div>
				</Link>
			</div>
			<div className="text-center my-8">
				Or if you have the unique code for downloading files, <br />
			</div>
			<form onSubmit={handleFormSubmit}>
				<div className="flex items-center">
					<input
						type="text"
						name="email"
						id="email"
						className="w-36 shadow-sm focus:border-primaryColor block sm:text-sm border-gray-300 rounded-md focus:ring-primaryColor uppercase"
						placeholder="6-digit code"
						onChange={(e) =>
							e.target.value.length <= 6 &&
							setCode(e.target.value)
						}
						value={code}
					/>
					<Button
						onClick={handleFormSubmit}
						disabled={code.length !== 6}
						className="ml-6"
					>
						Submit
					</Button>
				</div>
			</form>
			<Toaster />
		</>
	);
};

export default Home;
