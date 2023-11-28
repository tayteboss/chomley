import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import Image from 'next/image';

type Props = {
	data: string | boolean;
};

const ImageThumbnailWrapper = styled.div`
	position: absolute;
	bottom: ${pxToRem(13)};
	left: 0;
	padding-top: 100%;
	width: 100%;
	background: var(--colour-white);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const ImageThumbnail = (props: Props) => {
	const {
		data
	} = props;

	return (
		<>
			{data && typeof data === 'string' && (
				<ImageThumbnailWrapper>
					<Image
						src={data as string} // Update the type of data to string
						layout="fill"
						objectFit="cover"
					/>
				</ImageThumbnailWrapper>
			)}
		</>
	);
};

export default ImageThumbnail;
