import { useEffect, useState } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	drawingIsActive: boolean;
	setDrawingIsActive: (drawingIsActive: boolean) => void;
	handleResetPoints: () => void;
	handleSavePoints: () => void;
	hint: boolean | string;
};

const DrawingControlsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	pointer-events: all;
	margin-bottom: ${pxToRem(8)};
`;

const Container = styled.div`
	display: flex;
`;

const Button = styled.button`
	text-decoration: underline;

	&:hover {
		color: var(--colour-blue);
	}
`;

const Span = styled.span`
	white-space: pre;
`;

const Hint = styled.p`
	color: var(--colour-blue);
`;

const DrawingControls = (props: Props) => {
	const {
		drawingIsActive,
		hint,
		setDrawingIsActive,
		handleResetPoints,
		handleSavePoints
	} = props;

	const handleSavePointsClick = () => {
		handleSavePoints();
	};

	return (
		<DrawingControlsWrapper>
			<Container>
				<Button
					onClick={() => setDrawingIsActive(!drawingIsActive)}
				>
					Drawing mode
				</Button>
				<Span>{" "}[{drawingIsActive ? 'on' : 'off'}]</Span>
			</Container>
			<Container>
				<Button
					onClick={() => handleSavePointsClick()}
				>
					Save
				</Button>
				<Span>,{" "}</Span>
				<Button
					onClick={() => handleResetPoints()}
				>
					Reset
				</Button>
				<Span>{" "}</Span>
				{hint && (
					<Hint>{hint}</Hint>
				)}
			</Container>
		</DrawingControlsWrapper>
	);
};

export default DrawingControls;
