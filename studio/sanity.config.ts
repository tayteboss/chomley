import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { colorInput } from '@sanity/color-input';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { EarthGlobeIcon, CaseIcon, ControlsIcon, UsersIcon, TagIcon } from '@sanity/icons';
import { muxInput } from 'sanity-plugin-mux-input';

export default defineConfig({
  name: 'default',
  title: 'Chomley',

  projectId: '6cywdxzl',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
        .title('Content')
        .items([
          S.divider(),
          S.listItem()
            .title('Site Settings')
            .icon(EarthGlobeIcon)
            .child(
              S.editor()
                .schemaType('siteSettings')
                .documentId('siteSettings')
            ),
          S.divider(),
          S.listItem()
            .title('Showcases')
            .icon(CaseIcon)
            .child(
              S.documentList()
                .title('Showcases')
                .schemaType('showcase')
                .filter('_type == "showcase"')
            ),
          S.listItem()
            .title('Gigs')
            .icon(ControlsIcon)
            .child(
              S.documentList()
                .title('Gigs')
                .schemaType('gig')
                .filter('_type == "gig"')
            ),
          S.listItem()
            .title('Podcasts')
            .icon(TagIcon)
            .child(
              S.documentList()
                .title('Podcasts')
                .schemaType('podcast')
                .filter('_type == "podcast"')
            ),
          S.divider(),
          S.listItem()
            .title('Artists')
            .icon(UsersIcon)
            .child(
              S.documentList()
                .title('Artists')
                .schemaType('artist')
                .filter('_type == "artist"')
            ),
          S.divider(),
        ])
      },
    }),
    visionTool(),
    colorInput(),
    muxInput({mp4_support: 'standard'}),
    vercelDeployTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
