/* ── Blog post ────────────────────────────────────────────────
   Matches the BLOG_POSTS[] shape in data.jsx.
   ─────────────────────────────────────────────────────────── */
export const blogPost = {
  name:  'blogPost',
  title: 'Blog Post',
  type:  'document',

  fields: [
    {
      name: 'publishedAt', title: 'Publish date', type: 'date',
      validation: R => R.required(),
    },
    {
      name: 'category', title: 'Category', type: 'string',
      options: {
        list: [
          { title: 'From the field',  value: 'field' },
          { title: 'Variety notes',   value: 'specimens' },
          { title: 'Trade desk',      value: 'trade' },
          { title: 'Climate & care',  value: 'climate' },
        ],
      },
    },
    { name: 'readTime', title: 'Read time (minutes)', type: 'number', initialValue: 5 },
    {
      name: 'title', title: 'Title', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: R => R.required() },
        { name: 'ar', title: 'Arabic',  type: 'string', validation: R => R.required() },
      ],
    },
    {
      name: 'excerpt', title: 'Excerpt', type: 'object',
      description: 'One or two sentences shown in the blog listing.',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3, validation: R => R.required() },
        { name: 'ar', title: 'Arabic',  type: 'text', rows: 3, validation: R => R.required() },
      ],
    },
    {
      name: 'mainImage', title: 'Main image (upload)', type: 'image',
      options: { hotspot: true },
    },
    { name: 'imageUrl', title: 'Main image URL (external)', type: 'url' },
  ],

  orderings: [
    { title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],

  preview: {
    select: { title: 'title.en', subtitle: 'publishedAt', media: 'mainImage' },
    prepare({ title, subtitle, media }) {
      return { title: title || '(untitled)', subtitle, media };
    },
  },
}
