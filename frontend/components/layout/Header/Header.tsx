import styled from 'styled-components';
import DrawingControls from '../../elements/DrawingControls';
import About from '../../elements/About';
import Footer from '../Footer';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	instagramUrl: string;
	soundcloudUrl: string;
	email: string;
	excerpt: string;
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
`;

const ColumnHeader = styled.div`
	min-height: 30vh;
`;

const Logo = styled.div`
	margin-bottom: ${pxToRem(16)};
`;

const Header = (props: Props) => {
	const {
		instagramUrl,
		soundcloudUrl,
		email,
		excerpt
	} = props;

	return (
		<HeaderWrapper className="header">
			<ColumnHeader>
				<Logo>chomley</Logo>
				<DrawingControls />
			</ColumnHeader>
			<About data={excerpt} />
			<Footer
				instagramUrl={instagramUrl}
				soundcloudUrl={soundcloudUrl}
				email={email}
			/>
		</HeaderWrapper>
	)
};

export default Header;
