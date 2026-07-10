// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for all site copy, brand info, and product data.
// Swap in real content here — no component changes needed.
// `accentColor` on each product tints the DOM panel; `liquidColor` (optional,
// defaults to accentColor) softly tints the 3D pellets in the clear vial.
// ─────────────────────────────────────────────────────────────────────────────

export default {
  brand: {
    name: 'Essentia',
    tagline: 'Nature, potentised.',
    nav: [
      { label: 'Philosophy', href: '#philosophy' },
      { label: 'Remedies', href: '#products' },
      { label: 'Botanicals', href: '#ingredients' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  hero: {
    headline: 'Healing, one drop at a time.',
    subhead:
      'Classical homeopathic remedies prepared by hand — from tincture to potency — honouring two centuries of tradition.',
    cta: { label: 'Explore remedies', href: '#products' },
    scrollHint: 'Scroll to begin',
  },

  philosophy: {
    eyebrow: 'Our Philosophy',
    heading: 'Like cures like.',
    paragraphs: [
      'Homeopathy rests on a simple principle: a substance that produces symptoms in a healthy person may, in minute doses, stimulate the body’s own response to similar symptoms.',
      'Every Essentia remedy begins with a carefully sourced mother tincture, diluted and succussed by hand through each potency.',
    ],
    principles: [
      {
        title: 'Similia similibus',
        text: 'Remedies chosen on the principle of similars, matched to the whole person — not just the complaint.',
      },
      {
        title: 'Minimum dose',
        text: 'The gentlest possible stimulus. Potencies prepared through serial dilution and succussion.',
      },
      {
        title: 'Whole person',
        text: 'Mind, body and temperament considered together, the way classical homeopathy intended.',
      },
    ],
  },

  products: [
    {
      id: 'arnica',
      name: 'Arnica Montana 30C',
      benefit: 'Bruises · Muscular soreness · First aid',
      description:
        'The mountain daisy, trusted for generations as the first remedy reached for after knocks, falls and overexertion.',
      accentColor: '#c98a3d',
      liquidColor: '#e08a1e',
    },
    {
      id: 'chamomilla',
      name: 'Chamomilla 200C',
      benefit: 'Restlessness · Teething · Irritability',
      description:
        'German chamomile, the classic remedy for sensitivity and sleeplessness — gentle enough for the whole family.',
      accentColor: '#87a187',
      liquidColor: '#3f9e5a',
    },
    {
      id: 'nux-vomica',
      name: 'Nux Vomica 30C',
      benefit: 'Digestion · Overindulgence · Modern stress',
      description:
        'The remedy of modern life — for the effects of rich food, late nights and a demanding pace.',
      accentColor: '#8a6f9e',
      liquidColor: '#7b4fc9',
    },
  ],

  ingredients: {
    eyebrow: 'From the Garden',
    heading: 'Botanicals, respected.',
    intro:
      'Each mother tincture is prepared from plants grown or wildcrafted with care, identified and documented at source.',
    botanicals: [
      { name: 'Arnica', latin: 'Arnica montana', note: 'Alpine meadows, harvested in flower' },
      { name: 'Chamomile', latin: 'Matricaria chamomilla', note: 'Whole flowering plant, fresh' },
      { name: 'Calendula', latin: 'Calendula officinalis', note: 'Sun-opened blossoms only' },
      { name: 'Belladonna', latin: 'Atropa belladonna', note: 'Prepared under pharmacopoeia standards' },
      { name: 'Bryonia', latin: 'Bryonia alba', note: 'Root, gathered before flowering' },
      { name: 'Pulsatilla', latin: 'Pulsatilla pratensis', note: 'Windflower, whole fresh plant' },
    ],
  },

  testimonials: {
    eyebrow: 'Kind Words',
    heading: 'Trusted at home.',
    quotes: [
      {
        quote:
          'The Arnica is the first thing in our sports bag. Beautifully made remedies from people who clearly care.',
        author: 'Meera S.',
        detail: 'Customer for 6 years',
      },
      {
        quote:
          'I appreciate the transparency — every remedy lists its source and preparation. That trust matters.',
        author: 'Daniel K.',
        detail: 'Homeopathy user, Berlin',
      },
      {
        quote:
          'Chamomilla saw us through teething with both children. The little pillules are a ritual of calm.',
        author: 'Aisha R.',
        detail: 'Mother of two',
      },
    ],
  },

  contact: {
    eyebrow: 'Begin Gently',
    heading: 'Find your remedy.',
    subhead:
      'Questions about a remedy or potency? Write to us — a qualified homeopath answers every message.',
    ctaLabel: 'Send enquiry',
    email: 'hello@essentia.example',
    // Paste a form endpoint (e.g. https://formspree.io/f/xxxx) to enable
    // in-page submission; empty = opens the visitor's mail client instead.
    formEndpoint: '',
    successMessage: 'Thank you — we’ll reply within two working days.',
    errorMessage: 'Something went wrong. Please email us directly instead.',
    disclaimer:
      'Homeopathic products have not been evaluated by regulatory authorities for efficacy. Not a substitute for professional medical care. Seek medical advice for serious conditions.',
  },

  footer: {
    legal: '© 2026 Essentia Homeopathy. All rights reserved.',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Instagram', href: '#' },
    ],
  },
}
