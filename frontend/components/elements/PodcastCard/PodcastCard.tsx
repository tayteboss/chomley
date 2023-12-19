import styled from 'styled-components';
import { PodcastType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { useState } from 'react';

const PodcastCardWrapper = styled.div`
	margin-bottom: ${pxToRem(24)};
`;

const Index = styled.h4`
	margin-bottom: ${pxToRem(8)};
	font-size: ${pxToRem(28)};
	font-family: var(--font-sans-text);
`;

const Title = styled.p`
	margin-bottom: ${pxToRem(8)};
`;

const Excerpt = styled.p`
	margin-bottom: ${pxToRem(8)};
`;

const Date = styled.p`
	margin-bottom: ${pxToRem(8)};
`;

const Link = styled.a``;

const ContentWrapper = styled.div<{ $isActive: boolean }>`
	opacity: ${(props) => (props.$isActive ? 1 : 0)};
`;

const PodcastCard = (props: PodcastType) => {
	const { title, formattedDate, excerpt, link, linkTitle } = props;

	const [isHovered, setIsHovered] = useState(false);
	const [hoverType, setHoverType] = useState('show');

	const randomSetHoverType = () => {
		if (hoverType === 'none') {
			setHoverType('show');
		} else {
			setHoverType('none');
		}
	};

	const handleHover = () => {
		setIsHovered(true);
	};

	const handleBlur = () => {
		randomSetHoverType();
	};

	return (
		<PodcastCardWrapper
			onMouseEnter={() => handleHover()}
			onMouseLeave={() => handleBlur()}
		>
			{title && <Title>{title}</Title>}
			{formattedDate && <Date>{formattedDate}</Date>}
			<ContentWrapper $isActive={isHovered && hoverType === 'show'}>
				{excerpt && <Excerpt>{excerpt}</Excerpt>}
				{link && linkTitle && (
					<Link href={link} target="_blank">
						{linkTitle}
					</Link>
				)}
			</ContentWrapper>
		</PodcastCardWrapper>
	);
};

export default PodcastCard;
