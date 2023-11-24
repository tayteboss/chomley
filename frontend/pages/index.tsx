import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import DrawingFeature from '../components/blocks/DrawingFeature';
import { readAllPoints } from '../firebase/firebasePoints';
import client from '../client';
import { gigsQueryString, podcastsQueryString, showcasesQueryString, siteSettingsQueryString } from '../lib/sanityQueries';
import { SiteSettingsType } from '../shared/types/types';
import LayoutWrapper from '../components/common/LayoutWrapper';
import LayoutGrid from '../components/common/LayoutGrid';
import Header from '../components/layout/Header';
import GigsColumn from '../components/blocks/GigsColumn';
import ShowcasesColumn from '../components/blocks/ShowcasesColumn';
import PodcastsColumn from '../components/blocks/PodcastsColumn';
import { useState, useEffect } from 'react';

const PageWrapper = styled.div`
	background: var(--colour-grey);
`;

const ContentWrapper = styled.div`
	position: relative;
	z-index: 10;
`;

type Props = {
	siteSettings: SiteSettingsType;
	gigs: any;
	podcasts: any;
	showcases: any;
};

const Page = (props: Props) => {
	const {
		siteSettings,
		gigs,
		podcasts,
		showcases
	} = props;

	const [points, setPoints] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const points = await readAllPoints();
			setPoints(points);
		};
		fetchData();
	}, []);

	console.log('points', points);
	console.log('gigs', gigs);
	console.log('podcasts', podcasts);
	console.log('showcases', showcases);
	console.log('siteSettings', siteSettings);

	return (
		<PageWrapper>
			<NextSeo
				title={siteSettings.seoTitle || ''}
				description={siteSettings.seoDescription || ''}
			/>
			{/* <DrawingFeature initPoints={points} /> */}
			<ContentWrapper>
				<LayoutWrapper>
					<LayoutGrid>
						<Header
							instagramUrl={siteSettings.instagramUrl}
							soundcloudUrl={siteSettings.soundcloudUrl}
							email={siteSettings.email}
							excerpt={siteSettings.excerpt}
						/>
						<ShowcasesColumn data={showcases} />
						<GigsColumn data={gigs} />
						<PodcastsColumn data={podcasts} />
					</LayoutGrid>
				</LayoutWrapper>
			</ContentWrapper>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const siteSettings = await client.fetch(siteSettingsQueryString);
	const showcases = await client.fetch(showcasesQueryString);
	const gigs = await client.fetch(gigsQueryString);
	const podcasts = await client.fetch(podcastsQueryString);

	return {
		props: {
			siteSettings,
			showcases,
			gigs,
			podcasts
		},
	};
}

export default Page;
