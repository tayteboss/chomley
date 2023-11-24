import styled from 'styled-components';
import { CreditType } from '../../../shared/types/types';
import CreditCard from '../../elements/CreditCard';

type Props = {
	data: CreditType[];
};

const CreditsWrapper = styled.div``;

const Credits = (props: Props) => {
	const {
		data
	} = props;

	const hasData = data && data.length > 0;

	return (
		<CreditsWrapper>
			{hasData && data.map((item, i) => (
				<CreditCard
					key={i}
					{...item}
				/>
			))}
		</CreditsWrapper>
	);
};

export default Credits;
