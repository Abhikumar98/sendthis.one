/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

interface Props {
	readonly disabled?: boolean;
	readonly value: boolean;
	readonly onChange: (value: boolean) => void;
	readonly className?: string;
}

const RadioWrapper = styled.label<Partial<Props>>`
	div {
		width: 3rem;
		height: 1.5rem;
		background: var(--light-bg);
		border-radius: 50px;
		position: relative;
		border: 2px solid white;
		box-shadow: var(--box-shadow);

		&::after {
			content: "";
			position: absolute;
			top: 10%;
			left: ${(props) => (!props.value ? "6%" : "")};
			right: ${(props) => (props.value ? "6%" : "")};
			height: 1rem;
			width: 1rem;
			background: ${(props) => (props.value ? "#6b7280" : "white")};
			border-radius: 50%;
			transform: all 300ms ease-in-out;
			box-shadow: ${(props) =>
				props.value
					? "-3px 0px 5px 0px #c7c7c7, 1px 1px 3px #d8d8d8"
					: "3px 0px 5px 0px #c7c7c7"};
		}
		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: white;
			border-radius: 50px;
			transform: all 300ms ease-in-out;
			box-shadow: var(--box-shadow-inset);
		}
	}

	&:hover {
		cursor: pointer;
	}

	input {
		display: none;
	}
`;

const Radio: React.FC<Props> = (props) => {
	return (
		<RadioWrapper
			value={props.value}
			htmlFor="toggle"
			className={`${props.className ?? ""}`}
		>
			<input
				type="checkbox"
				name="toggle"
				id="toggle"
				checked={props.value}
				onChange={(e) => props.onChange(e.target.checked)}
			/>
			<div />
		</RadioWrapper>
	);
};

export default Radio;
