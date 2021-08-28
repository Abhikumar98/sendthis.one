import React from "react";

const Heading: React.FC = ({ children }) => {
	return (
		<h1 className="text-center text-textPrimaryColor mt-20 text-5xl font-bold">
			{children}
		</h1>
	);
};

export default Heading;
