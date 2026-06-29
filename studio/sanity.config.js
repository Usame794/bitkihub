import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes/index.js'

const singletons = ['siteContent']

/* Leads should never be auto-created from the "new document" menu
   — they arrive from the website forms. Hide from templates. */
const readOnlyTypes = ['lead']

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
        // Static site — no server-side preview route needed.
        // The visual-editing overlay in index.html handles the channel.
        origin: 'https://bitkihub.com',
        // Uncomment for local development:
        // origin: 'http://localhost:8080',
      },
    }),

    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            /* ── Leads — top priority ── */
            S.documentTypeListItem('lead').title('📥 Leads'),

            S.divider(),

            /* ── Everyday content ── */
            S.documentTypeListItem('liner')    .title('Catalogue — Liners'),
            S.documentTypeListItem('category') .title('Catalogue — Categories'),
            S.documentTypeListItem('blogPost') .title('Blog Posts'),
            S.documentTypeListItem('faqItem')  .title('FAQ Items'),

            S.divider(),

            /* ── Rarely changed — nested so they stay out of the way ── */
            S.listItem()
              .title('⚙️  Advanced Settings')
              .id('advanced-settings')
              .child(
                S.list()
                  .title('Advanced Settings')
                  .items([
                    S.listItem()
                      .title('Site Content')
                      .id('siteContent')
                      .child(
                        S.document()
                          .schemaType('siteContent')
                          .documentId('siteContent')
                      ),
                    S.documentTypeListItem('supplyProject').title('Projects'),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    /* Prevent creating more than one siteContent document */
    templates: (prev) => prev.filter(({ schemaType }) => !singletons.includes(schemaType)),
    // readOnlyTypes declared above but leads can still be created manually via the list
  },
})
