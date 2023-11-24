import styled from 'styled-components';
import { ArtistType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import ArtistCard from '../../elements/ArtistCard';

type Props = {
	data: ArtistType[];
};

const ArtistsWrapper = styled.div`
	margin-bottom: ${pxToRem(8)};
`;

const Artists = (props: Props) => {
	const {
		data
	} = props;

	const hasData = data && data.length > 0;

	return (
		<ArtistsWrapper>
			{hasData && data.map((item, i) => (
				<ArtistCard
					key={i}
					{...item}
				/>
			))}
		</ArtistsWrapper>
	);
};

export default Artists;
