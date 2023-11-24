import styled from 'styled-components';
import { PodcastType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';

const PodcastCardWrapper = styled.div`
	margin-bottom: ${pxToRem(24)};
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

const Link = styled.a``;

const PodcastCard = (props: PodcastType) => {
	const {
		title,
		date,
		formattedDate,
		excerpt,
		link,
		linkTitle,
		indexYear
	} = props;

	return (
		<PodcastCardWrapper>
			{indexYear && (
				<Index>P{indexYear}</Index>
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
			{(link && linkTitle) && (
				<Link href={link} target="_blank">
					{linkTitle}
				</Link>
			)}
		</PodcastCardWrapper>
	);
};

export default PodcastCard;
