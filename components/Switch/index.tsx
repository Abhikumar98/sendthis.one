import React from "react";
import { useState } from "react";
import { Switch as HSwitch } from "@headlessui/react";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

const Switch: React.FC<{
	readonly enabled: boolean;
	readonly className?: string;
	readonly onChange: (value: boolean) => void;
}> = ({ enabled, onChange, className }) => {
	return (
		<HSwitch
			checked={enabled}
			onChange={onChange}
			className={`flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
		>
			<span className="sr-only">Use setting</span>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute bg-white w-full h-full rounded-md"
			/>
			<span
				aria-hidden="true"
				className={classNames(
					enabled ? "bg-primaryColor" : "bg-gray-200",
					"pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200"
				)}
			/>
			<span
				aria-hidden="true"
				className={classNames(
					enabled ? "translate-x-5" : "translate-x-0",
					"pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200"
				)}
			/>
		</HSwitch>
	);
};

export default Switch;
