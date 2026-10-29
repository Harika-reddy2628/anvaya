export type ServiceId = "product" | "automation" | "spatial" | "interface";

export const studio = {
  name: "Anvaya",
  location: "Bengaluru, India",
  // Add only confirmed public contact details. No provisional email or links.
  email: "",
};

export const services = [
  {
    id: "product" as const,
    number: "01",
    title: "Launch a product.",
    name: "Product engineering",
    description:
      "Turn a focused idea into a production-ready web or mobile product, with the engineering to keep growing.",
    deliverables: [
      "Product flows and a custom interface",
      "Backend APIs and data architecture",
      "Agreed integrations and deployment",
      "Source code and handover documentation",
    ],
    scope:
      "A 14-calendar-day sprint covers one agreed MVP scope. Larger products are broken into separately scoped releases. Access, assets, and acceptance criteria are agreed before the sprint begins.",
    stack: ["Next.js", "React", "FastAPI", "Node.js"],
    estimate: "$1,500–$3,500",
    timeline: "14 calendar days · agreed MVP scope",
    related: "oppy",
  },
  {
    id: "automation" as const,
    number: "02",
    title: "Put workflows to work.",
    name: "Agentic AI & automation",
    description:
      "Connect the tools, documents, and decisions your business relies on. Build automation around a real operational need.",
    deliverables: [
      "Multi-agent workflow orchestration",
      "Document retrieval and RAG pipelines",
      "Scrapers and business integrations",
      "Voice agents with scoped telephony integration",
    ],
    scope:
      "A 14-calendar-day sprint covers one agreed pipeline and its integrations. Telephony, external API access, and usage charges are scoped separately before work begins.",
    stack: ["Python", "Agent orchestration", "RAG", "APIs"],
    estimate: "$1,500–$3,500",
    timeline: "14 calendar days · agreed pipeline",
    related: "guild",
  },
  {
    id: "spatial" as const,
    number: "03",
    title: "Make spaces tangible.",
    name: "Spatial 3D & digital twins",
    description:
      "Let people explore a property, configure a product, or navigate a space before they ever step inside.",
    deliverables: [
      "Interactive web viewers and digital twins",
      "Architectural visualization and 4K walkthroughs",
      "Product configurators and AR-ready assets",
      "Packed master assets in .blend / .glb",
    ],
    scope:
      "Pricing is per agreed asset or space. The 48-hour to 5-business-day turnaround depends on source materials, model complexity, and the agreed review scope.",
    stack: ["Three.js", "Blender / Cycles", "Draco GLB", "USDZ"],
    estimate: "$500–$1,500",
    timeline: "48 hours–5 business days · per asset or space",
    related: "spatial-engine",
  },
  {
    id: "interface" as const,
    number: "04",
    title: "Give your product an edge.",
    name: "Performance & interface design",
    description:
      "Replace a cumbersome frontend with a considered interface. Improve the experience, loading performance, and path to conversion.",
    deliverables: [
      "Product UX and interface redesign",
      "Reusable frontend components",
      "Performance audit and implementation",
      "Shopify / Webflow integration where scoped",
    ],
    scope:
      "Modernization is quoted after reviewing the existing product, page count, integrations, and performance constraints. A conversion increase is not guaranteed.",
    stack: ["React", "Tailwind CSS", "Web performance", "Design systems"],
    estimate: "Quoted to scope",
    timeline: "Timeline agreed after product review",
    related: "spatial-engine",
  },
];

export const projects = [
  {
    slug: "spatial-engine",
    title: "Space, made interactive.",
    name: "Anvaya Spatial Web Engine",
    category: "Spatial 3D",
    kind: "Internal product",
    visual: "spatial" as const,
    intro:
      "A lightweight web component for exploring spaces and products directly in the browser.",
    problem:
      "Static images leave buyers guessing about layout, scale, and how a product fits into their space.",
    solution:
      "Anvaya’s <anvaya-viewer> approach brings compressed 3D assets into an interactive, embeddable web experience.",
    outcome:
      "A web experience that makes spatial relationships explorable without a separate app.",
    details: [
      "Draco-compressed GLB delivery",
      "Embeddable web component",
      "Mobile-first spatial interaction",
      "Product and property use cases",
    ],
    evidence:
      "The viewer below is an interactive illustration built for this website. The production component and its asset-size and load-time benchmarks are not demonstrated here.",
    external: "",
  },
  {
    slug: "guild",
    title: "A workflow with a workforce.",
    name: "Guild Command Center",
    category: "Agentic AI",
    kind: "Internal showcase",
    visual: "workflow" as const,
    intro:
      "A multi-agent platform connecting lead intelligence, technical proposals, and resume preparation.",
    problem:
      "Finding relevant opportunities and preparing tailored responses involves repetitive work across disconnected tools.",
    solution:
      "A coordinated agent pipeline brings lead intelligence, technical proposal generation, and ATS resume compilation into one workflow.",
    outcome:
      "A connected workflow from opportunity discovery to prepared application materials.",
    details: [
      "Lead intelligence across Freelancer and Internshala",
      "Technical proposal generation",
      "ATS resume compilation",
      "Multi-agent orchestration",
    ],
    evidence:
      "This page shows a simplified architectural diagram, not a recording or live connection to Guild. Client conversion or time-saving metrics have not been published.",
    external: "",
  },
  {
    slug: "oppy",
    title: "Opportunity, from the terminal.",
    name: "Oppy CLI",
    category: "Developer tooling",
    kind: "Public product",
    visual: "terminal" as const,
    intro:
      "A local-first command-line tool that brings opportunity discovery into a developer’s workflow.",
    problem:
      "Relevant internships and hackathons are scattered across multiple sources and are difficult to keep organized.",
    solution:
      "Oppy gathers opportunities into a local SQLite cache and exports a Markdown dashboard for a directory or Obsidian vault.",
    outcome:
      "A searchable local workflow and portable Markdown output, accessible through @dshenoyh/oppy-cli.",
    details: [
      "Command-line and terminal UI workflows",
      "Local SQLite cache",
      "Markdown dashboard export",
      "Published npm package",
    ],
    evidence:
      "The command reference uses documented Oppy commands. It does not execute the package in your browser or display live results.",
    external: "https://www.npmjs.com/package/@dshenoyh/oppy-cli",
  },
  {
    slug: "architectural-walkthrough",
    title: "A home before it’s built.",
    name: "Luxury 3BHK Walkthrough",
    category: "Spatial 3D",
    kind: "Internal showcase",
    visual: "spatial" as const,
    intro:
      "A photorealistic architectural walkthrough suite for a three-bedroom residence.",
    problem:
      "Plans and finish schedules can be difficult to translate into an understandable buying experience.",
    solution:
      "Blender Cycles renders, carefully controlled camera motion, material studies, and SI room dimensions bring the design into a visual walkthrough.",
    outcome:
      "An architectural presentation connecting floor plans, interior finishes, and a guided spatial experience.",
    details: [
      "4K Cycles rendering",
      "Controlled architectural camera motion",
      "Interior finish visualization",
      "SI metric room planning",
    ],
    evidence:
      "The floor plan illustration is sample geometry, not the actual 3BHK model. A walkthrough recording has not been supplied for this page.",
    external: "",
  },
  {
    slug: "quality-harness",
    title: "Verification, built into delivery.",
    name: "Automated Verification Harness",
    category: "Developer tooling",
    kind: "Anonymous case study",
    visual: "verification" as const,
    intro:
      "An automated code quality and verification harness, presented without private client identifiers.",
    problem:
      "Manual verification makes it difficult to spot regressions consistently as software evolves.",
    solution:
      "Automated test and code quality checks turn expected behavior into repeatable verification.",
    outcome:
      "A repeatable engineering workflow for identifying defects and inspecting code quality.",
    details: [
      "Test automation",
      "Repeatable verification",
      "Code quality checks",
      "Private client details withheld",
    ],
    evidence:
      "The visual is a workflow illustration. No private source code, client names, or unverified defect-reduction percentages are published.",
    external: "",
  },
  {
    slug: "sutra",
    title: "From control logic to physical worlds.",
    name: "SUTRA Robotics Simulation",
    category: "Robotics",
    kind: "Internal showcase",
    visual: "robotics" as const,
    intro:
      "A robotics simulation system connecting autonomous control with physical twin worlds.",
    problem:
      "Robotics control needs to be exercised in realistic environments before physical deployment.",
    solution:
      "Gazebo simulation worlds and microXRCE-DDS setpoint communication connect control software to a physical simulation.",
    outcome:
      "A simulation environment for exercising autonomy and control behavior.",
    details: [
      "Gazebo Sim physical twin worlds",
      "microXRCE-DDS communication",
      "Autonomous control pipelines",
      "Automated verification",
    ],
    evidence:
      "The diagram is illustrative. The team-reported test count and setpoint frequency are not published as verified benchmarks without a linked report and measurement context.",
    external: "",
  },
];

export type Project = (typeof projects)[number];
