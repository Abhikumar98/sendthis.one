/* eslint-disable react/prop-types */
import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
	readonly disabled?: boolean;
	readonly children: ReactNode;
	readonly className?: string;
	readonly onClick?: (e?: any) => void;
}

const Wrapper = styled.div<Props>`
	background: #eaeaea;
	width: max-content;
	border-radius: 6px;
	position: relative;
	display: flex;
	align-items: center;
	cursor: pointer;
	&::before {
		content: "";
		opacity: ${(props) => (props.disabled ? "0" : "1")};
		border-radius: 6px;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 3px 3px 4px 0px #bababa, -3px -4px 4px white;
		transition: all 200ms ease-in-out;
		pointer-events: none;
	}

	&::after {
		content: "";
		opacity: 0;
		border-radius: 6px;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: none;
		background: transparent;
		transition: all 100ms ease-in-out;
		pointer-events: none;
	}
	${(props) =>
		props.disabled
			? ""
			: `&:hover {
		&::before {
			box-shadow: none;
			opacity: 0;
		}
		&::after {
			opacity: 1;
			box-shadow: inset 3px 3px 4px 0px #bababa,
				inset -3px -3px 4px #f9f9f9;
		}
	}`}
	&:focus {
		outline: none;
	}
`;
const NeumorphismWrapper: React.FC<Props> = (props) => {
	return (
		<Wrapper
			onClick={props.onClick}
			disabled={props.disabled}
			className={props.className}
		>
			{props.children}
		</Wrapper>
	);
};

export default NeumorphismWrapper;
