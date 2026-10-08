export const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "",
  socials: [
    ["LinkedIn", process.env.NEXT_PUBLIC_LINKEDIN_URL],
    ["Instagram", process.env.NEXT_PUBLIC_INSTAGRAM_URL],
    ["GitHub", process.env.NEXT_PUBLIC_GITHUB_URL],
    ["Behance", process.env.NEXT_PUBLIC_BEHANCE_URL],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]?.startsWith("https://"))),
};

export const practices = [
  {
    id: "interface", slug: "digital-presence", number: "01", name: "Digital Presence",
    line: "Make the first impression useful.",
    summary: "Websites, e-commerce, UI/UX and brand systems for businesses that need to be understood and chosen.",
    tags: "WEB DESIGN / WEB DEVELOPMENT / E-COMMERCE / UI/UX / BRAND SYSTEMS",
    intro: "We create websites and brand systems that make a business easier to understand, easier to trust and easier to choose.",
    action: "Tell us what you are building",
    createHeading: "An online presence should do more than look finished.",
    capabilities: [
      ["Websites", "Clear, high-performing websites built around the people you want to reach."],
      ["E-commerce", "Thoughtful shopping experiences that make discovery and purchase feel simple."],
      ["UI/UX design", "Interfaces shaped around real tasks, decisions and journeys."],
      ["Brand systems", "Visual foundations that help a business look consistent wherever it appears."],
    ],
    problemHeading: "When the business has changed, the website should catch up.",
    problem: ["We are a good fit when your business is growing but your digital presence still feels unclear, outdated, disconnected or too difficult to manage.", "We bring structure to the message, the experience and the system behind it."],
    approachHeading: "Position. Structure. Design. Build.",
    steps: [
      ["Position", "We clarify who the business is for and what should become clear."],
      ["Structure", "We organise the content, journeys and priorities."],
      ["Design", "We build a visual language that feels recognisable and useful."],
      ["Build", "We turn the direction into a fast, responsive digital experience."],
    ],
    finalHeading: "Ready to make your presence clearer?", finalAction: "Start a digital presence project",
  },
  {
    id: "product", slug: "digital-products", number: "02", name: "Digital Products",
    line: "Turn a complex idea into something people can use.",
    summary: "Platforms, dashboards and applications designed around real people, real workflows and a clear next step.",
    tags: "FULL-STACK APPLICATIONS / DASHBOARDS / PLATFORMS / SAAS / ANDROID APPS",
    intro: "We design and build digital products around real behaviour, real decisions and the systems that make the experience work.",
    action: "Discuss a product idea", createHeading: "Products with a reason to exist.",
    capabilities: [
      ["Platforms and SaaS", "Products designed to make a bigger process feel clear and manageable."],
      ["Dashboards", "Interfaces that turn information into useful action."],
      ["Full-stack applications", "Web applications where the experience and the underlying system are designed together."],
      ["Android products", "Mobile experiences shaped for the task, not simply reduced from a desktop screen."],
    ],
    problemHeading: "From “we have an idea” to “people can use it.”",
    problem: ["We help when the direction is still forming, the product has become difficult to use, or the team needs a clearer path from user flow to working build."],
    approachHeading: "Start with the journey. Build the system around it.",
    steps: [
      ["Map the flow", "Identify who uses the product, what they need and where friction appears."],
      ["Define the core", "Focus the first release around the most important job."],
      ["Design the experience", "Make the product clear before making it complex."],
      ["Build and test", "Turn the direction into a dependable working product."],
    ],
    finalHeading: "Have a product that needs a clearer way forward?", finalAction: "Start a product conversation",
  },
  {
    id: "automation", slug: "intelligent-operations", number: "03", name: "Intelligent Operations",
    line: "Make repeated work move with more clarity.",
    summary: "Agentic workflows, AI support and WhatsApp automation that reduce friction without removing human judgement.",
    tags: "AGENTIC WORKFLOWS / AI SYSTEMS / WHATSAPP AUTOMATION / BUSINESS AUTOMATION",
    intro: "We design AI-supported workflows and business automations that reduce friction, connect systems and keep people focused on the work that needs human judgement.",
    action: "Explore an intelligent workflow", createHeading: "Useful intelligence, connected to real work.",
    capabilities: [
      ["Agentic workflows", "AI-enabled systems that can research, organise, route and support multi-step work."],
      ["AI support systems", "Practical assistants for internal teams, knowledge access and customer support."],
      ["WhatsApp automation", "Clear conversation flows that help customers get timely information and take the next step."],
      ["Business automation", "Connected workflows for tasks that should not depend on manual follow-up every time."],
    ],
    problemHeading: "Automate the friction. Keep the judgement human.",
    problem: ["The goal is not automation for its own sake. The goal is a more useful operation: fewer repeated tasks, clearer handoffs, better visibility and a better experience for customers and teams.", "When human approval matters, we design the workflow to keep it visible."],
    approachHeading: "From a repeated task to a working system.",
    steps: [
      ["Input", "What starts the workflow?"],
      ["Decision", "What should the system understand, route or prepare?"],
      ["Human touchpoint", "Where should a person review, approve or take over?"],
      ["Outcome", "What becomes faster, clearer or easier to track?"],
    ],
    finalHeading: "See a workflow that should move better?", finalAction: "Start an operations conversation",
  },
  {
    id: "spatial", slug: "spatial-visuals", number: "04", name: "Spatial Visuals",
    line: "Make the unbuilt feel understandable.",
    summary: "Architectural visualisation, interior concepts and 3D models that help people see a space before it exists.",
    tags: "ARCHITECTURAL VISUALISATION / INTERIOR VISUALS / 3D MODELLING / WALKTHROUGHS",
    intro: "We turn plans, ideas and material direction into clear visual experiences that help people see a space before it exists.",
    action: "Visualise a space", createHeading: "Visual clarity for spaces in progress.",
    capabilities: [
      ["Architectural visualisation", "Exterior and architectural renders that communicate scale, atmosphere and intent."],
      ["Interior visuals", "Room-by-room experiences shaped around light, material and how people move through a space."],
      ["3D modelling", "Detailed models that make an idea easier to evaluate, present and refine."],
      ["Walkthroughs and concept views", "Visual stories that make a design feel tangible before construction begins."],
    ],
    problemHeading: "Before a space is built, it still needs to be believed in.",
    problem: ["A plan can be accurate and still be difficult to imagine. We help architects, interior teams, developers and homeowners see the feeling, flow and character of a space before expensive decisions are made."],
    approachHeading: "Read the brief. Shape the atmosphere. Refine the detail.",
    steps: [
      ["Read the space", "Understand the plan, orientation, function and people using it."],
      ["Set the direction", "Establish the materials, lighting and visual mood."],
      ["Build the view", "Model the key spaces and perspectives."],
      ["Refine what matters", "Improve the details that make the visual believable."],
    ],
    finalHeading: "Have a space that needs to be seen clearly?", finalAction: "Start a spatial visuals project",
  },
] as const;
export type Practice = typeof practices[number];
export const processSteps = [
  ["Discover", "We listen for the real opportunity: what is unclear, slow, missing or ready to move."],
  ["Define", "We turn the problem into a focused direction, scope and plan."],
  ["Design", "We shape the experience, system and visual language around the people using it."],
  ["Deliver", "We build, test and hand over work that is ready to be used and improved."],
] as const;
export const budgetOptions = ["Need guidance", "Under ₹50,000", "₹50,000–₹1.5 lakh", "₹1.5–₹5 lakh", "₹5 lakh+"] as const;
export const timelineOptions = ["Not sure yet", "As soon as possible", "Within 1–3 months", "Later this year"] as const;
