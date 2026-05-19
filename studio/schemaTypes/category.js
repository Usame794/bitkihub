/* ── Catalogue category ───────────────────────────────────────
   Matches the CATEGORIES[] shape in data.jsx.
   ─────────────────────────────────────────────────────────── */
export const category = {
  name:  'category',
  title: 'Catalogue Category',
  type:  'document',

  fields: [
    {
      name: 'id', title: 'Category id (slug)', type: 'string',
      description: 'Lowercase, no spaces. Must match the "Category id" on liner documents.',
      validation: R => R.required().regex(/^[a-z0-9-]+$/, { name: 'slug', invert: false }),
      options: {
        list: [
          { title: 'Hedging & Screening',    value: 'hedges' },
          { title: 'Conifers & Topiary',     value: 'conifers' },
          { title: 'Flowering Shrubs',        value: 'flowering' },
          { title: 'Ornamental Foliage',      value: 'foliage' },
          { title: 'Ground Cover & Creepers', value: 'ground' },
          { title: 'Mediterranean Aromatics', value: 'mediterranean' },
        ],
      },
    },
    { name: 'order', title: 'Display order', type: 'number', initialValue: 10 },
    {
      name: 'name', title: 'Category name', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: R => R.required() },
        { name: 'ar', title: 'Arabic',  type: 'string', validation: R => R.required() },
      ],
    },
    {
      name: 'blurb', title: 'Short description', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 2 },
        { name: 'ar', title: 'Arabic',  type: 'text', rows: 2 },
      ],
    },
    {
      name: 'image', title: 'Category image (upload)', type: 'image',
      options: { hotspot: true },
    },
    { name: 'imageUrl', title: 'Category image URL (external)', type: 'url' },
  ],

  preview: {
    select: { title: 'name.en', subtitle: 'id', media: 'image' },
  },
}
