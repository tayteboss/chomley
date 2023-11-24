export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		...,
	}
`;

export const homePageQueryString = `
	*[_type == 'homePage'][0] {
		...,
	}
`;

export const gigsQueryString = `
	*[_type == 'gig'] {
		...,
	}
`;

export const podcastsQueryString = `
	*[_type == 'podcast'] {
		...,
	}
`;

export const showcasesQueryString = `
	*[_type == 'showcase'] {
		...,
	}
`;