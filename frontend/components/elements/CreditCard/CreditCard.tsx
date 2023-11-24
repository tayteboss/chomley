import styled from 'styled-components';
import { CreditType } from '../../../shared/types/types';

const CreditCardWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TitleWrapper = styled.div``;

const TitleLink = styled.a``;

const Title = styled.p``;

const Type = styled.p``;

const CreditCard = (props: CreditType) => {
	const {
		title,
		link,
		service
	} = props;

	return (
		<CreditCardWrapper>
			<TitleWrapper>
				{link ? (
					<TitleLink href={link} target="_blank">
						{title || ''}
					</TitleLink>
				) : (
					<Title>{title || ''}</Title>
				)}
			</TitleWrapper>
			<Type>
				{`[${service}]` || ''}
			</Type>
		</CreditCardWrapper>
	);
};

export default CreditCard;
