import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVercel,
  SiFramer,
  SiFigma,
  SiSupabase,
} from "react-icons/si";

const techStack = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Vercel", icon: SiVercel },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Figma", icon: SiFigma },
  { name: "Supabase", icon: SiSupabase },
];

export default function TechStackSection() {
  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />
            Technology Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
            Built with the Best.
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Every project is crafted using modern, production-grade tools, so
            your site is fast, scalable, and future-proof.
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6">
          {techStack.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-secondary text-muted-foreground transition-all duration-200 group-hover:border-primary/40 group-hover:text-primary group-hover:bg-primary/5">
                <Icon className="h-7 w-7" />
              </div>
              <span className="text-xs font-medium text-muted-foreground text-center leading-tight group-hover:text-foreground transition-colors duration-200">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
