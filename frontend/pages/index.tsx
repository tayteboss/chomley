import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import DrawingFeature from '../components/blocks/DrawingFeature';
import { incrementContributions, readAllPoints, readContributions, readDate, updateNewPoints } from '../firebase/firebasePoints';
import client from '../client';
import { gigsQueryString, podcastsQueryString, showcasesQueryString, siteSettingsQueryString } from '../lib/sanityQueries';
import { MuxVideoType, SiteSettingsType } from '../shared/types/types';
import LayoutWrapper from '../components/common/LayoutWrapper';
import LayoutGrid from '../components/common/LayoutGrid';
import Header from '../components/layout/Header';
import GigsColumn from '../components/blocks/GigsColumn';
import ShowcasesColumn from '../components/blocks/ShowcasesColumn';
import PodcastsColumn from '../components/blocks/PodcastsColumn';
import { useState, useEffect } from 'react';
import orderIndex from '../utils/orderIndex';

type Point = {
	x: number;
	y: number;
	id: string;
};

const PageWrapper = styled.div`
	background: var(--colour-grey);
`;

const DesktopContentWrapper = styled.div<{ $drawingIsActive: boolean }>`
	position: relative;
	z-index: 10;
	pointer-events: ${(props) => props.$drawingIsActive ? 'none' : 'auto'};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const MobileContentWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		position: relative;
		z-index: 10;
	}
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

	const [points, setPoints] = useState<Point[]>([]);
	const [contributions, setContributions] = useState(0);
	const [lastUpdated, setLastUpdated] = useState<string | null>(null);
	const [columnWidth, setColumnWidth] = useState(0);
	const [drawingIsActive, setDrawingIsActive] = useState(false);
	const [handleResetPoints, setHandleResetPoints] = useState(0);
	const [handleSavePoints, setHandleSavePoints] = useState(0);
	const [hint, setHint] = useState<boolean | string>(false);
	const [videoData, setVideoData] = useState<string | boolean>(false);
	const [imageData, setImageData] = useState<string | boolean>(false);

	useEffect(() => {
		setDrawingIsActive(false);

		const fetchData = async () => {
			if (handleSavePoints >= 1) {
				const contributions = await readContributions();
				const date = await readDate();
	
				setContributions(contributions);
				setLastUpdated(date);
			}
		};

		const updateData = async () => {
			if (handleSavePoints >= 1) {
				setHint('Saving...');
				await updateNewPoints(points);
				await incrementContributions();

				setHint('Saved');

				const timer = setTimeout(() => {
					setHint(false);
				}, 3000);

				return () => clearTimeout(timer);
			}
		};

		const fetchDataAndUpdate = async () => {
			await updateData();
			await fetchData();
		};

		fetchDataAndUpdate();
	}, [handleSavePoints]);

	useEffect(() => {
		const fetchData = async () => {
			const points = await readAllPoints();
			const contributions = await readContributions();
			const date = await readDate();

			setPoints(points);
			setContributions(contributions);
			setLastUpdated(date);
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

	return (
		<PageWrapper>
			<NextSeo
				title={siteSettings.seoTitle || ''}
				description={siteSettings.seoDescription || ''}
			/>
			<DrawingFeature
				drawingIsActive={drawingIsActive}
				handleResetPoints={handleResetPoints}
				points={points}
				setPoints={setPoints}
			/>
			<DesktopContentWrapper $drawingIsActive={drawingIsActive}>
				<LayoutWrapper>
					<LayoutGrid>
						<Header
							instagramUrl={siteSettings.instagramUrl}
							soundcloudUrl={siteSettings.soundcloudUrl}
							email={siteSettings.email}
							excerpt={siteSettings.excerpt}
							drawingIsActive={drawingIsActive}
							contributions={contributions}
							lastUpdated={lastUpdated}
							setDrawingIsActive={setDrawingIsActive}
							handleResetPoints={() => setHandleResetPoints(handleResetPoints + 1)}
							handleSavePoints={() => setHandleSavePoints(handleResetPoints + 1)}
							hint={hint}
							videoData={videoData}
							imageData={imageData}
						/>
						<ShowcasesColumn
							data={showcases}
							columnWidth={columnWidth}
							setColumnWidth={setColumnWidth}
							setVideoData={setVideoData}
							drawingIsActive={drawingIsActive}
						/>
						<GigsColumn
							data={gigs}
							columnWidth={columnWidth}
							setVideoData={setVideoData}
							drawingIsActive={drawingIsActive}
						/>
						<PodcastsColumn
							data={podcasts}
							columnWidth={columnWidth}
							setImageData={setImageData}
							drawingIsActive={drawingIsActive}
						/>
					</LayoutGrid>
				</LayoutWrapper>
			</DesktopContentWrapper>
			<MobileContentWrapper>
				<Header
					instagramUrl={siteSettings.instagramUrl}
					soundcloudUrl={siteSettings.soundcloudUrl}
					email={siteSettings.email}
					excerpt={siteSettings.excerpt}
					drawingIsActive={drawingIsActive}
					contributions={contributions}
					lastUpdated={lastUpdated}
					setDrawingIsActive={setDrawingIsActive}
					handleResetPoints={() => setHandleResetPoints(handleResetPoints + 1)}
					handleSavePoints={() => setHandleSavePoints(handleResetPoints + 1)}
					hint={hint}
					videoData={videoData}
					imageData={imageData}
				/>
				<ShowcasesColumn
					data={showcases}
					columnWidth={columnWidth}
					setColumnWidth={setColumnWidth}
					setVideoData={setVideoData}
					drawingIsActive={drawingIsActive}
				/>
				<GigsColumn
					data={gigs}
					columnWidth={columnWidth}
					setVideoData={setVideoData}
					drawingIsActive={drawingIsActive}
				/>
				<PodcastsColumn
					data={podcasts}
					columnWidth={columnWidth}
					setImageData={setImageData}
					drawingIsActive={drawingIsActive}
				/>
			</MobileContentWrapper>
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
