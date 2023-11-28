export default {
	title: 'Showcase',
	name: 'showcase',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Excerpt',
			name: 'excerpt',
			type: 'string'
		},
		{
			title: 'Date',
			name: 'date',
			type: 'date'
		},
		{
			title: 'Location',
			name: 'location',
			type: 'string',
			description: 'e.g. "{Venue}, {Area}"'
		},
		{
			title: 'Location URL',
			name: 'locationUrl',
			type: 'url'
		},
		{
			title: 'Artists',
			name: 'artists',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [
						{
							type: 'artist'
						}
					]
				}
			]
		},
		{
			title: 'Credits',
			name: 'credits',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [
						{
							type: 'credit'
						}
					]
				}
			]
		},
		{
			title: 'Video',
			name: 'video',
			type: 'mux.video',
		}
	]
}