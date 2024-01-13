import styled from 'styled-components';
import { ShowcaseType } from '../../../shared/types/types';
import Credits from '../../blocks/Credits';
import Artists from '../../blocks/Artists';
import pxToRem from '../../../utils/pxToRem';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MuxPlayer from '@mux/mux-player-react';
import useViewportWidth from '../../../hooks/useViewportWidth';
import { format } from 'date-fns';

const ShowcaseCardWrapper = styled.div`
	margin-bottom: ${pxToRem(24)};
	position: relative;
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(8)};

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		margin-bottom: ${pxToRem(32)};
	}
`;

const Title = styled.p``;

const Excerpt = styled.p``;

const Date = styled.p``;

const Link = styled.a`
	display: inline-block;
	margin-bottom: ${pxToRem(8)};
	cursor: pointer;
`;

const Location = styled.p`
	margin-bottom: ${pxToRem(8)};
`;

const ContentWrapper = styled.div<{ $isActive: boolean }>`
	opacity: ${(props) => (props.$isActive ? 1 : 0)};
	pointer-events: all;
	cursor: default;
`;

const ImagesWrapper = styled.div<{ $isActive: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	opacity: ${(props) => (props.$isActive ? 1 : 0)};
	pointer-events: none;
`;

const ImageWrapper = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`;

const ImageInner = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	overflow: hidden;
`;

const VideoPlayerWrapper = styled.div<{ $isActive: boolean }>`
	opacity: ${(props) => (props.$isActive ? 1 : 0)};
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
	pointer-events: none;

	mux-player {
		height: 100%;
		width: 100%;
	}
`;

const ShowcaseCard = (props: ShowcaseType) => {
	const {
		title,
		artists,
		credits,
		excerpt,
		location,
		locationUrl,
		images,
		video,
		date
	} = props;

	const viewport = useViewportWidth();
	const isMobile = viewport === 'mobile';
	const year = date.slice(0, 4);

	const [isHovered, setIsHovered] = useState(isMobile ? true : false);
	const [hoverType, setHoverType] = useState('content');
	const [imageIndex, setImageIndex] = useState(0);
	const [count, setCount] = useState(0);

	const hasImages = images && images.length;
	const hasVideo = video && video?.asset?.playbackId;

	const setContentType = () => {
		if (hasVideo && hasImages) {
			if (count === 0) {
				setHoverType('content');
			} else if (count === 1) {
				setHoverType('image');
			} else {
				setHoverType('video');
			}
		} else if (hasVideo && !hasImages) {
			if (count === 0) {
				setHoverType('content');
			} else {
				setHoverType('video');
			}
		} else if (!hasVideo && hasImages) {
			if (count === 0) {
				setHoverType('content');
			} else {
				setHoverType('image');
			}
		} else {
			setHoverType('content');
		}
	};

	const randomSetImageIndex = () => {
		if (!hasImages) return;
		const random = Math.floor(Math.random() * images.length);
		setImageIndex(random);
	};

	const handleHover = () => {
		setIsHovered(true);
	};

	const handleBlur = () => {
		if (count > 1) {
			setCount(0);
		} else {
			setCount(count + 1);
		}
		randomSetImageIndex();
		setContentType();
	};

	useEffect(() => {
		if (viewport === 'mobile') {
			setIsHovered(true);
		}
	}, [viewport]);

	return (
		<ShowcaseCardWrapper
			onMouseEnter={() => handleHover()}
			onMouseLeave={() => handleBlur()}
		>
			{title && <Title>{title}</Title>}
			<VideoPlayerWrapper $isActive={isHovered && hoverType === 'video'}>
				{video?.asset?.playbackId && (
					<MuxPlayer
						streamType="on-demand"
						playbackId={video.asset.playbackId as string}
						autoPlay="muted"
						loop={true}
						thumbnailTime={0}
						preload="auto"
						muted
						playsInline={true}
					/>
				)}
			</VideoPlayerWrapper>
			<ImagesWrapper $isActive={isHovered && hoverType === 'image'}>
				{hasImages && (
					<ImageWrapper>
						<ImageInner>
							{images[imageIndex]?.asset?.url && (
								<Image
									src={images[imageIndex].asset.url}
									layout="fill"
									objectFit="cover"
								/>
							)}
						</ImageInner>
					</ImageWrapper>
				)}
			</ImagesWrapper>
			<ContentWrapper $isActive={isHovered && hoverType === 'content'}>
				{excerpt && <Excerpt>{excerpt}</Excerpt>}
				{year && <Date>{year}</Date>}
				{location && (
					<>
						{locationUrl ? (
							<Link href={locationUrl} target="_blank">
								{location}
							</Link>
						) : (
							<Location>{location}</Location>
						)}
					</>
				)}
				<Artists data={artists} />
				<Credits data={credits} />
			</ContentWrapper>
		</ShowcaseCardWrapper>
	);
};

export default ShowcaseCard;
