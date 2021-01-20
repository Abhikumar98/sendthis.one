import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

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
					<button className="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
						Share
					</button>
				</Link>
				<Link href="/scan">
					<button className="bg-yellow-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
						Scan
					</button>
				</Link>
			</div>
			<div className="flex mt-10 items-center justify-center ">
				<input
					className="rounded-l-lg p-1 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white uppercase"
					placeholder="CODE"
					onChange={(e) => setCode(e.target.value)}
					value={code}
				/>
				<button
					onClick={handleSubmit}
					className="px-2 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-1 uppercase border-yellow-500 border-t border-b border-r"
				>
					Submit
				</button>
			</div>
			<Toaster />
		</div>
	);
};

export default Home;
