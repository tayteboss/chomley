import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: string;
	contributions: number;
	lastUpdated: string | null;
};

const AboutWrapper = styled.div`
	flex: 1;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(16)} ${pxToRem(16)} 0;
		margin-bottom: ${pxToRem(16)};
	}
`;

const Excerpt = styled.p`
	margin-bottom: ${pxToRem(16)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: 0;
	}
`;

const About = (props: Props) => {
	const {
		data,
		contributions,
		lastUpdated
	} = props;

	return (
		<AboutWrapper>
			{data && (
				<Excerpt>{data}</Excerpt>
			)}
		</AboutWrapper>
	);
};

export default About;
