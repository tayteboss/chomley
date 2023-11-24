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
import orderIndex from '../utils/orderIndex';

const PageWrapper = styled.div`
	background: var(--colour-grey);
`;

const ContentWrapper = styled.div<{ $drawingIsActive: boolean }>`
	position: relative;
	z-index: 10;
	pointer-events: ${(props) => props.$drawingIsActive ? 'none' : 'auto'};
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
	const [columnWidth, setColumnWidth] = useState(0);
	const [drawingIsActive, setDrawingIsActive] = useState(false);
	const [handleResetPoints, setHandleResetPoints] = useState(0);
	const [handleSavePoints, setHandleSavePoints] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const points = await readAllPoints();
			setPoints(points);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const html = document.querySelector('html')!;

		if (drawingIsActive) {
			html.classList.add('is-drawing');
		} else {
			html.classList.remove('is-drawing');
		}
	}, [drawingIsActive]);

	// console.log('points', points);
	// console.log('gigs', gigs);
	// console.log('podcasts', podcasts);
	// console.log('showcases', showcases);
	// console.log('siteSettings', siteSettings);

	return (
		<PageWrapper>
			<NextSeo
				title={siteSettings.seoTitle || ''}
				description={siteSettings.seoDescription || ''}
			/>
			<DrawingFeature
				initPoints={points}
				drawingIsActive={drawingIsActive}
				handleResetPoints={handleResetPoints}
				handleSavePoints={handleSavePoints}
			/>
			<ContentWrapper
				$drawingIsActive={drawingIsActive}
			>
				<LayoutWrapper>
					<LayoutGrid>
						<Header
							instagramUrl={siteSettings.instagramUrl}
							soundcloudUrl={siteSettings.soundcloudUrl}
							email={siteSettings.email}
							excerpt={siteSettings.excerpt}
							setDrawingIsActive={setDrawingIsActive}
							drawingIsActive={drawingIsActive}
							handleResetPoints={() => setHandleResetPoints(handleResetPoints + 1)}
							handleSavePoints={() => setHandleSavePoints(handleResetPoints + 1)}
						/>
						<ShowcasesColumn
							data={showcases}
							setColumnWidth={setColumnWidth}
							columnWidth={columnWidth}
						/>
						<GigsColumn
							data={gigs}
							columnWidth={columnWidth}
						/>
						<PodcastsColumn
							data={podcasts}
							columnWidth={columnWidth}
						/>
					</LayoutGrid>
				</LayoutWrapper>
			</ContentWrapper>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const siteSettings = await client.fetch(siteSettingsQueryString);
	let showcases = await client.fetch(showcasesQueryString);
	let gigs = await client.fetch(gigsQueryString);
	let podcasts = await client.fetch(podcastsQueryString);

	showcases = orderIndex(showcases);
	gigs = orderIndex(gigs);
	podcasts = orderIndex(podcasts);

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
