import { NavItem, MetricItem, BentoTile, CliTab, FaqItem } from '../types';

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'The Colony', href: '#bento', badge: '✦' },
  { label: 'Terminal', href: '#workstation' },
  { label: 'Proof of Work', href: '#proof' },
  { label: 'FAQ', href: '#faq' },
];

export const HERO_METRICS: readonly MetricItem[] = [
  { value: '14 Days', label: 'Fixed Turnaround', highlight: false },
  { value: '100%', label: 'Day-1 IP Rights', highlight: true },
  { value: '<12ms', label: 'p99 Latency', highlight: false },
];

export const BENTO_TILES: readonly BentoTile[] = [
  {
    id: 'velocity',
    protocol: 'PROTOCOL 01 // VELOCITY',
    index: '[01 / 04]',
    title: '14-Day Production Sprints',
    description: 'Fixed scope. Fixed cadence. Guaranteed deployment. We eliminate endless hourly billing and deliver complete, test-covered architectures ready for real users and investors.',
    tag: '100% ON-TIME SLA',
    colSpan: 7,
  },
  {
    id: 'performance',
    protocol: 'PROTOCOL 02 // PERFORMANCE',
    index: '[02 / 04]',
    title: 'Sub-12ms p99 Edge Latency',
    description: 'Zero bloat. Built on edge runtimes with vector indexing, caching layers, and Draco WebGL compression.',
    tag: 'ACTIVE: 11.2ms',
    colSpan: 5,
  },
  {
    id: 'covenant',
    protocol: 'PROTOCOL 03 // COVENANT',
    index: '[03 / 04]',
    title: '100% Day-1 IP Ownership',
    description: 'No proprietary lock-in. Full GitHub repository transfer, clean MIT/Apache dual-licensing, and comprehensive documentation transferred on Day 1.',
    tag: 'VERIFIED REPO TRANSFER',
    colSpan: 5,
  },
  {
    id: 'council',
    protocol: 'PROTOCOL 04 // THE AGENT COUNCIL',
    index: '[04 / 04]',
    title: 'Industrious Multi-Agent Automation',
    description: 'Specialized autonomous agents continuously handle code scaffolding, AST refactoring, unit tests, and performance audits—amplifying our core engineering team to 10x output.',
    tag: '4 AGENTS SYNCHRONIZED',
    colSpan: 7,
  },
];

export const CLI_TABS: Record<'spatial' | 'vector' | 'compiler', CliTab> = {
  spatial: {
    id: 'spatial',
    label: '01 // 3D Spatial',
    command: 'anvaya spatial generate --scene="Contemporary Pavilion" --format="glb" --draco',
    logs: [
      '[INFO] Initializing Headless Blender 5.2 engine on dual Tesla T4...',
      '[INFO] Applying 2.0mm manufactured bevels & area-weighted vertex normals...',
      '[INFO] Draco WebGL compression: 18.4MB mesh optimized to 1.2MB (-93.4%)',
    ],
    successMessage: '[SUCCESS] Single-file deliverable generated: deliverables/contemporary_pavilion.glb',
  },
  vector: {
    id: 'vector',
    label: '02 // Neural pgvector',
    command: 'anvaya neural query --embedding="1536-dim" --top-k=5',
    logs: [
      '[INFO] Executing pgvector similarity search on Supabase cluster...',
      '[INFO] Cosine distance calculated across 450,000 document vectors...',
      '[INFO] Query latency: 7.4ms (Edge cached: 1.1ms)',
    ],
    successMessage: '[SUCCESS] Precision @ 5: 0.984 // Zero hallucinations',
  },
  compiler: {
    id: 'compiler',
    label: '03 // AST Compiler',
    command: 'anvaya check --strict --ast-diff',
    logs: [
      '[INFO] Scanning TypeScript / Rust abstract syntax tree...',
      '[INFO] Type safety: 100% strict. No any types detected.',
      '[INFO] Lighthouse performance budget: 100 / 100 (LCP: 0.8s)',
    ],
    successMessage: '[SUCCESS] Ready for main branch commit & Zero Trust deploy.',
  },
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'faq-1',
    index: '[01]',
    question: 'How can you ship an entire production system in 14 days?',
    answer: 'We do not start from a blank screen or bill by the hour. We utilize our battle-tested Anvaya engineering harness, autonomous multi-agent scaffolding, and pre-built infrastructure patterns. You get senior engineering execution focused exclusively on your product for 14 continuous days.',
  },
  {
    id: 'faq-2',
    index: '[02]',
    question: 'Do we really own 100% of the Intellectual Property?',
    answer: 'Yes, unconditionally. On Day 1, all Git repositories, infrastructure accounts, and deploy keys are transferred directly to your organization. Zero proprietary lock-in. Zero recurring agency licensing fees.',
  },
  {
    id: 'faq-3',
    index: '[03]',
    question: 'Do you work with both global and Indian companies?',
    answer: 'Yes. We operate remote-first across US/EU and Indian timezones with asynchronous Slack/GitHub updates and scheduled milestone syncs. We accept both USD (Stripe/Wire) and INR (Domestic Wire/GST).',
  },
  {
    id: 'faq-4',
    index: '[04]',
    question: 'What happens after the 14-day sprint is complete?',
    answer: 'We provide 30 days of direct post-launch Slack support, bug fixes, and seamless team handover documentation. If ongoing iteration is needed, we offer dedicated monthly engineering retainers.',
  },
];
