export const PACKAGES = [
  {
    id: 'starter',
    name: 'STARTER',
    price: '₹10,000',
    tag: 'DEVELOPMENT FEE',
    pages: 'Up to 4 pages',
    blurb: 'A clean professional website for a focused online presence.',
    longBlurb:
      'A professional, responsive website for a clear online presence.',
    features: [
      'Up to 4 pages',
      'Home, About, Services, Contact',
      'WhatsApp + click-to-call',
      'Google Maps integration',
      'Enquiry / contact form',
      'Basic on-page SEO',
    ],
    accent: '#38e1ff',
  },
  {
    id: 'business',
    name: 'BUSINESS',
    price: '₹15,000',
    tag: 'DEVELOPMENT FEE',
    pages: 'Up to 6 pages',
    blurb: 'More content, stronger enquiry flow and richer trust sections.',
    longBlurb: 'A fuller site with stronger content and enquiry flow.',
    features: [
      'Everything in Starter',
      'Up to 6 pages',
      'Custom UI / UX structure',
      'Gallery + FAQ + testimonials',
      'WhatsApp enquiry flow',
      'Search Console + speed work',
    ],
    accent: '#7c5cff',
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    price: '₹22,000',
    tag: 'DEVELOPMENT FEE',
    pages: 'Up to 10 pages',
    blurb: 'A more polished multi-offering website with detailed pages.',
    longBlurb:
      'A larger, more polished website for institutes or businesses with multiple offerings.',
    features: [
      'Everything in Business',
      'Up to 10 pages',
      'Custom page layouts',
      'Course / service detail pages',
      'Advanced gallery and enquiry forms',
      'Google Analytics setup',
      'Search Console setup',
      'Advanced SEO + performance',
      'Refined interactive elements',
    ],
    accent: '#f5b942',
  },
  {
    id: 'business-pro',
    name: 'BUSINESS PRO',
    price: '₹35,000',
    tag: 'DEVELOPMENT FEE',
    pages: 'Up to 15 pages',
    blurb: 'Content-driven website with CMS capability for ongoing updates.',
    longBlurb:
      'A content-driven website with a manageable structure for ongoing updates.',
    features: [
      'Everything in Professional',
      'Up to 15 pages',
      'Blog / news section',
      'CMS / content-management capability',
      'Manage courses, gallery and testimonials',
      'Structured data / schema setup',
      'Advanced lead-generation UX',
      'Analytics + Search Console integration',
    ],
    accent: '#ff5c8a',
  },
]

export const FOUNDATION = [
  { n: '01', title: 'Responsive build', desc: 'Mobile, tablet and desktop implementation.' },
  { n: '02', title: 'Clear structure', desc: 'Clean navigation and readable page hierarchy.' },
  { n: '03', title: 'Deployment + SSL', desc: 'Production deployment with SSL / HTTPS.' },
  { n: '04', title: 'Performance first', desc: 'Performance-conscious implementation without unnecessary effects.' },
  { n: '05', title: 'Accessibility', desc: 'Basic accessibility and semantic HTML considerations.' },
  { n: '06', title: 'Source-code handover', desc: 'Final source-code handover after delivery.' },
]

export const INFRA = [
  {
    title: 'DOMAIN',
    sub: 'Client-paid · Registration + renewal',
    desc: 'The domain is purchased and renewed by the client through the selected registrar.',
  },
  {
    title: 'HOSTING',
    sub: 'Client-paid · Hosting plan + renewal',
    desc: 'The client pays the selected hosting provider according to the chosen plan and usage.',
  },
  {
    title: 'DATABASE / CLOUD',
    sub: 'Client-paid when required · Usage / storage / compute',
    desc: 'Database, storage, serverless functions or other cloud resources are separate provider charges.',
  },
  {
    title: 'THIRD-PARTY SERVICES',
    sub: 'Client-paid when required · Email / APIs / premium tools',
    desc: 'Business email, paid APIs, premium plugins and similar services are outside the development fee.',
  },
]

export const COMPARISON_ROWS: { feature: string; values: (string | boolean)[] }[] = [
  { feature: 'Pages included', values: ['4', '6', '10', '15'] },
  { feature: 'Responsive across devices', values: [true, true, true, true] },
  { feature: 'Domain / DNS setup', values: [true, true, true, true] },
  { feature: 'Hosting / SSL setup', values: [true, true, true, true] },
  { feature: 'Enquiry / contact form', values: [true, true, true, true] },
  { feature: 'WhatsApp + click-to-call', values: [true, true, true, true] },
  { feature: 'Google Maps integration', values: [true, true, true, true] },
  { feature: 'Gallery / FAQ / testimonials', values: [false, true, true, true] },
  { feature: 'Course / service detail pages', values: [false, false, true, true] },
  { feature: 'Blog / news section', values: [false, false, false, true] },
  { feature: 'On-page SEO', values: [true, true, true, true] },
  { feature: 'Search Console', values: [false, true, true, true] },
  { feature: 'Google Analytics', values: [false, false, true, true] },
  { feature: 'Structured data / schema', values: [false, false, false, true] },
  { feature: 'CMS / self-managed updates', values: [false, false, false, true] },
]

export const TERMS = [
  {
    n: '1',
    title: 'DEVELOPMENT FEE',
    desc: 'One-time project charge covering design, development and the listed technical scope.',
  },
  {
    n: '2',
    title: 'INFRASTRUCTURE',
    desc: 'Domain, hosting, database/cloud, business email, paid APIs, premium services and similar provider charges are paid separately by the client.',
  },
  {
    n: '3',
    title: 'SETUP + DEPLOYMENT',
    desc: 'Domain connection, DNS, hosting configuration, SSL / HTTPS and production deployment are included in the selected website package.',
  },
  {
    n: '4',
    title: 'REVISIONS',
    desc: 'Revision limits and final content handover are confirmed in the quotation before development begins.',
  },
  {
    n: '5',
    title: 'MAINTENANCE',
    desc: 'Future updates, new pages, feature changes and ongoing maintenance are outside the one-time scope unless separately agreed.',
  },
]

export const SOCIALS = [
  { label: 'GITHUB', value: 'github.com/Sagar264Offici', href: 'https://github.com/Sagar264Offici' },
  { label: 'LINKEDIN', value: 'linkedin.com/sagarakanoone', href: 'https://linkedin.com/in/sagarakanoone' },
  { label: 'INSTAGRAM', value: 'instagram.com/multiverse.sagar', href: 'https://instagram.com/multiverse.sagar' },
]
