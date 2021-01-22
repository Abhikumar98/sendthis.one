import React from "react";
import styled from "styled-components";

interface Props {
	readonly className?: string;
	readonly placeholder?: string;
	readonly onChange?: (e: any) => void;
	readonly value?: string;
	readonly disabled?: boolean;
}

const InputWrapper = styled.div<Props>`
	width: 8rem;
	border-radius: var(--border-radius);
	position: relative;
	background: var(--light-bg);
	padding: 0.2rem;
	input {
		padding: 0.2rem 0.4rem;
		width: 100%;
		border-radius: 3px;
	}

	transition: all 200ms ease-in-out;
	&::before {
		content: "";
		opacity: ${(props) => (props.disabled ? "0" : "1")};
		border-radius: var(--border-radius);
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 3px 3px 4px 0px #bababa, -3px -4px 4px white;
		transition: all 200ms ease-in-out;
	}

	&:hover {
		cursor: pointer;
	}

	&::after {
		content: "";
		opacity: 0;
		border-radius: var(--border-radius);
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: none;
		background: transparent;
		transition: all 100ms ease-in-out;
	}
	${(props) =>
		props.disabled
			? ""
			: `&:focus-within {
                background: white;
                input{
                    background: white;
                }
		&::before {
			box-shadow: none;
			opacity: 0;
		}
		&::after {
			opacity: 1;
			box-shadow: var(--box-shadow-inset)
		}
	}`}
`;

const Input: React.FC<Props> = (props) => {
	return (
		<InputWrapper {...props}>
			<input {...props} />
		</InputWrapper>
	);
};

export default Input;
