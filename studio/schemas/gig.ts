export default {
	title: 'Gig',
	name: 'gig',
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
			type: 'string'
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
			title: 'Images',
			name: 'images',
			type: 'array',
			of: [
				{
					type: 'image',
				}
			]
		},
		{
			title: 'Video',
			name: 'video',
			type: 'mux.video',
		},
	]
}