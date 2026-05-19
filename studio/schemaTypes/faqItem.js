/* ── FAQ item ─────────────────────────────────────────────────
   Matches the FAQS[] shape in data.jsx.
   ─────────────────────────────────────────────────────────── */
export const faqItem = {
  name:  'faqItem',
  title: 'FAQ Item',
  type:  'document',

  fields: [
    {
      name: 'category', title: 'Category', type: 'string',
      options: {
        list: [
          { title: 'Ordering & quotes',   value: 'ordering' },
          { title: 'Shipping & delivery', value: 'shipping' },
          { title: 'Liners & varieties',  value: 'specimens' },
          { title: 'After-sale support',  value: 'after' },
        ],
      },
      validation: R => R.required(),
    },
    { name: 'order', title: 'Display order', type: 'number', initialValue: 10 },
    {
      name: 'question', title: 'Question', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: R => R.required() },
        { name: 'ar', title: 'Arabic',  type: 'string', validation: R => R.required() },
      ],
    },
    {
      name: 'answer', title: 'Answer', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 5, validation: R => R.required() },
        { name: 'ar', title: 'Arabic',  type: 'text', rows: 5, validation: R => R.required() },
      ],
    },
  ],

  preview: {
    select: { title: 'question.en', subtitle: 'category' },
  },
}
