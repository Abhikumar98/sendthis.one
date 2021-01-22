/* eslint-disable react/prop-types */
import React, { ReactNode } from "react";
import styled from "styled-components";
import { ButtonType } from "../contracts/styles";

interface Props {
	readonly disabled?: boolean;
	readonly loading?: boolean;
	readonly type?: ButtonType;
	readonly children?: ReactNode;
	readonly icon?: ReactNode;
	readonly onClick?: (e?: any) => void;
	readonly className?: string;
	readonly rounded?: boolean;
}

const ButtonWrapper = styled.button<Props>`
	background: var(--light-bg);
	padding: ${(props) => (props.rounded ? "0.5rem" : "0.25rem 1rem")};
	width: max-content;
	border-radius: ${(props) => (props.rounded ? "50%" : "6px")};
	position: relative;
	display: flex;
	align-items: center;
	cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
	&::before {
		content: "";
		opacity: ${(props) => (props.disabled ? "0" : "1")};
		border-radius: ${(props) => (props.rounded ? "50%" : "6px")};
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 3px 3px 4px 0px #bababa, -3px -4px 4px white;
		transition: all 200ms ease-in-out;
	}

	&::after {
		content: "";
		opacity: 0;
		border-radius: ${(props) => (props.rounded ? "50%" : "6px")};
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: none;
		background: transparent;
		transition: all 100ms ease-in-out;
	}

	&:hover {
		&::before {
			box-shadow: var(--box-shadow-hover);
		}
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
			box-shadow: inset 3px 3px 4px 0px #bababa,
				inset -3px -3px 4px #f9f9f9;
		}
	}`}

	&:focus {
		outline: none;
	}
`;

const Button: React.FC<Props> = (props) => {
	return (
		<ButtonWrapper
			onClick={props.onClick}
			className={`text-gray-500 ${props.className}`}
			disabled={props.disabled}
			rounded={props.rounded}
		>
			{props.loading && (
				<svg
					className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500 loader"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			)}
			{props.children ?? props.icon}
		</ButtonWrapper>
	);
};

export default Button;
