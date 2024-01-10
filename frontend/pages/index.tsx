import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import client from '../client';
import {
	gigsQueryString,
	podcastsQueryString,
	showcasesQueryString,
	siteSettingsQueryString
} from '../lib/sanityQueries';
import { SiteSettingsType } from '../shared/types/types';
import Header from '../components/layout/Header';
import orderIndex from '../utils/orderIndex';
import Showcases from '../components/blocks/Showcases';

const PageWrapper = styled.div`
	background: var(--colour-grey);
`;

const DesktopContentWrapper = styled.div`
	position: relative;
	z-index: 10;
`;

type Props = {
	siteSettings: SiteSettingsType;
	gigs: any;
	podcasts: any;
	showcases: any;
	columnData: any;
};

const Page = (props: Props) => {
	const { siteSettings, gigs, podcasts, showcases, columnData } = props;

	return (
		<PageWrapper>
			<NextSeo
				title={siteSettings.seoTitle || ''}
				description={siteSettings.seoDescription || ''}
			/>
			<DesktopContentWrapper>
				<Header
					instagramUrl={siteSettings.instagramUrl}
					soundcloudUrl={siteSettings.soundcloudUrl}
					email={siteSettings.email}
					excerpt={siteSettings.excerpt}
				/>
				<Showcases data={columnData} />
			</DesktopContentWrapper>
		</PageWrapper>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const siteSettings = await client.fetch(siteSettingsQueryString);
	let showcases = await client.fetch(showcasesQueryString);
	let gigs = await client.fetch(gigsQueryString);
	let podcasts = await client.fetch(podcastsQueryString);

	showcases = orderIndex(showcases);
	gigs = orderIndex(gigs);
	podcasts = orderIndex(podcasts);

	interface DataItem {
		id: string;
		// other properties of your data items
	}

	const allData: DataItem[] = [
		...showcases.map((item: any) => ({ ...item, type: 'showcase' })),
		...gigs.map((item: any) => ({ ...item, type: 'gig' })),
		...podcasts.map((item: any) => ({ ...item, type: 'podcast' }))
	];

	const shuffle = (array: DataItem[]): DataItem[] => {
		let currentIndex = array.length,
			randomIndex: number;

		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex]
			];
		}

		return array;
	};

	const shuffledData = shuffle([...allData]);

	const columnData: DataItem[][] = Array.from({ length: 6 }, (_, i) => [
		...shuffledData.slice(i),
		...shuffledData.slice(0, i)
	]);

	return {
		props: {
			siteSettings,
			showcases,
			gigs,
			podcasts,
			columnData
		}
	};
};

export default Page;
