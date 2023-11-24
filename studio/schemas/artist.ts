export default {
	title: 'Artist',
	name: 'artist',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'This is a reference title'
		},
		{
			title: 'Alias',
			name: 'alias',
			type: 'string',
			description: 'This name will appear on the frontend'
		},
		{
			title: 'Act Type',
			name: 'actType',
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