import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { GigType } from '../../../shared/types/types';
import ShowcaseCard from '../../elements/ShowcaseCard';

type StyledProps = {
	$columnWidth: number;
};

type Props = {
	data: GigType[];
	columnWidth: number;
};

const GigsColumnWrapper = styled.section`
	grid-column: span 3;
	position: relative;
`;

const ColumnHeader = styled.div<StyledProps>`
	position: fixed;
	top: 0;
	left: calc(50vw + 0.5rem);
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

const GigsColumn = (props: Props) => {
	const {
		data,
		columnWidth
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
						key={i}
					/>
				))}
			</CardsWrapper>
		</GigsColumnWrapper>
	);
};

export default GigsColumn;
