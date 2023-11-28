import styled from 'styled-components';

type Props = {
	contributions: number;
	lastUpdated: string | null;
};

const StatsWrapper = styled.div`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const Title = styled.p``;

const Stats = (props: Props) => {
	const {
		contributions,
		lastUpdated
	} = props;

	const isLoading = contributions === 0 && lastUpdated === null;

	return (
		<StatsWrapper>
			{isLoading ? (
				<Title>Loading...</Title>
			) : (
				<>
					<Title>Last update [{lastUpdated}]</Title>
					<Title>Contributions [{contributions}]</Title>
				</>
			)}
		</StatsWrapper>
	);
};

export default Stats;
