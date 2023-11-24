import styled from 'styled-components';
import ShowcaseCard from '../../elements/ShowcaseCard';
import { ShowcaseType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { useEffect, useRef, useState } from 'react';

type StyledProps = {
	$columnWidth: number;
};

type Props = {
	data: ShowcaseType[];
	columnWidth: number;
	setColumnWidth: (columnWidth: number) => void;
};

const ShowcasesColumnWrapper = styled.section`
	grid-column: span 3;
	position: relative;
`;

const ColumnHeader = styled.div<StyledProps>`
	position: fixed;
	top: 0;
	left: calc(25% + 0.75rem);
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

const ShowcasesColumn = (props: Props) => {
	const {
		data,
		columnWidth,
		setColumnWidth
	} = props;

	const hasData = data && data.length > 0;

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref && ref.current) {
			setColumnWidth(ref.current.offsetWidth);
		}
	}, []);

	return (
		<ShowcasesColumnWrapper
			className="column hide-scrollbar"
			ref={ref}
		>
			<ColumnHeader
				className="column__header"
				$columnWidth={columnWidth}
			>
				<TitleWrapper>
					<Title>Showcases</Title>
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
						indexYearPrefix='S'
						key={i}
					/>
				))}
			</CardsWrapper>
		</ShowcasesColumnWrapper>
	);
};

export default ShowcasesColumn;
