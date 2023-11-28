import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { GigType, MuxVideoType } from '../../../shared/types/types';
import ShowcaseCard from '../../elements/ShowcaseCard';

type StyledProps = {
	$columnWidth: number;
};

type Props = {
	data: GigType[];
	columnWidth: number;
	drawingIsActive: boolean;
	setVideoData: (setVideoData: string | boolean) => void;
};

const GigsColumnWrapper = styled.section`
	grid-column: span 3;
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		border-bottom: 1px solid var(--colour-black);
		width: 100%;
	}
`;

const ColumnHeader = styled.div<StyledProps>`
	position: fixed;
	top: 0;
	left: calc(50vw + 0.5rem);
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
		padding: ${pxToRem(16)} ${pxToRem(16)};
		width: 100%;
	}
`;

const GigsColumn = (props: Props) => {
	const {
		data,
		columnWidth,
		drawingIsActive,
		setVideoData
	} = props;

	const hasData = data && data.length > 0;

	return (
		<GigsColumnWrapper className="column hide-scrollbar">
			<ColumnHeader
				className="column__header"
				$columnWidth={columnWidth}
			>
				<TitleWrapper>
					<Title>Gigs</Title>
				</TitleWrapper>
			</ColumnHeader>
			<CardsWrapper>
				{hasData && data.map((item, i) => (
					<ShowcaseCard
						title={item.title}
						date={item.date}
						formattedDate={item.formattedDate}
						artists={item.artists}
						credits={item.credits}
						excerpt={item.excerpt}
						location={item.location}
						locationUrl={item.locationUrl}
						indexYear={item.indexYear}
						indexYearPrefix='G'
						drawingIsActive={drawingIsActive}
						setVideoData={setVideoData}
						key={i}
					/>
				))}
			</CardsWrapper>
		</GigsColumnWrapper>
	);
};

export default GigsColumn;
