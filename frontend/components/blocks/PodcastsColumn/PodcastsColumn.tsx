import styled from 'styled-components';
import { PodcastType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import PodcastCard from '../../elements/PodcastCard';

type StyledProps = {
	$columnWidth: number;
};

type Props = {
	data: PodcastType[];
	columnWidth: number;
};

const PodcastsColumnWrapper = styled.section`
	grid-column: span 3;
	position: relative;
`;

const ColumnHeader = styled.div<StyledProps>`
	position: fixed;
	top: 0;
	left: calc(75% + 0.25rem);
	width: ${(props) => props.$columnWidth}px;
`;

const TitleWrapper = styled.div`
	padding: ${pxToRem(16)} 0;
	background: var(--colour-grey);
	width: 100%;
`;

const Title = styled.h2``;

const CardsWrapper = styled.div`
	margin-top: calc(30vh - 48px + 16px);
`;

const PodcastsColumn = (props: Props) => {
	const {
		data,
		columnWidth
	} = props;

	const hasData = data && data.length > 0;

	return (
		<PodcastsColumnWrapper className="column hide-scrollbar">
			<ColumnHeader
				className="column__header"
				$columnWidth={columnWidth}
			>
				<TitleWrapper>
					<Title>Podcasts</Title>
				</TitleWrapper>
			</ColumnHeader>
			<CardsWrapper>
				{hasData && data.map((item, i) => (
					<PodcastCard
						title={item.title}
						date={item.date}
						formattedDate={item.formattedDate}
						excerpt={item.excerpt}
						indexYear={item.indexYear}
						link={item.link}
						linkTitle={item.linkTitle}
						key={i}
					/>
				))}
			</CardsWrapper>
		</PodcastsColumnWrapper>
	);
};

export default PodcastsColumn;
