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
			<div className="text m-4 sm:m-6 md:mx-20 md:my-8">
				<div>Hey there ! 👋 </div>
				<div>
					Looking to share data without sharing your personal
					information ?
				</div>
				<div className="font-semibold my-2">
					{" "}
					Well you came to the right place ✨
				</div>
				<div>
					With <b>ShareWithMe</b> you can share your data let it be
					any file or text with anyone without sharing any personal
					contact information ! 💯 anonymous
				</div>
				<div>
					You don&apos;t have to share it with us as well.
					<ul className="my-4">
						<li>↪ Upload</li>
						<li>↪ Set a password ( optional )</li>
						<li>↪ Get the qr code and unique code</li>
						<li>↪ Share </li>
					</ul>
					and done !
				</div>
				<div>
					Also, we won't keep your data forever either. Set a time
					after which you want to delete your data and *swish* its
					gone
				</div>
			</div>

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
