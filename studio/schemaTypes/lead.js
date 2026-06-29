/* ── Lead — inbound enquiry from Quick Quote or Contact form ──
   Created automatically by the website when a visitor submits
   either form. Can also be created manually in the Studio.
   ─────────────────────────────────────────────────────────── */
export const lead = {
  name:  'lead',
  title: 'Lead',
  type:  'document',

  fields: [
    {
      name: 'createdAt', title: 'Received at', type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
    {
      name: 'source', title: 'Source', type: 'string',
      options: {
        list: [
          { title: '💬 Quick Quote modal', value: 'quote-modal' },
          { title: '📋 Contact form',      value: 'contact-form' },
          { title: '✍️  Manual entry',      value: 'manual' },
        ],
      },
    },

    /* Contact details */
    { name: 'name',    title: 'Name',            type: 'string' },
    { name: 'company', title: 'Company',          type: 'string' },
    { name: 'email',   title: 'Email',            type: 'string' },
    { name: 'phone',   title: 'Phone / WhatsApp', type: 'string' },

    /* What they want */
    { name: 'plant',           title: 'Plant interest',       type: 'string' },
    { name: 'deliveryCountry', title: 'Delivery country',     type: 'string' },
    {
      name: 'replyVia', title: 'Preferred reply method', type: 'string',
      options: {
        list: [
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Email',    value: 'email' },
          { title: 'Both',     value: 'both' },
        ],
      },
    },
    { name: 'message', title: 'Message', type: 'text', rows: 4 },
  ],

  orderings: [
    {
      title: 'Newest first',
      name:  'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title:  'name',
      email:  'email',
      source: 'source',
      plant:  'plant',
      date:   'createdAt',
    },
    prepare({ title, email, source, plant, date }) {
      const tag    = source === 'quote-modal' ? '💬' : source === 'contact-form' ? '📋' : '✍️';
      const detail = plant ? ` · ${plant}` : '';
      const day    = date ? date.slice(0, 10) : '';
      return {
        title:    `${tag} ${title || '(no name)'}`,
        subtitle: `${email || '(no email)'}${detail} — ${day}`,
      };
    },
  },
}
