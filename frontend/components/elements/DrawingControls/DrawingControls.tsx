import { useEffect, useState } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	drawingIsActive: boolean;
	setDrawingIsActive: (drawingIsActive: boolean) => void;
	handleResetPoints: () => void;
	handleSavePoints: () => void;
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
		setDrawingIsActive,
		drawingIsActive,
		handleResetPoints,
		handleSavePoints
	} = props;

	const [hint, setHint] = useState('');

	const handleSavePointsClick = () => {
		handleSavePoints();
		setHint('Saved');
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setHint('');
		}, 3000);

		return () => {
			clearTimeout(timeout);
		}
	}, [hint]);

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
				{hint.length > 0 && (
					<Hint>{hint}</Hint>
				)}
			</Container>
		</DrawingControlsWrapper>
	);
};

export default DrawingControls;
