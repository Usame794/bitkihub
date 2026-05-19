/* ── Liner (wholesale plant product) ─────────────────────────
   Matches the PRODUCTS[] shape in data.jsx.
   ─────────────────────────────────────────────────────────── */
export const liner = {
  name:  'liner',
  title: 'Liner / Product',
  type:  'document',

  fields: [
    /* Identity */
    {
      name: 'slug', title: 'Slug (URL id)', type: 'slug',
      options: { source: 'latin', maxLength: 80 },
      validation: R => R.required(),
    },
    {
      name: 'order', title: 'Display order', type: 'number',
      description: 'Lower = shown first in catalogue',
      initialValue: 100,
    },

    /* Names */
    {
      name: 'name', title: 'Common name', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: R => R.required() },
        { name: 'ar', title: 'Arabic',  type: 'string', validation: R => R.required() },
      ],
    },
    { name: 'latin', title: 'Latin name', type: 'string', validation: R => R.required() },

    /* Catalogue */
    {
      name: 'category', title: 'Category id', type: 'string',
      description: 'Must match a Category document's "id" field (e.g. hedges, conifers)',
      options: {
        list: [
          { title: 'Hedging & Screening',       value: 'hedges' },
          { title: 'Conifers & Topiary',         value: 'conifers' },
          { title: 'Flowering Shrubs',           value: 'flowering' },
          { title: 'Ornamental Foliage',         value: 'foliage' },
          { title: 'Ground Cover & Creepers',    value: 'ground' },
          { title: 'Mediterranean Aromatics',    value: 'mediterranean' },
        ],
      },
    },
    {
      name: 'badge', title: 'Badge label', type: 'object',
      description: 'Short badge shown on the card (e.g. "Best seller"). Leave blank for none.',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic',  type: 'string' },
      ],
    },

    /* Pricing */
    { name: 'price',     title: 'Price per unit', type: 'number', validation: R => R.required().positive() },
    { name: 'priceUnit', title: 'Currency',        type: 'string', initialValue: 'EUR' },
    { name: 'moq',       title: 'Min. order qty',  type: 'number', validation: R => R.required().positive().integer() },

    /* Specs */
    { name: 'height',      title: 'Height range',        type: 'string', placeholder: '25–35 cm' },
    { name: 'potSize',     title: 'Pot size',             type: 'string', placeholder: '9 × 9 × 8 cm' },
    { name: 'climate',     title: 'Climate suitability',  type: 'string', placeholder: 'Mediterranean · Continental' },
    { name: 'waterNeed',   title: 'Water requirement',    type: 'string',
      options: { list: ['Very low', 'Low', 'Moderate', 'Frequent'] } },
    { name: 'sunExposure', title: 'Sun exposure',         type: 'string',
      options: { list: ['Full sun', 'Full to part sun', 'Part shade', 'Full shade'] } },
    { name: 'age',         title: 'Plant age',            type: 'string', placeholder: '12–14 months' },

    /* Images */
    {
      name: 'mainImage', title: 'Main image (upload)', type: 'image',
      description: 'Upload a photo OR fill in the Image URL field below.',
      options: { hotspot: true },
    },
    {
      name: 'imageUrl', title: 'Main image URL (external)', type: 'url',
      description: 'Paste an Unsplash or CDN URL. Ignored if "Main image" is uploaded.',
    },
    {
      name: 'gallery', title: 'Gallery (upload)', type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload additional product images.',
    },
    {
      name: 'galleryUrls', title: 'Gallery URLs (external)', type: 'array',
      of: [{ type: 'url' }],
      description: 'Paste external URLs. Ignored if Gallery images are uploaded.',
    },

    /* Description */
    {
      name: 'description', title: 'Description', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 4, validation: R => R.required() },
        { name: 'ar', title: 'Arabic',  type: 'text', rows: 4, validation: R => R.required() },
      ],
    },
  ],

  preview: {
    select: { title: 'name.en', subtitle: 'latin', media: 'mainImage' },
    prepare({ title, subtitle, media }) {
      return { title: title || '(unnamed)', subtitle, media };
    },
  },
}
