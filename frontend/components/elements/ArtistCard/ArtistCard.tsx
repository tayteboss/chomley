import styled from 'styled-components';
import { ArtistType } from '../../../shared/types/types';

const ArtistCardWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TitleWrapper = styled.div``;

const TitleLink = styled.a``;

const Title = styled.p``;

const Type = styled.p``;

const ArtistCard = (props: ArtistType) => {
	const {
		title,
		link,
		alias,
		actType
	} = props;

	return (
		<ArtistCardWrapper>
			<TitleWrapper>
				{link ? (
					<TitleLink href={link} target="_blank">
						{alias || ''}
					</TitleLink>
				) : (
					<Title>{alias || ''}</Title>
				)}
			</TitleWrapper>
			<Type>
				{`[${actType}]` || ''}
			</Type>
		</ArtistCardWrapper>
	);
};

export default ArtistCard;
