export default {
	title: 'Podcast',
	name: 'podcast',
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
			title: 'Link Title',
			name: 'linkTitle',
			type: 'string'
		},
		{
			title: 'Link',
			name: 'link',
			type: 'url'
		},
		{
			title: 'Images',
			name: 'images',
			type: 'array',
			description: 'Choose either images or a video',
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
			description: 'Choose either images or a video',
		}
	]
}