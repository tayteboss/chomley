import styled from 'styled-components';
import Stats from '../Stats';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: string;
	contributions: number;
	lastUpdated: string | null;
};

const AboutWrapper = styled.div`
	flex: 1;
`;

const Excerpt = styled.p`
	margin-bottom: ${pxToRem(16)};
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
			{/* <Stats
				contributions={contributions}
				lastUpdated={lastUpdated}
			/> */}
		</AboutWrapper>
	);
};

export default About;
