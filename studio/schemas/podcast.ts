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
			title: 'Image',
			name: 'images',
			type: 'image',
		}
	]
}