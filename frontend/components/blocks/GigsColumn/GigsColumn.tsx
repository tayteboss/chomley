import styled from 'styled-components';

const GigsColumnWrapper = styled.section`
	grid-column: span 3;
`;

const GigsColumn = () => {
	return (
		<GigsColumnWrapper className="column">
			GigsColumn
		</GigsColumnWrapper>
	);
};

export default GigsColumn;
