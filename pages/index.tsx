import React from "react";
import Link from "next/link";

const Home = () => {
	return (
		<div className="w-screen h-screen flex flex-col justify-center font-sans md:flex-row md:items-stretch">
			<Link href="/upload">
				<div className="md:w-1/2 h-screen bg-blue-500 flex justify-center items-center text-white font-bold text-4xl cursor-pointer hover:bg-blue-400">
					Share
				</div>
			</Link>
			<Link href="/scan">
				<div className="md:w-1/2 h-screen bg-yellow-400 flex justify-center items-center text-white font-bold text-4xl cursor-pointer hover:bg-yellow-300">
					Scan
				</div>
			</Link>
		</div>
	);
};

export default Home;
