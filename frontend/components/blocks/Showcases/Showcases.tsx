import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import ShowcaseColumn from '../ShowcaseColumn';

type Props = {
	data: any;
};

const ShowcasesWrapper = styled.div`
	padding-top: calc(var(--header-h) + 80px);
`;

const Showcases = (props: Props) => {
	const { data } = props;

	return (
		<ShowcasesWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					{data.map((column: any, i: number) => {
						return <ShowcaseColumn data={column} key={i} />;
					})}
				</LayoutGrid>
			</LayoutWrapper>
		</ShowcasesWrapper>
	);
};

export default Showcases;
