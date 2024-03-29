import React from "react";

const Heading: React.FC<{
	readonly className?: string;
}> = ({ children, className }) => {
	return (
		<h1
			className={`text-center text-textPrimaryColor mt-10 text-5xl font-bold ${className}`}
		>
			{children}
		</h1>
	);
};

export default Heading;
