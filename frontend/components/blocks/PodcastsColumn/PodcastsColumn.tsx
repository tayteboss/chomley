import styled from 'styled-components';

const PodcastsColumnWrapper = styled.section`
	grid-column: span 3;
`;

const PodcastsColumn = () => {
	return (
		<PodcastsColumnWrapper className="column">
			PodcastsColumn
		</PodcastsColumnWrapper>
	);
};

export default PodcastsColumn;
