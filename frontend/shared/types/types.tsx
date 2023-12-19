export type MediaType = {
	media: [
		{
			webmVideoFile: {
				url: string;
			};
			mp4VideoFile: {
				url: string;
			};
			placeholderImage: {
				url: string;
			};
		}
	];
};

export type TransitionsType = {
	hidden: {
		opacity: number;
		transition: {
			duration: number;
		};
	};
	visible: {
		opacity: number;
		transition: {
			duration: number;
			delay?: number;
		};
	};
};

export type SiteSettingsType = {
	instagramUrl: string;
	soundcloudUrl: string;
	email: string;
	excerpt: string;
	seoTitle: string;
	seoDescription: string;
};

export type ArtistType = {
	title: string;
	link: string;
	alias: string;
	actType: string;
};

export type CreditType = {
	title: string;
	service: string;
	link: string;
};

export type MuxVideoType = {
	asset: {
		playbackId: string;
	};
};

export type ShowcaseType = {
	artists: ArtistType[];
	credits: CreditType[];
	date: string;
	excerpt: string;
	location: string;
	locationUrl: string;
	title: string;
	formattedDate: string;
	images: any;
	video?: MuxVideoType;
};

export type GigType = {
	title: string;
	artists: ArtistType[];
	credits: CreditType[];
	date: string;
	excerpt: string;
	location: string;
	locationUrl: string;
	indexYear: string;
	formattedDate: string;
	indexYearPrefix: string;
	drawingIsActive: boolean;
	video?: MuxVideoType;
};

export type PodcastType = {
	title: string;
	date: string;
	excerpt: string;
	link: string;
	linkTitle: string;
	formattedDate: string;
	image: any;
};
