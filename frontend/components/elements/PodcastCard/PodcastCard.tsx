import styled from 'styled-components';
import { PodcastType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { useEffect, useState } from 'react';
import useViewportWidth from '../../../hooks/useViewportWidth';

const PodcastCardWrapper = styled.div`
	margin-bottom: ${pxToRem(24)};

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		margin-bottom: ${pxToRem(32)};
	}
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

const Link = styled.a`
	cursor: pointer;
`;

const ContentWrapper = styled.div<{ $isActive: boolean }>`
	opacity: ${(props) => (props.$isActive ? 1 : 0)};
	cursor: default;
`;

const PodcastCard = (props: PodcastType) => {
	const { title, formattedDate, excerpt, link, linkTitle, date } = props;

	const year = date.slice(0, 4);

	const viewport = useViewportWidth();
	const isMobile = viewport === 'mobile';

	const [isHovered, setIsHovered] = useState(isMobile ? true : false);
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

	useEffect(() => {
		if (viewport === 'mobile') {
			setIsHovered(true);
		}
	}, [viewport]);

	return (
		<PodcastCardWrapper
			onMouseEnter={() => handleHover()}
			onMouseLeave={() => handleBlur()}
		>
			{title && <Title>{title}</Title>}
			<ContentWrapper $isActive={isHovered && hoverType === 'show'}>
				{excerpt && <Excerpt>{excerpt}</Excerpt>}
				{year && <Date>{year}</Date>}
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
