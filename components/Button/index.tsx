import React, { ButtonHTMLAttributes } from "react";

const Button: React.FC<
	ButtonHTMLAttributes<any> & {
		readonly className?: string;
	}
> = ({ children, className, disabled, ...rest }) => {
	return (
		<button
			type="button"
			disabled={disabled}
			{...rest}
			className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-buttonTextColor bg-buttonColor focus:outline-none transition-all ${
				disabled
					? "opacity-70 cursor-not-allowed shadow-none"
					: "hover:shadow-md"
			} ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
