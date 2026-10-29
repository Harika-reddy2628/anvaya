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

/* Pricing. Matches the internal catalog v3 (Anvaya-CLI docs/ANVAYA_CATALOG_AND_TERMS_OF_WORK.md, 29 October 2026).
   India-only list in INR, priced per unit type (one floorplan). Update both together. */
export const reviewRounds = { included: 2, note: "Two rounds of changes are included, sent as one consolidated list each. Further rounds are ₹1,999 each." };
/** Founding-client offer: the first builders pay the offer price in return for a testimonial and portfolio permission. */
export const foundingOffer = {
  title: "Founding-client offer",
  detail: "Offer prices for our first 3 builders, in return for a short testimonial and permission to show the finished work.",
  slots: 3,
};
/* Each price row is [label, regular price, offer price]. The regular price shows struck through while the offer runs. */
export const plans = [
  {
    id: "stills", name: "Stills", practice: "3D Renders & Walkthroughs", available: true,
    prices: [["4 renders", "₹14,999", "₹9,999"]], unit: "per unit type", timeline: "5 working days",
    rounds: "2 rounds of changes",
    includes: ["4 photoreal interior renders: living, kitchen-dining, master bedroom and one room you choose", "Furnished in a clean, modern style", "Full-HD and print-size files for brochures and hoardings"],
  },
  {
    id: "tour", name: "360° Tour", practice: "3D Renders & Walkthroughs", available: true,
    prices: [["2BHK", "₹39,999", "₹24,999"], ["3BHK", "₹54,999", "₹34,999"]], unit: "per unit type · villa or 4BHK+ from ₹74,999", timeline: "7 working days",
    rounds: "2 rounds of changes",
    includes: ["A 360° website of the flat: buyers walk room to room on any phone or laptop", "One link for WhatsApp, plus a QR code for brochures and the site office", "The 4 stills, and 12 months of hosting"],
  },
  {
    id: "premium", name: "Premium", practice: "3D Renders & Walkthroughs", available: true,
    prices: [["From", "₹89,999", "₹59,999"]], unit: "per unit type", timeline: "10 working days",
    rounds: "2 rounds of changes",
    includes: ["Everything in the 360° Tour, with 8 stills instead of 4", "2 interior style options, such as warm wood and light minimal", "30-second video reel and a tour page with your project name, logo and enquiry button"],
  },
] as const;
export const addOns = [
  ["Another unit type, same project", "35% off"],
  ["3D floor plan (top-down, furnished)", "₹2,999"],
  ["Extra still image", "₹2,499"],
  ["Extra round of changes", "₹1,999"],
  ["Express delivery, about half the time", "+25%"],
  ["Tour hosting after the first year", "₹4,999 / year"],
] as const;
/** Services quoted after a short call. Prices are starting points, not packages. */
export const quoted = [
  { id: "interface", name: "Project website", price: "from ₹14,999", detail: "A landing page for one project with the tour, floorplans, location and an enquiry form." },
  { id: "automation", name: "Enquiry follow-up", price: "from ₹9,999 + ₹2,999 / month", detail: "Enquiries from your website and ads land in one sheet; buyers who opted in get WhatsApp follow-ups. WhatsApp’s own message charges are billed at cost." },
  { id: "spatial", name: "Video ads", price: "from ₹4,999 per ad", detail: "15–30 second ads for Instagram and YouTube, made from your project’s 3D visuals." },
  { id: "unsure", name: "Launch bundle", price: "from ₹99,999", detail: "Premium visuals, a project website and two video ads, about 10% below buying them separately." },
] as const;
export const terms = [
  ["Payment", "50% advance to start, 50% before final files. UPI or bank transfer. Previews carry a watermark until paid."],
  ["Review rounds", reviewRounds.note],
  ["Scope changes", "Changes cover furniture, finishes, lighting and camera angles. Moving walls or resizing rooms after you approve the layout is quoted as a new floorplan."],
  ["Confidentiality", "Your plans and renders are never shown to anyone without your written permission. We sign an NDA on request at no cost."],
  ["Same price for all", "Every builder pays from this same published list. The founding offer is open to the first 3 builders who sign, whoever they are."],
  ["Ownership", "You own the final images, videos and tour once the final payment is made. Our tools and furniture library stay with Anvaya."],
  ["RERA", "Renders are artist’s impressions of the approved plan. Label them so on brochures and ads, next to your project’s RERA registration number."],
  ["Warranty", "14 days to report a broken link, rendering error or wrong room. We fix it at no cost."],
  ["Third-party costs", "WhatsApp message charges and paid hosting, if ever needed, are listed and agreed up front. No GST is added at present."],
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
export const budgetOptions = ["Need guidance", "Under ₹15,000", "₹15,000–₹50,000", "₹50,000–₹1.5 lakh", "Above ₹1.5 lakh"] as const;
export const timelineOptions = ["Not sure yet", "As soon as possible", "In 1–3 months", "Later this year"] as const;
