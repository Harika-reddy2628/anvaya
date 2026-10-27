const url = (value?: string) => (value?.trim().startsWith("https://") ? value.trim() : "");

export const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "",
  // The studio address. Until the owner sets it, the footer shows the location confirmed so far.
  address: (process.env.NEXT_PUBLIC_STUDIO_ADDRESS?.trim() || "India").split("|").map(line => line.trim()),
  socials: [
    ["LinkedIn", process.env.NEXT_PUBLIC_LINKEDIN_URL],
    ["Instagram", process.env.NEXT_PUBLIC_INSTAGRAM_URL],
    ["GitHub", process.env.NEXT_PUBLIC_GITHUB_URL],
    ["Behance", process.env.NEXT_PUBLIC_BEHANCE_URL],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]?.startsWith("https://"))),
};

/** Footer social icons. Every network shows; an icon becomes a link only once its URL is configured. */
export const socialIcons = [
  { name: "LinkedIn", href: url(process.env.NEXT_PUBLIC_LINKEDIN_URL) },
  { name: "Instagram", href: url(process.env.NEXT_PUBLIC_INSTAGRAM_URL) },
  { name: "X", href: url(process.env.NEXT_PUBLIC_X_URL) },
  { name: "Behance", href: url(process.env.NEXT_PUBLIC_BEHANCE_URL) },
  { name: "Dribbble", href: url(process.env.NEXT_PUBLIC_DRIBBBLE_URL) },
  { name: "GitHub", href: url(process.env.NEXT_PUBLIC_GITHUB_URL) },
] as const;

/* Pricing. Ranges, timelines, payment, ownership and warranty restate the published project terms (/terms).
   Review rounds are a working default the owner asked for (27 October 2026) and should be confirmed. */
export const reviewRounds = { included: 2, note: "Two rounds of changes per stage are included. Further rounds are quoted before work begins." };
export const plans = [
  {
    id: "spatial", name: "3D renders", practice: "3D Renders & Walkthroughs", available: true,
    price: "₹40,000–1,20,000", alt: "$500–1,500", unit: "per image set or space", timeline: "48 hours–5 business days",
    rounds: "2 rounds of changes per image set",
    includes: ["Agreed images, 3D model or walkthrough", "High-resolution images ready for web and print", "Source 3D files (.blend, .glb) where applicable"],
  },
  {
    id: "sprint", name: "14-day build", practice: "Apps & Software · AI & Automation", available: false,
    price: "₹1,25,000–2,75,000", alt: "$1,500–3,500", unit: "fixed scope", timeline: "14 calendar days",
    rounds: "2 rounds of changes: screens, then build",
    includes: ["One agreed first version of an app, or one AI workflow", "Build, launch and written documentation", "Full source code handed over to you"],
  },
  {
    id: "partner", name: "Monthly tech team", practice: "All services", available: true,
    price: "$2,500–4,500", alt: "billed in USD", unit: "per month", timeline: "Ongoing, agreed monthly scope",
    rounds: "Review at every agreed delivery",
    includes: ["A dedicated team working on your product", "Agreed monthly plan and priorities", "Design, development, AI and 3D specialists"],
  },
] as const;
export const terms = [
  ["Payment", "50% to begin, 50% on final verified delivery — or an agreed, fully funded platform escrow."],
  ["Review rounds", reviewRounds.note],
  ["Scope changes", "Reviewed together; any effect on timing and price is agreed before extra work starts."],
  ["Ownership", "You own 100% of the delivered code, files and 3D assets once the final payment is made."],
  ["Warranty", "14 days of technical defect fixes on the delivered scope, at no extra cost."],
  ["Third-party costs", "Any outside costs (hosting, software subscriptions) are listed and agreed with you up front."],
] as const;

/** Social proof. Counts stay at zero until genuine reviews and testimonials are collected; never mock data. */
export const proof = { reviews: 0, testimonials: 0, rating: 0, caseStudies: 1 } as const;

export const practices = [
  {
    id: "interface", slug: "digital-presence", offer: "Websites, online stores, app design and branding.", number: "01", name: "Websites & Branding", comingSoon: false,
    line: "A website that explains your business in seconds.",
    summary: "Business websites, online stores, app screens and brand identity — built so customers quickly understand you and get in touch.",
    tags: "WEBSITES / ONLINE STORES / APP & SCREEN DESIGN / LOGO & BRANDING",
    intro: "We design and build websites and brand identities that make your business easy to understand, easy to trust and easy to contact.",
    action: "Get a website quote",
    createHeading: "What we build for you.",
    capabilities: [
      ["Business websites", "Fast, mobile-friendly websites that tell visitors what you do and how to reach you."],
      ["Online stores", "Shops that make it simple for customers to find a product, pay and order again."],
      ["App and screen design", "Clear, easy-to-use screens for apps, portals and software (UI/UX)."],
      ["Logo and branding", "A logo, colours and style guide so your business looks the same everywhere."],
    ],
    problemHeading: "Your business has grown. Your website should too.",
    problem: ["We are a good fit if your website looks outdated, does not explain what you do, does not bring in enquiries or is hard to update.", "We fix the message, the design and the technology behind it."],
    approachHeading: "Four simple steps.",
    steps: [
      ["Understand", "We learn who your customers are and what they need to know."],
      ["Plan", "We plan the pages, the content and what visitors should do next."],
      ["Design", "We create a look that fits your brand and is easy to use."],
      ["Build and launch", "We build a fast website that works on every phone and computer, then take it live."],
    ],
    finalHeading: "Ready for a better website?", finalAction: "Start a website project",
  },
  {
    id: "product", slug: "digital-products", offer: "Mobile apps, web apps, dashboards and custom software.", number: "02", name: "Apps & Software", comingSoon: true,
    line: "Turn your idea into an app people actually use.",
    summary: "Mobile apps, web apps, dashboards and custom software, designed around how your customers and team really work.",
    tags: "MOBILE APPS / WEB APPS / DASHBOARDS / CUSTOM SOFTWARE",
    intro: "We design and build apps and software that are simple to use and dependable behind the scenes.",
    action: "Discuss your app idea", createHeading: "What we build for you.",
    capabilities: [
      ["Online platforms", "Software your customers sign up for and use — bookings, portals, subscriptions (SaaS)."],
      ["Dashboards and reports", "One screen that shows your sales, stock or operations so you can decide faster."],
      ["Web apps", "Complete browser-based software, from the screens to the database behind them."],
      ["Android apps", "Mobile apps designed for phones first, not shrunk from a desktop screen."],
    ],
    problemHeading: "From “we have an idea” to “it is live.”",
    problem: ["We help when you have an idea but no plan yet, when your current app has become hard to use, or when your team needs a clear path from screens to a working product."],
    approachHeading: "Four simple steps.",
    steps: [
      ["Understand the users", "Who will use it, what they need and where they get stuck today."],
      ["Pick the first version", "Agree the few features that matter most for launch."],
      ["Design the screens", "Make it simple and clear before adding more."],
      ["Build and test", "Build a dependable product and test it with real users."],
    ],
    finalHeading: "Have an app idea?", finalAction: "Discuss your app idea",
  },
  {
    id: "automation", slug: "intelligent-operations", offer: "AI assistants, WhatsApp bots and automated workflows.", number: "03", name: "AI & Automation", comingSoon: true,
    line: "Let software handle the repetitive work.",
    summary: "AI assistants, WhatsApp bots and automated workflows that save your team hours — with a person still in charge.",
    tags: "AI ASSISTANTS / WHATSAPP BOTS / AUTOMATED WORKFLOWS / CONNECTED TOOLS",
    intro: "We set up AI tools and automations that take repeated tasks off your team, connect the software you already use and leave the important decisions to people.",
    action: "Discuss an automation", createHeading: "What we build for you.",
    capabilities: [
      ["AI workflows", "AI that can research, sort and pass along multi-step work, so tasks do not wait on someone."],
      ["AI assistants", "Helpers that answer customer questions or help your team find information quickly."],
      ["WhatsApp bots", "Automatic WhatsApp replies for orders, bookings, updates and common questions."],
      ["Automated follow-ups", "Reminders, data entry and hand-offs that run on their own instead of by hand."],
    ],
    problemHeading: "Automate the busywork. Keep people in charge.",
    problem: ["We do not automate for the sake of it. The goal is fewer repeated tasks, fewer missed follow-ups, a clear view of what is happening and faster replies to customers.", "Wherever a person needs to approve something, the system asks them first."],
    approachHeading: "Four simple questions.",
    steps: [
      ["Trigger", "What starts the task — a message, a form, an order?"],
      ["Work", "What should the system read, sort or prepare?"],
      ["Approval", "Where should a person check, approve or step in?"],
      ["Result", "What becomes faster, cheaper or easier to track?"],
    ],
    finalHeading: "Have work that repeats every day?", finalAction: "Discuss an automation",
  },
  {
    id: "spatial", slug: "spatial-visuals", offer: "3D renders, interior views, 3D models and virtual walkthroughs.", number: "04", name: "3D Renders & Walkthroughs", comingSoon: false,
    line: "See your space before it is built.",
    summary: "Realistic 3D renders, interior views and virtual walkthroughs for homes, offices and real-estate projects.",
    tags: "EXTERIOR RENDERS / INTERIOR RENDERS / 3D MODELS / VIRTUAL WALKTHROUGHS",
    intro: "Send us your plans and ideas. We turn them into realistic images and walkthroughs, so you and your buyers can see the space before it is built.",
    action: "Get a 3D quote", createHeading: "What we create for you.",
    capabilities: [
      ["Exterior renders", "Photo-realistic images of the building, showing its size, setting and finish."],
      ["Interior renders", "Room-by-room views showing light, materials and furniture."],
      ["3D models", "Accurate 3D models you can review, present and change before work starts."],
      ["Virtual walkthroughs", "Click-through tours that let buyers or clients walk the space from their phone."],
    ],
    problemHeading: "Plans are hard to imagine. Pictures sell.",
    problem: ["A floor plan can be accurate and still hard to picture. We help architects, interior designers, builders and homeowners see the look and feel of a space before spending money on construction."],
    approachHeading: "Four simple steps.",
    steps: [
      ["Study the plans", "We go through your drawings, site direction and how the space will be used."],
      ["Agree the look", "We confirm materials, lighting and style with you."],
      ["Create the 3D", "We model the space and set up the key views."],
      ["Polish and deliver", "We refine the details and deliver final images and files."],
    ],
    finalHeading: "Have a project that needs 3D visuals?", finalAction: "Get a 3D quote",
  },
] as const;
export type Practice = typeof practices[number];
export const processSteps = [
  ["Listen", "We understand your business, your customers and what you need."],
  ["Plan", "We agree the work, the timeline and the price in writing."],
  ["Design", "We show you the design and make changes with you."],
  ["Deliver", "We build, test and hand over work that is ready to use."],
] as const;
export const budgetOptions = ["Need guidance", "Under ₹50,000 (about $600)", "₹50,000–₹1.5 lakh (about $600–1,800)", "₹1.5–5 lakh (about $1,800–6,000)", "Above ₹5 lakh (about $6,000+)"] as const;
export const timelineOptions = ["Not sure yet", "As soon as possible", "In 1–3 months", "Later this year"] as const;
