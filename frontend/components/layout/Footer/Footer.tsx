import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	instagramUrl: string;
	soundcloudUrl: string;
	email: string;
};

const FooterWrapper = styled.footer`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: 0 ${pxToRem(16)};
	}
`;

const LinksWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: ${pxToRem(16)};
`;

const Link = styled.a``;

const CreditsWrapper = styled.div`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const Footer = (props: Props) => {
	const {
		instagramUrl,
		soundcloudUrl,
		email
	} = props;

	return (
		<FooterWrapper>
			<LinksWrapper>
				{email && (
					<Link href={`mailto: ${email}`} target="_blank">
						Email
					</Link>
				)}	
				{instagramUrl && (
					<Link href={instagramUrl} target="_blank">
						Instagram
					</Link>
				)}	
				{soundcloudUrl && (
					<Link href={soundcloudUrl} target="_blank">
						Soundcloud
					</Link>
				)}	
			</LinksWrapper>
			<CreditsWrapper>
				<Link href="https://www.tayte.co/" target="_blank">
					Built by tayte.co
				</Link>
			</CreditsWrapper>
		</FooterWrapper>
	)
};

export default Footer;