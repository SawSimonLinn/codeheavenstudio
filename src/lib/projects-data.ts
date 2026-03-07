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
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
