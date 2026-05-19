/* ── Site Content singleton ───────────────────────────────────
   Editable copy for hero, stats, section headings, CTA text,
   and ticker strip — in both English and Arabic.
   Deep-merged into window.STRINGS on page load.
   ─────────────────────────────────────────────────────────── */

/* Bilingual text field */
function bil(name, title, type = 'string', extra = {}) {
  return {
    name, title, type: 'object', ...extra,
    fields: [
      { name: 'en', title: 'English', type },
      { name: 'ar', title: 'Arabic',  type },
    ],
  };
}

export const siteContent = {
  name:  'siteContent',
  title: 'Site Content',
  type:  'document',

  groups: [
    { name: 'hero',   title: '① Hero' },
    { name: 'stats',  title: '② Stats' },
    { name: 'why',    title: '③ Catalogue & Why sections' },
    { name: 'strip',  title: '④ Ticker strip' },
    { name: 'cta',    title: '⑤ CTA & Footer' },
  ],

  fields: [
    /* ── Hero ──────────────────────────────────────────────── */
    bil('heroEyebrow', 'Eyebrow line (e.g. "Yalova, Türkiye → …")',  'string', { group: 'hero' }),
    bil('heroTitleA',  'Title — word A (e.g. "Growing")',             'string', { group: 'hero' }),
    bil('heroTitleEm', 'Title — emphasis word (e.g. "the future")',   'string', { group: 'hero' }),
    bil('heroTitleB',  'Title — word B (e.g. "of greener cities.")',  'string', { group: 'hero' }),
    bil('heroSub',     'Subtitle paragraph',                          'text',   { group: 'hero' }),

    /* ── Stats ─────────────────────────────────────────────── */
    {
      name: 'heroStat1', title: 'Stat 1 — [number, label]', type: 'object', group: 'stats',
      description: 'e.g. ["40 ha", "Production area"]',
      fields: [
        { name: 'en', title: 'English — [number, label]', type: 'array', of: [{ type: 'string' }] },
        { name: 'ar', title: 'Arabic — [رقم, وصف]',       type: 'array', of: [{ type: 'string' }] },
      ],
    },
    {
      name: 'heroStat2', title: 'Stat 2 — [number, label]', type: 'object', group: 'stats',
      fields: [
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'string' }] },
        { name: 'ar', title: 'Arabic',  type: 'array', of: [{ type: 'string' }] },
      ],
    },
    {
      name: 'heroStat3', title: 'Stat 3 — [number, label]', type: 'object', group: 'stats',
      fields: [
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'string' }] },
        { name: 'ar', title: 'Arabic',  type: 'array', of: [{ type: 'string' }] },
      ],
    },
    bil('statsTitle', 'Stats section heading', 'string', { group: 'stats' }),

    /* ── Catalogue preview section ──────────────────────────── */
    bil('sec1Eyebrow', 'Catalogue section — eyebrow', 'string', { group: 'why' }),
    bil('sec1Title',   'Catalogue section — heading',  'string', { group: 'why' }),
    bil('sec1Sub',     'Catalogue section — body',     'text',   { group: 'why' }),

    /* ── "Why Bitki Hub" section ───────────────────────────── */
    bil('sec2Eyebrow', '"Why Bitki Hub" — eyebrow',  'string', { group: 'why' }),
    bil('sec2Title',   '"Why Bitki Hub" — heading',   'string', { group: 'why' }),

    /* ── Ticker strip ──────────────────────────────────────── */
    {
      name: 'stripItems', title: 'Ticker strip phrases', type: 'object', group: 'strip',
      description: 'Short phrases that scroll across the strip below the hero.',
      fields: [
        { name: 'en', title: 'English items', type: 'array', of: [{ type: 'string' }] },
        { name: 'ar', title: 'Arabic items',  type: 'array', of: [{ type: 'string' }] },
      ],
    },

    /* ── CTA section ───────────────────────────────────────── */
    bil('ctaTitle', 'CTA — heading',  'text',   { group: 'cta' }),
    bil('ctaSub',   'CTA — subtext',  'string',  { group: 'cta' }),

    /* ── Footer tagline ────────────────────────────────────── */
    bil('footerTagline', 'Footer — tagline', 'text', { group: 'cta' }),
  ],

  preview: {
    prepare: () => ({ title: '🌿 Site Content' }),
  },
}
