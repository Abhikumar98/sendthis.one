import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Input from "../components/Input";

const Home = () => {
	const router = useRouter();

	const [code, setCode] = useState<string>("");

	const handleSubmit = () => {
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
		<div className="w-screen h-screen ">
			<div className="flex mt-10 items-center justify-center ">
				<Link href="/upload">
					<Button>Share</Button>
				</Link>
				<div className="mx-4">or</div>
				<Link href="/scan">
					<Button>Scan</Button>
				</Link>
			</div>
			<div className="flex mt-10 items-center justify-center ">
				<Input
					className="uppercase"
					placeholder="6-digit code"
					onChange={(e) => setCode(e.target.value)}
					value={code}
				/>
				<Button onClick={handleSubmit} className="ml-4">
					Submit
				</Button>
			</div>
			<Toaster />
		</div>
	);
};

export default Home;
