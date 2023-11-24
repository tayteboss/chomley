export default {
	title: 'Credit',
	name: 'credit',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Service',
			name: 'service',
			type: 'string',
			description: 'Make sure this field is in lowercase'
		},
		{
			title: 'Link',
			name: 'link',
			type: 'url'
		}
	]
}