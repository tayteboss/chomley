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
	background: var(--colour-dark-grey);
	color: var(--colour-grey);
	border-radius: 100px;
	margin-top: ${pxToRem(4)};
	padding: 0 ${pxToRem(8)} ${pxToRem(1)};
	font-size: ${pxToRem(10)};
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
		setHint('Saved artwork');
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setHint('');
		}, 4000);

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
			</Container>
			{hint.length > 0 && (
				<Hint>{hint}</Hint>
			)}
		</DrawingControlsWrapper>
	);
};

export default DrawingControls;
