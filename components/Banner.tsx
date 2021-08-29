import Link from "next/link";
import Image from "next/image";
import React from "react";
import Heading from "./Text/Heading";

export const Banner = () => {
	return (
		<span className="cursor-pointer">
			<Heading>
				<span className="mr-8">
					<Image
						src="/logo.svg"
						height={56}
						width={56}
						alt="sendthis.one logo"
					/>
				</span>
				<Link href="/">Sendthis.one</Link>
			</Heading>
		</span>
	);
};
