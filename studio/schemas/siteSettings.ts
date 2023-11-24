export default {
	title: "Site Settings",
	name: "siteSettings",
	type: "document",
	fields: [
		{
			title: 'SEO Title',
			name: 'seoTitle',
			type: 'string',
			description: 'This is the SEO title that appears in search engines.'
		},
		{
			title: 'SEO Description',
			name: 'seoDescription',
			type: 'string',
			description: 'This is the SEO description that appears in search engines.'
		},
		{
			title: "Instagram URL",
			name: "instagramUrl",
			type: "url"
		},
		{
			title: "Soundcloud URL",
			name: "soundcloudUrl",
			type: "url"
		},
		{
			title: "Email",
			name: "email",
			type: "string"
		},
		{
			title: "Excerpt",
			name: "excerpt",
			type: "string"
		}
	]
}