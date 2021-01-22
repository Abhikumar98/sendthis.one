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
		box-shadow: var(--box-shadow);
		transition: all 100ms ease-in-out;
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
			: `&:active {
		&::before {
			box-shadow: none;
			opacity: 0;
		}
		&::after {
			opacity: 1;
			box-shadow: var(--box-shadow-inset)
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
