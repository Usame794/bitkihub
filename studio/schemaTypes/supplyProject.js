/* ── Supply / landscaping project ────────────────────────────
   Matches the PROJECTS[] shape in data.jsx.
   ─────────────────────────────────────────────────────────── */
export const supplyProject = {
  name:  'supplyProject',
  title: 'Supply Project',
  type:  'document',

  fields: [
    { name: 'order', title: 'Display order', type: 'number', initialValue: 10 },
    {
      name: 'title', title: 'Project title', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: R => R.required() },
        { name: 'ar', title: 'Arabic',  type: 'string', validation: R => R.required() },
      ],
    },
    { name: 'location', title: 'Location', type: 'string', placeholder: 'Doha, Qatar' },
    {
      name: 'meta', title: 'Meta lines', type: 'array',
      of: [{ type: 'string' }],
      description: 'Three short lines shown under the title, e.g. "38,400 Photinia Red Robin", "9 containers · 2025", "Landscape contractor".',
    },
    {
      name: 'image', title: 'Project image (upload)', type: 'image',
      options: { hotspot: true },
    },
    { name: 'imageUrl', title: 'Project image URL (external)', type: 'url' },
  ],

  preview: {
    select: { title: 'title.en', subtitle: 'location', media: 'image' },
  },
}
