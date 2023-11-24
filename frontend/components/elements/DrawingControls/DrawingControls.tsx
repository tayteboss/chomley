import styled from 'styled-components';

const DrawingControlsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const Button = styled.button``;

const DrawingControls = () => {
	return (
		<DrawingControlsWrapper>
			<Button>Drawing [off]</Button>
			<Button>Reset</Button>
		</DrawingControlsWrapper>
	);
};

export default DrawingControls;
