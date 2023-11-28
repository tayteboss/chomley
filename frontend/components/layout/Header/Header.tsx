import styled from 'styled-components';
import DrawingControls from '../../elements/DrawingControls';
import About from '../../elements/About';
import Footer from '../Footer';
import pxToRem from '../../../utils/pxToRem';
import Stats from '../../elements/Stats';
import VideoPlayer from '../../elements/VideoPlayer';
import ImageThumbnail from '../../elements/ImageThumbnail';

type Props = {
	instagramUrl: string;
	soundcloudUrl: string;
	email: string;
	excerpt: string;
	drawingIsActive: boolean;
	contributions: number;
	lastUpdated: string | null;
	hint: boolean | string;
	videoData: string | boolean;
	imageData: string | boolean;
	setDrawingIsActive: (drawingIsActive: boolean) => void;
	handleResetPoints: () => void;
	handleSavePoints: () => void;
};

const HeaderWrapper = styled.header`
	grid-column: span 3;
	justify-content: space-between;
	padding: ${pxToRem(16)} 0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	height: 100vh;
	overflow-y: auto;
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		height: unset;
		padding: 0;
		border-bottom: 1px solid var(--colour-black);
		overflow-y: unset;
	}
`;

const ColumnHeader = styled.div`
	min-height: 30vh;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		position: sticky;
		top: 0;
		left: unset;
		min-height: unset;
		padding: ${pxToRem(16)};
		border-bottom: 1px solid var(--colour-black);
		width: 100%;
		z-index: 10;
		background: var(--colour-grey);
	}
`;

const Logo = styled.div`
	margin-bottom: ${pxToRem(16)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: 0;
	}
`;

const Header = (props: Props) => {
	const {
		instagramUrl,
		soundcloudUrl,
		email,
		excerpt,
		drawingIsActive,
		contributions,
		lastUpdated,
		hint,
		videoData,
		imageData,
		handleResetPoints,
		handleSavePoints,
		setDrawingIsActive
	} = props;

	return (
		<HeaderWrapper className="header">
			<ColumnHeader>
				<Logo>chomley</Logo>
				<DrawingControls
					drawingIsActive={drawingIsActive}
					hint={hint}
					setDrawingIsActive={setDrawingIsActive}
					handleResetPoints={handleResetPoints}
					handleSavePoints={handleSavePoints}
				/>
				<Stats
					contributions={contributions}
					lastUpdated={lastUpdated}
				/>
			</ColumnHeader>
			<About
				data={excerpt}
				contributions={contributions}
				lastUpdated={lastUpdated}
			/>
			<Footer
				instagramUrl={instagramUrl}
				soundcloudUrl={soundcloudUrl}
				email={email}
			/>
			<VideoPlayer data={videoData} />
			<ImageThumbnail data={imageData} />
		</HeaderWrapper>
	)
};

export default Header;
