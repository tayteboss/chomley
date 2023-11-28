import styled from 'styled-components';
import { ShowcaseType } from '../../../shared/types/types';
import Credits from '../../blocks/Credits';
import Artists from '../../blocks/Artists';
import pxToRem from '../../../utils/pxToRem';

const ShowcaseCardWrapper = styled.div<{ $drawingIsActive: boolean }>`
	margin-bottom: ${pxToRem(24)};
	pointer-events: ${(props) => props.$drawingIsActive ? 'none' : 'all'};
`;

const Index = styled.h4`
	margin-bottom: ${pxToRem(8)};
	font-size: ${pxToRem(28)};
	font-family: var(--font-sans-text);
`;

const Title = styled.h3`
	margin-bottom: ${pxToRem(8)};
	font-family: var(--font-mono-med);
`;

const Excerpt = styled.p`
	margin-bottom: ${pxToRem(8)};
`;

const Date = styled.p`
	margin-bottom: ${pxToRem(8)};
`;

const Link = styled.a`
	margin-bottom: ${pxToRem(8)};
	display: inline-block;
`;

const Location = styled.p`
	margin-bottom: ${pxToRem(8)};
`;

const ShowcaseCard = (props: ShowcaseType) => {
	const {
		title,
		date,
		formattedDate,
		artists,
		credits,
		excerpt,
		location,
		locationUrl,
		indexYear,
		indexYearPrefix,
		video,
		drawingIsActive,
		setVideoData
	} = props;

	return (
		<ShowcaseCardWrapper
			onMouseOver={() => setVideoData(video?.asset?.playbackId || false)}
			onMouseOut={() => setVideoData(false)}
			$drawingIsActive={drawingIsActive}
		>
			{indexYear && (
				<Index>{indexYearPrefix}{indexYear}</Index>
			)}
			{title && (
				<Title>{title}</Title>
			)}
			{excerpt && (
				<Excerpt>{excerpt}</Excerpt>
			)}
			{formattedDate && (
				<Date>{formattedDate}</Date>
			)}
			{location && (
				<>
					{locationUrl ? (
						<Link
							href={locationUrl}
							target="_blank"
						>
							{location}
						</Link>
					) : (
						<Location>{location}</Location>
					)}
				</>
			)}
			<Artists data={artists} />
			<Credits data={credits} />
		</ShowcaseCardWrapper>
	);
};

export default ShowcaseCard;
