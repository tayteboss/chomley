export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		...,
	}
`;

export const gigsQueryString = `
	*[_type == 'gig'] {
		...,
		artists[]->{
			...
		},
		credits[]->{
			...
		}
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
		artists[]->{
			...
		},
		credits[]->{
			...
		}
	}
`;