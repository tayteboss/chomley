import styled from 'styled-components';
import Stats from '../Stats';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: string;
};

const AboutWrapper = styled.div`
	flex: 1;
`;

const Excerpt = styled.p`
	margin-bottom: ${pxToRem(16)};
`;

const About = (props: Props) => {
	const {
		data
	} = props;

	return (
		<AboutWrapper>
			{data && (
				<Excerpt>{data}</Excerpt>
			)}
			<Stats />
		</AboutWrapper>
	);
};

export default About;
