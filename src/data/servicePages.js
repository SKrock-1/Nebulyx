export const PROCESS_STEPS = [
  { key: 'Scope', line: 'Agreed in writing.', text: 'A short call, then a written scope, timeline and price you approve before anything starts.' },
  { key: 'Build', line: 'Progress every week.', text: 'We build in short cycles and show you working results every week, so you can steer early.' },
  { key: 'Test', line: 'On real devices.', text: 'Everything is checked on the phones, browsers and tools your customers and team actually use.' },
  { key: 'Handover', line: 'Yours to keep.', text: 'Code, accounts and content in your name, with notes on how to run and change it.' },
];

export const SERVICE_PAGES = {
  'web-building': {
    slug: 'websites',
    seoTitle: 'Website Design & Development for Founders — Nebulyx',
    metaDescription: 'Custom website design and development for founders: fast, search-friendly sites that turn visitors into customers. Fixed scope, and you own everything.',
    h1: 'Website design and development for founders',
    intro: [
      { strong: 'Your site is the first thing buyers check.', text: " If it's slow or generic, they leave before they understand what you do." },
      { strong: 'We build it around one job:', text: ' turning the right visitors into sign-ups, sales or booked calls.' },
    ],
    forWho: [
      'Founders launching a new product or company who need a credible site quickly',
      'Startups whose current site is slow, dated or hard to update',
      'Teams that want a distinctive site rather than a reskinned template',
      'Businesses that need the site to be found on Google and by AI assistants',
    ],
    faqs: [
      { q: 'Can I update the website myself after launch?', a: 'Yes. We set up a content editor so you can change text, images and pages without a developer, and walk you through it at handover.' },
      { q: 'Do I own the website and code?', a: 'Yes. The code, domain and hosting accounts are set up in your name. You can keep working with us, take it in-house or move to another team.' },
      { q: 'How long does a website take?', a: 'It depends on the number of pages and features. You get a written timeline with the scope before anything starts, and see progress every week.' },
    ],
  },
  'platform-automation': {
    slug: 'ai-automation',
    seoTitle: 'AI Automation Services for Startups & Small Teams — Nebulyx',
    metaDescription: 'AI agents and automated workflows that take repetitive work off your team: lead handling, data entry, invoices and customer requests, connected to your tools.',
    h1: 'AI automation for startups and small teams',
    intro: [
      { strong: 'Copy-paste work eats your week.', text: ' Data entry, follow-ups and the same questions, again and again.' },
      { strong: 'We automate the routine parts,', text: ' connected to the tools you already use, and flag anything unusual to a person.' },
    ],
    forWho: [
      'Teams spending hours a week on manual data entry or follow-ups',
      'Founders who answer the same customer or sales questions repeatedly',
      'Businesses whose CRM, billing and email tools do not talk to each other',
      'Companies that want to use AI practically, with clear guardrails',
    ],
    faqs: [
      { q: 'Which tools can you connect?', a: 'Most tools with an API or integration: CRMs, billing and payment tools, email, Slack, spreadsheets and databases. We confirm what is possible for your stack during scoping.' },
      { q: 'What happens when an automation gets something wrong?', a: 'Automations are built to flag anything unusual to a person instead of guessing, and you get a simple dashboard showing what ran and what needs attention.' },
      { q: 'Do I need technical staff to run it?', a: 'No. We hand over documentation and a walkthrough, and build the workflows so a non-technical team can see and adjust them.' },
    ],
  },
  'social-enhancement': {
    slug: 'social-media',
    seoTitle: 'Social Media Growth & Short-Form Content — Nebulyx',
    metaDescription: 'Short-form video and posts for TikTok, LinkedIn, YouTube and X, planned and scheduled for you, plus a simple process for turning messages into booked calls.',
    h1: 'Social media growth and short-form content',
    intro: [
      { strong: 'Posting consistently is hard while you build a company.', text: ' Sporadic, off-brand content rarely turns followers into customers.' },
      { strong: 'We plan, make and schedule it for you,', text: ' then turn comments and messages into real conversations.' },
    ],
    forWho: [
      'Founders who want to build an audience on LinkedIn or X',
      'Brands that need regular short-form video for TikTok, Reels or Shorts',
      'Businesses posting inconsistently without a clear plan',
      'Teams that get engagement but struggle to turn it into leads',
    ],
    faqs: [
      { q: 'Which platforms do you cover?', a: 'TikTok, Instagram, LinkedIn, YouTube and X. We focus on the two or three where your buyers actually spend time rather than spreading thin.' },
      { q: 'Do I need to be on camera?', a: 'Not necessarily. Founder-led content often performs best, but we can plan formats that work without you on camera.' },
      { q: 'How do you measure what is working?', a: 'You get a short report every two weeks covering what was posted, what performed and what we will change next.' },
    ],
  },
  'aeo-geo-marketing': {
    slug: 'ai-search',
    seoTitle: 'AI Search Optimization (AEO & GEO) — Nebulyx',
    metaDescription: 'Get found and described accurately when buyers ask ChatGPT, Perplexity, Claude or Gemini, with audits, structured data and content that answers real questions.',
    h1: 'AI search optimization (AEO and GEO)',
    intro: [
      { strong: 'Buyers now ask AI for recommendations.', text: " If assistants can't find clear facts about you, you're left out or described wrongly." },
      { strong: 'We make you easy for AI to understand:', text: ' clear answers, structured data and consistent descriptions across the web.' },
    ],
    forWho: [
      'Businesses that want to be recommended by AI assistants, not just ranked on Google',
      'Companies that AI tools describe with wrong or outdated information',
      'Brands entering a market where buyers research with AI before contacting anyone',
      'Teams that already invest in SEO and want to extend it to AI search',
    ],
    faqs: [
      { q: 'What is the difference between AEO, GEO and SEO?', a: 'SEO aims to rank your pages in search results. AEO (answer engine optimization) and GEO (generative engine optimization) make sure AI assistants can find, understand and accurately describe your business. Most businesses benefit from both.' },
      { q: 'Can you guarantee ChatGPT will recommend us?', a: 'No one can guarantee what an AI assistant says. We make your information clear, consistent and easy to cite, and track how assistants describe you each month.' },
      { q: 'Does this replace traditional SEO?', a: 'No. It builds on it. Fast, well-structured pages with clear answers help both search engines and AI assistants.' },
    ],
  },
  'dropshipping-models': {
    slug: 'online-stores',
    seoTitle: 'Online Store & Dropshipping Setup — Nebulyx',
    metaDescription: 'Launch an online store without holding stock: product research, suppliers, a storefront that sells, automated order handling and your first ad campaigns.',
    h1: 'Online store and dropshipping setup',
    intro: [
      { strong: 'A store is more than a website.', text: ' Products, suppliers, pricing, orders and first customers all have to work together.' },
      { strong: 'We set up the whole system,', text: ' with suppliers shipping direct to customers and orders handled automatically.' },
    ],
    forWho: [
      'First-time founders who want to sell online without holding stock',
      'Creators and brands turning an audience into a product line',
      'Existing businesses adding an online shop or TikTok Shop',
      'Store owners whose order handling is still manual',
    ],
    faqs: [
      { q: 'Do I need to hold inventory?', a: 'No. With dropshipping, suppliers ship directly to your customers, so you do not buy stock up front. We choose suppliers for reliable, fast delivery.' },
      { q: 'Which platform will the store run on?', a: 'Usually Shopify, connected to TikTok Shop and Meta for sales and ads. We confirm the right setup for your products during scoping.' },
      { q: 'Can I run the store myself after launch?', a: 'Yes. You get a playbook for daily operations, and orders, stock and tracking are automated so the routine work is minimal.' },
    ],
  },
};
