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

export async function getStaticProps() {
	const siteSettings = await client.fetch(siteSettingsQueryString);
	let showcases = await client.fetch(showcasesQueryString);
	let gigs = await client.fetch(gigsQueryString);
	let podcasts = await client.fetch(podcastsQueryString);

	let data = [showcases, gigs, podcasts];

	data = orderIndex(data);

	let columnData = data;

	// evenly push the data of columnData into 6 arrays to form 6 columns
	columnData = columnData.reduce(
		(acc: any, curr: any, i: number) => {
			acc[i % 6].push(curr);
			return acc;
		},
		[[], [], [], [], [], []]
	);

	return {
		props: {
			siteSettings,
			showcases,
			gigs,
			podcasts,
			columnData
		}
	};
}

export default Page;
