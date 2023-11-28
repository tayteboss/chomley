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
	drawingIsActive: boolean;
	setImageData: (images: string | boolean) => void;
};

const PodcastsColumnWrapper = styled.section`
	grid-column: span 3;
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		border-bottom: 1px solid var(--colour-black);
	}
`;

const ColumnHeader = styled.div<StyledProps>`
	position: fixed;
	top: 0;
	left: calc(75% + 0.25rem);
	width: ${(props) => props.$columnWidth}px;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		position: sticky;
		top: 0;
		left: unset;
		width: 100%;
		z-index: 10;
	}
`;

const TitleWrapper = styled.div`
	padding: ${pxToRem(16)} 0;
	background: var(--colour-grey);
	width: 100%;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(16)};
		border-bottom: 1px solid var(--colour-black);
	}
`;

const Title = styled.h2``;

const CardsWrapper = styled.div`
	margin-top: calc(30vh - 48px + 16px);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-top: 0;
		padding: ${pxToRem(16)} ${pxToRem(16)} 0;
	}
`;

const PodcastsColumn = (props: Props) => {
	const {
		data,
		columnWidth,
		drawingIsActive,
		setImageData
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
						images={item.images}
						drawingIsActive={drawingIsActive}
						setImageData={setImageData}
						key={i}
					/>
				))}
			</CardsWrapper>
		</PodcastsColumnWrapper>
	);
};

export default PodcastsColumn;
