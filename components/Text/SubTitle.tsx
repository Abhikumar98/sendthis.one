import React from "react";

const SubTitle: React.FC<{
	readonly className?: string;
}> = ({ children, className }) => {
	return (
		<h1
			className={`text-center text-textPrimaryColor mt-8 text-2xl font-semibold ${className}`}
		>
			{children}
		</h1>
	);
};

export default SubTitle;
