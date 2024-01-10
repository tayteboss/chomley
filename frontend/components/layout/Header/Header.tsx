import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import Link from 'next/link';

type Props = {
	instagramUrl: string;
	soundcloudUrl: string;
	email: string;
	excerpt: string;
};

const HeaderWrapper = styled.header`
	padding: ${pxToRem(8)} 0;
	background: var(--colour-grey);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10;
`;

const Logo = styled.div`
	grid-column: 1 / 3;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		margin-bottom: ${pxToRem(8)};
	}
`;

const Excerpt = styled.p`
	grid-column: 3 / 8;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		margin-bottom: ${pxToRem(8)};
	}
`;

const Email = styled.a`
	grid-column: 9 / 11;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		margin-bottom: ${pxToRem(8)};
	}
`;

const SocialLinks = styled.div`
	grid-column: 11 / -1;
	display: flex;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		margin-bottom: ${pxToRem(8)};
	}
`;

const LinkTag = styled.a``;

const Span = styled.span`
	white-space: pre;
`;

const Header = (props: Props) => {
	const { instagramUrl, soundcloudUrl, email, excerpt } = props;

	return (
		<HeaderWrapper className="header">
			<LayoutWrapper>
				<LayoutGrid>
					<Logo>chomley</Logo>
					<Excerpt>{excerpt || ''}</Excerpt>
					<Email href={`mailto:${email}`}>{email || ''}</Email>
					<SocialLinks>
						<LinkTag href={instagramUrl} target="_blank">
							Instagram
						</LinkTag>
						<Span>, </Span>
						<LinkTag href={soundcloudUrl} target="_blank">
							Soundcloud
						</LinkTag>
					</SocialLinks>
				</LayoutGrid>
			</LayoutWrapper>
		</HeaderWrapper>
	);
};

export default Header;
