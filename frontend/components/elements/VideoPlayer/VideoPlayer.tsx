import MuxPlayer from '@mux/mux-player-react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: string | boolean;
};

const VideoPlayerWrapper = styled.div`
	position: absolute;
	bottom: ${pxToRem(13)};
	left: 0;
	padding-top: 100%;
	width: 100%;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}

	mux-player {
		height: 100%;
		width: 100%;
		aspect-ratio: 1 / 1;
	}
`;

const VideoPlayer = (props: Props) => {
	const {
		data
	} = props;

	return (
		<>
			{data && (
				<VideoPlayerWrapper>
					<MuxPlayer
						streamType="on-demand"
						playbackId={data as string}
						autoPlay="muted"
						loop={true}
						thumbnailTime={0}
						preload="auto"
						muted
						playsInline={true}
					/>
				</VideoPlayerWrapper>
			)}
		</>
	);
};

export default VideoPlayer;
