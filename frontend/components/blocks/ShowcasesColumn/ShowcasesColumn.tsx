import styled from 'styled-components';

const ShowcasesColumnWrapper = styled.section`
	grid-column: span 3;
`;

const ShowcasesColumn = () => {
	return (
		<ShowcasesColumnWrapper className="column">
			ShowcasesColumn
		</ShowcasesColumnWrapper>
	);
};

export default ShowcasesColumn;
