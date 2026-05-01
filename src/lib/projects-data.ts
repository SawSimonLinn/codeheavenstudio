export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  challenge: string;
  solution: string;
  imageUrl: string;
  imageHint: string;
  category: string;
  timeline: string;
  services: string[];
  techStack: string[];
  outcomes: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "linna-mvp",
    title: "Linna",
    shortDescription:
      "A project-aware AI assistant for indie developers that keeps context across sessions and helps them launch faster.",
    overview:
      "Linna is an AI project assistant for solo builders. Users set project context once by adding their README, tech stack, goals, blockers, and target user, then every conversation stays grounded in that context.",
    challenge:
      "Indie developers lose momentum when tools forget project context and give generic advice that does not match what they are actually building.",
    solution:
      "We built an open-source MVP with context-aware chat, persistent session memory, project dashboards, and a launch assistant for go-to-market copy.",
    imageUrl: "/previousWorks/linna.png",
    imageHint: "ai project dashboard",
    category: "AI SaaS MVP",
    timeline: "4 weeks",
    services: [
      "Product Strategy",
      "UI/UX Design",
      "Full-Stack Development",
      "AI Integration",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Anthropic Claude API",
      "Supabase",
      "Clerk",
      "Stripe",
    ],
    outcomes: [
      "Project-aware responses tailored to each product context",
      "Persistent memory across sessions without restart overhead",
      "Launch copy generation for Product Hunt, Reddit, and X",
      "Open-source distribution with hosted freemium monetization",
    ],
    liveUrl: "https://linna-one.vercel.app/",
    repoUrl: "https://github.com/SawSimonLinn/linna",
  },
  {
    slug: "mono-commerce",
    title: "MonoCommerce",
    shortDescription:
      "A minimalist full-stack e-commerce platform for architectural objects and essential goods with a strict monochrome design language.",
    overview:
      "MonoCommerce is a full-stack storefront built with Next.js 15 and Supabase, covering product discovery, cart, checkout, user accounts, wishlists, and an admin dashboard in a precision-driven monochrome aesthetic.",
    challenge:
      "The project needed a complete modern commerce experience while preserving a strict minimalist visual system and maintaining fast, scalable full-stack architecture.",
    solution:
      "We built an end-to-end commerce platform with editorial storefront pages, persistent cart and checkout flows, Supabase-backed auth and data, role-based admin tooling, and AI-ready integrations for intelligent product features.",
    imageUrl: "/previousWorks/mono.png",
    imageHint: "minimal ecommerce storefront",
    category: "E-commerce Platform",
    timeline: "MVP build",
    services: [
      "Product Strategy",
      "UI/UX Design",
      "Full-Stack Development",
      "Authentication",
      "Admin Dashboard",
    ],
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Supabase",
      "PostgreSQL",
      "Zustand",
      "Genkit",
      "Google Gemini",
    ],
    outcomes: [
      "Launched a complete commerce flow from catalog browsing to checkout",
      "Implemented social auth, profile management, and order history",
      "Enabled admin operations for products, orders, analytics, and reviews",
      "Maintained a distinctive monochrome brand system across the product",
    ],
    liveUrl: "https://www.monochromerce.com/",
    repoUrl: "https://github.com/SawSimonLinn/MonoCommerce",
  },
  {
    slug: "the-archive-ai",
    title: "The Archive AI",
    shortDescription:
      "A RAG-powered web system that retrieves relevant knowledge before generation to improve answer accuracy and reduce hallucinations.",
    overview:
      "The Archive AI is a retrieval-augmented generation platform built to connect user questions with structured data sources before LLM response generation.",
    challenge:
      "Base LLM responses were often too generic or inaccurate when operating without external context and grounded retrieval.",
    solution:
      "We implemented a RAG pipeline with embeddings and vector search so answers are generated from relevant retrieved data instead of ungrounded model output.",
    imageUrl: "/previousWorks/the-archive.png",
    imageHint: "rag retrieval dashboard",
    category: "RAG System",
    timeline: "MVP build",
    services: [
      "AI Architecture",
      "RAG Pipeline Development",
      "Data Retrieval Design",
      "Accuracy Optimization",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Embeddings",
      "Vector Search",
      "RAG",
    ],
    outcomes: [
      "Retrieved relevant context before answer generation",
      "Improved response accuracy by grounding outputs in real data",
      "Reduced generic and hallucinated responses",
      "Created a reusable retrieval foundation for future AI features",
    ],
    liveUrl: "https://the-archive-ai-eosin.vercel.app/",
    repoUrl: "https://github.com/SawSimonLinn/the-archive-ai",
  },
  {
    slug: "ai-content-engine",
    title: "AI Content Engine",
    shortDescription:
      "A multi-step AI agent workflow that automates content generation across scripts, captions, hashtags, and structured plans.",
    overview:
      "AI Content Engine is an automation-focused web system that orchestrates chained prompts and agent-like steps to speed up repetitive content production.",
    challenge:
      "Manual content production across platforms was repetitive, time-consuming, and difficult to scale consistently.",
    solution:
      "We built a workflow orchestration system with prompt chaining that generates content assets end-to-end, inspired by AutoGPT-style multi-step automation thinking.",
    imageUrl: "/previousWorks/ai-content-engine.png",
    imageHint: "ai workflow automation",
    category: "AI Agent Workflow",
    timeline: "MVP build",
    services: [
      "Workflow Architecture",
      "Prompt Engineering",
      "Automation System Design",
      "Full-Stack Development",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "AI Agents",
      "Prompt Chaining",
      "Workflow Automation",
    ],
    outcomes: [
      "Automated repetitive multi-platform content creation tasks",
      "Generated scripts, captions, hashtags, and content plans in sequence",
      "Demonstrated system-level orchestration and agent workflow design",
      "Reduced manual effort and turnaround time for content operations",
    ],
    liveUrl: "https://ai-content-engine-beryl.vercel.app/",
    repoUrl: "https://github.com/SawSimonLinn/ai-content-engine",
  },
  {
    slug: "sui-at-home",
    title: "Sui At Home",
    shortDescription:
      "A warm, food-first recipe platform that helps a home cook creator turn Instagram viewers into a loyal community.",
    overview:
      "Sui At Home is a personal recipe-sharing platform where Sui publishes traditional homemade recipes while visitors browse, save, favorite, and comment. It also includes a dedicated community feed where users share their own cooking photos and captions.",
    challenge:
      "Social platforms alone were not enough to build a lasting audience relationship. The project needed an owned content hub with structured recipes, community engagement, and admin control over publishing and moderation.",
    solution:
      "We designed and built an MVP with recipe discovery, authentication, save/favorite/comment flows, a community feed, and an admin dashboard for content management and analytics.",
    imageUrl: "/previousWorks/sui-at-home.png",
    imageHint: "recipe community platform",
    category: "Recipe Community Platform",
    timeline: "MVP v1 (2025)",
    services: [
      "Product Strategy",
      "UI/UX Design",
      "Full-Stack Development",
      "Supabase Integration",
      "Admin Dashboard",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Vercel",
    ],
    outcomes: [
      "Converted social traffic into an owned recipe and community platform",
      "Enabled save, favorite, and comment experiences for registered users",
      "Launched a community feed for user-generated cooking posts",
      "Gave admin full control over recipes, moderation, and performance analytics",
    ],
    liveUrl: "https://www.suiathome.com/",
    repoUrl: "https://github.com/SawSimonLinn/suiathome",
  },
  {
    slug: "blue-bird-haus-sushi",
    title: "Blue Bird Haus Sushi",
    shortDescription:
      "A modern sushi restaurant website with an online menu, gallery, and simple content management workflow.",
    overview:
      "Blue Bird Haus Sushi needed a polished site that matched the restaurant brand and made menu browsing effortless on mobile devices.",
    challenge:
      "The previous site made it difficult to keep menu items and photos updated, and users struggled to find key details quickly.",
    solution:
      "We delivered a responsive website with clear menu organization, high-quality visual presentation, and an admin-friendly structure for updates.",
    imageUrl: "/previousWorks/previous-work_02.png",
    imageHint: "restaurant website",
    category: "Restaurant Website",
    timeline: "4 weeks",
    services: ["UI/UX Design", "Frontend Development", "Content Structure"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    outcomes: [
      "Cleaner mobile navigation for menu browsing",
      "Faster content updates for restaurant staff",
      "Stronger visual brand presence online",
    ],
    liveUrl: "https://bluebirdhaussushi.com",
  },
  {
    slug: "dunedin-sd",
    title: "Dunedin SD",
    shortDescription:
      "A New Zealand-rooted burger bar in North Park, San Diego, featuring full menus for diner, brunch, happy hour, and dessert, plus online ordering, reservations, and private events.",
    overview:
      "Dunedin SD is a casual, dog-friendly New Zealand-inspired restaurant in North Park with a full bar, rotating craft beers, and a menu spanning breakfast through dinner. They needed a site that matched their laid-back atmosphere while handling all the logistics: reservations, online orders, private events, and a Burger of the Month Club.",
    challenge:
      "The restaurant offers a wide range of dining experiences and services but had no unified online presence to showcase their menus, handle bookings, and drive online orders from a single destination.",
    solution:
      "We built a warm, visually rich restaurant website with dedicated sections for diner, brunch, happy hour, and dessert menus, integrated online ordering, a reservation system, private event inquiries, gift cards, and a photo gallery that captures the patio, bar, and signature dishes.",
    imageUrl: "/previousWorks/previous-work_06.png",
    imageHint: "burger restaurant website",
    category: "Restaurant Website",
    timeline: "5 weeks",
    services: [
      "UI/UX Design",
      "Frontend Development",
      "Online Ordering Integration",
      "Reservation System",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    outcomes: [
      "Unified online presence covering all menus and services",
      "Streamlined reservation and private event booking flow",
      "Online ordering and gift card system driving direct revenue",
    ],
    liveUrl: "https://www.dunedinsd.com/",
  },
  {
    slug: "ventures-quality-insurance",
    title: "Ventures Quality Insurance",
    shortDescription:
      "A full-service insurance platform with online application forms for multiple insurance types and an admin panel for managing user information.",
    overview:
      "Ventures Quality Insurance needed a professional web presence that lets customers apply for insurance policies online and gives staff a centralized admin panel to review and manage applicant data.",
    challenge:
      "Customers had no way to apply for insurance online, and internal staff were managing applicant information manually with no unified system.",
    solution:
      "We built a multi-policy insurance platform with streamlined online application forms for each insurance type, plus a secure admin panel for viewing, filtering, and managing all user submissions.",
    imageUrl: "/previousWorks/previous-work_04.png",
    imageHint: "insurance website",
    category: "Insurance Platform",
    timeline: "6 weeks",
    services: [
      "UI/UX Design",
      "Full-Stack Development",
      "Admin Panel",
      "Form System",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    outcomes: [
      "Online application flow for all insurance types",
      "Secure admin panel for managing applicant records",
      "Reduced manual workload for insurance staff",
    ],
    liveUrl: "https://www.venturesqualityinsurance.com/",
  },
  {
    slug: "bangkok-soul-alhambra",
    title: "Bangkok Soul Alhambra",
    shortDescription:
      "A Thai restaurant website bringing authentic Thai culture to the USA, featuring an editable menu via CMS and a dedicated culture page.",
    overview:
      "Bangkok Soul Alhambra wanted a website that goes beyond a typical restaurant site, one that reflects Thai heritage, tells the story behind the food, and gives staff full control over menu content without needing a developer.",
    challenge:
      "The restaurant needed a site that balanced cultural storytelling with practical functionality, while keeping menu updates simple for non-technical staff.",
    solution:
      "We built a visually rich restaurant website with a dedicated culture page celebrating Thai traditions, a CMS-powered editable menu system, and a seamless browsing experience across all devices.",
    imageUrl: "/previousWorks/previous-work_05.png",
    imageHint: "thai restaurant website",
    category: "Restaurant Website",
    timeline: "5 weeks",
    services: [
      "UI/UX Design",
      "Frontend Development",
      "CMS Integration",
      "Content Strategy",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
    outcomes: [
      "Staff can update menus independently without developer help",
      "Culture page deepens brand identity and guest connection",
      "Strong visual presence reflecting authentic Thai heritage",
    ],
    liveUrl: "https://bangkoksoulalhambra.vercel.app/",
  },
  {
    slug: "crypto-dashboard",
    title: "Crypto Dashboard",
    shortDescription:
      "A data-focused dashboard for tracking cryptocurrency prices and market movement in real time.",
    overview:
      "The goal was to create a fast, readable interface for users who monitor multiple crypto assets throughout the day.",
    challenge:
      "Users needed quick access to high-signal data without visual clutter or slow page interactions.",
    solution:
      "We designed a clean dashboard layout with clear hierarchy, optimized loading states, and responsive charts for desktop and mobile.",
    imageUrl: "/previousWorks/previous-work_01.png",
    imageHint: "dashboard website",
    category: "Fintech Dashboard",
    timeline: "5 weeks",
    services: ["Product UI", "Dashboard Development", "Performance Tuning"],
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    outcomes: [
      "Faster scanability of key market metrics",
      "Smooth experience across device sizes",
      "Improved retention through clearer data presentation",
    ],
  },
  {
    slug: "restaurant-booking-system",
    title: "Booking System",
    shortDescription:
      "A reservation platform for restaurant operations, including table booking and booking management.",
    overview:
      "This project focused on reducing friction for both customers making reservations and internal staff managing availability.",
    challenge:
      "The team was handling bookings manually, which caused mistakes and inconsistent communication with customers.",
    solution:
      "We built an integrated booking flow with clear time-slot selection, booking confirmations, and an operational view for reservation management.",
    imageUrl: "/previousWorks/previous-work_03.png",
    imageHint: "booking app",
    category: "Booking Platform",
    timeline: "6 weeks",
    services: ["UX Flow Design", "Web App Development", "Operational Tools"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    outcomes: [
      "Reduced manual booking errors",
      "Streamlined reservation handling for staff",
      "Better booking experience for customers",
    ],
  },
  {
    slug: "about-time-cafe",
    title: "About Time Cafe",
    shortDescription:
      "A co-working station cafe in Koreatown, LA, blending specialty coffee culture with a productive work-friendly environment.",
    overview:
      "About Time Cafe is a co-working station cafe in Ktown, Los Angeles. They needed a landing page that communicates the dual identity of the space: a quality coffee shop and a focused work environment for creatives and remote workers.",
    challenge:
      "The cafe had no digital presence to attract remote workers and freelancers in the area, and needed a way to communicate their co-working amenities, vibe, and location clearly.",
    solution:
      "We built a visually driven small business landing page that leads with atmosphere, showcasing the space, menu highlights, and co-working perks with a warm, modern design that drives foot traffic and bookings.",
    imageUrl: "/previousWorks/previous-work_07.png",
    imageHint: "cafe co-working space",
    category: "Small Business Landing Page",
    timeline: "3 weeks",
    services: [
      "UI/UX Design",
      "Frontend Development",
      "Brand Identity",
      "Content Strategy",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    outcomes: [
      "Clear digital presence for local discovery and foot traffic",
      "Co-working perks and amenities communicated at a glance",
      "Warm visual brand that matches the cafe's atmosphere",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
