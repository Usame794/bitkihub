import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes/index.js'

const singletons = ['siteContent']

export default defineConfig({
  name:    'bitkihub',
  title:   'Bitki Hub CMS',
  projectId: 'akpzc8he',
  dataset:   'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            /* ── Singleton: Site Content ── */
            S.listItem()
              .title('Site Content')
              .id('siteContent')
              .child(
                S.document()
                  .schemaType('siteContent')
                  .documentId('siteContent')
              ),

            S.divider(),

            /* ── Collections ── */
            S.documentTypeListItem('liner')        .title('Catalogue — Liners'),
            S.documentTypeListItem('category')     .title('Catalogue — Categories'),
            S.documentTypeListItem('supplyProject').title('Projects'),
            S.documentTypeListItem('blogPost')     .title('Blog Posts'),
            S.documentTypeListItem('faqItem')      .title('FAQ Items'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    /* Prevent creating more than one siteContent document */
    templates: (prev) => prev.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },
})
