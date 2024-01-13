import styled from 'styled-components';
import ShowcaseCard from '../../elements/ShowcaseCard';
import PodcastCard from '../../elements/PodcastCard';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: any;
};

const ShowcaseColumnWrapper = styled.div`
	grid-column: span 2;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		grid-column: 1 / -1;
	}
`;

const ShowcaseColumn = (props: Props) => {
	const { data } = props;

	const hasData = data && data.length;

	return (
		<ShowcaseColumnWrapper>
			{hasData &&
				data.map((item: any, i: number) => {
					const isShowcase = item._type === 'showcase';
					const isGig = item._type === 'gig';
					const isPodcast = item._type === 'podcast';

					return (
						<>
							{isShowcase && (
								<ShowcaseCard
									title={item.title}
									date={item.date}
									formattedDate={item.formattedDate}
									artists={item.artists}
									credits={item.credits}
									excerpt={item.excerpt}
									location={item.location}
									locationUrl={item.locationUrl}
									images={item.images}
									video={item.video}
									key={i}
								/>
							)}
							{isGig && (
								<ShowcaseCard
									title={item.title}
									date={item.date}
									formattedDate={item.formattedDate}
									artists={item.artists}
									credits={item.credits}
									excerpt={item.excerpt}
									location={item.location}
									locationUrl={item.locationUrl}
									images={item.images}
									video={item.video}
									key={i}
								/>
							)}
							{isPodcast && (
								<PodcastCard
									title={item.title}
									date={item.date}
									formattedDate={item.formattedDate}
									excerpt={item.excerpt}
									link={item.link}
									linkTitle={item.linkTitle}
									image={item.image}
									key={i}
								/>
							)}
						</>
					);
				})}
		</ShowcaseColumnWrapper>
	);
};

export default ShowcaseColumn;
