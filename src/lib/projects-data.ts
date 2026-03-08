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
};

export const projects: Project[] = [
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
