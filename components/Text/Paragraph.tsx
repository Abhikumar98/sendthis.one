import React from "react";

const Paragraph: React.FC<{
	readonly className?: string;
}> = ({ children, className }) => {
	return (
		<h5 className={`text-center my-6 text-xl ${className}`}>{children}</h5>
	);
};

export default Paragraph;
