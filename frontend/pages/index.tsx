import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import DrawingFeature from '../components/blocks/DrawingFeature';
import { readAllPoints } from '../firebase/firebasePoints';

const PageWrapper = styled.div``;

const Title = styled.h1`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

type Props = {
	data: {};
	points: any;
};

const Page = (props: Props) => {
	const {
		data,
		points
	} = props;

	return (
		<PageWrapper>
			<NextSeo
				title="Boiler"
				description="Boiler Plate"
			/>
			<DrawingFeature initPoints={points} />
			<Title>chm</Title>
		</PageWrapper>
	);
};

export async function getServerSideProps() {
	// const data = await getPage('home');
	const data = false;
	const points = await readAllPoints();

	return {
		props: {
			data,
			points
		},
	};
}

export default Page;
