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
		},
		images[] {
			asset->{
				...
			}
		},
		video {
			asset->{
				...
			}
		}
	}
`;

export const podcastsQueryString = `
	*[_type == 'podcast'] {
		...,
		images {
			asset->{
				...
			}
		}
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
		},
		video {
			asset->{
				...
			}
		},
		images[] {
			asset->{
				...
			}
		}
	}
`;