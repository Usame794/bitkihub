import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes/index.js'

const singletons = ['siteContent']

export default defineConfig({
  name:    'bitkihub',
  title:   'Bitki Hub CMS',
  projectId: 'akpzc8he',
  dataset:   'production',

  plugins: [
    /* ── Live Preview / Visual Editing ──────────────────────────────────────
       Opens bitkihub.com in an iframe on the right side of the Studio.
       The website's visual-editing overlay (loaded from CDN) establishes
       a postMessage channel so edits on the left reflect in real time.
       ─────────────────────────────────────────────────────────────────────── */
    presentationTool({
      name:  'presentation',
      title: '🌿 Live Preview',
      previewUrl: {
        origin: 'https://bitkihub.com',
        // Uncomment for local development:
        // origin: 'http://localhost:8080',
        previewMode: {
          enable:  '/preview-enable',   // handled client-side in sanity.jsx
          disable: '/preview-disable',
        },
      },
    }),

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
