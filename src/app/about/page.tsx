import type { Metadata } from "next";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Code Heaven Studio. We build custom, fast, and SEO-optimized websites with a free demo and free consulting before you commit.",
  alternates: { canonical: "https://www.codeheavenstudio.com/about" },
  openGraph: {
    title: "About Us | Code Heaven Studio",
    description:
      "Meet the team behind Code Heaven Studio. We build custom, fast, and SEO-optimized websites with a free demo and free consulting before you commit.",
    url: "https://www.codeheavenstudio.com/about",
  },
};
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Lightbulb,
  Zap,
  Rocket,
  Code2,
  Layers,
  Paintbrush,
  SearchCheck,
  Database,
  Smartphone,
  Linkedin,
  Github,
  Globe,
} from "lucide-react";

const founders = [
  {
    name: "Saw Simon Linn",
    role: "Co-Founder & Software Engineer",
    location: "Los Angeles, CA",
    avatar: "/avatars/simon.jpg",
    aiHint: "male developer",
    bio: "Saw Simon Linn co-founded Code Heaven Studio to help restaurants and small businesses build modern, SEO-optimized websites that drive real customers. Before writing code, Simon spent years as a sushi chef and worked in the startup world, a mix of precision craft and fast-paced hustle that carried right into building software.",
    linkedin: "https://www.linkedin.com/in/sawsimonlinn/",
    github: "https://github.com/SawSimonLinn",
    portfolio: "https://simonlinn.dev/",
    founderPage: "/founder/saw-simon-linn",
  },
  {
    name: "Mia Truong",
    role: "Co-Founder & Software Engineer",
    location: "San Diego, CA",
    avatar: "/avatars/mia.jpg",
    aiHint: "female developer",
    bio: "Mia co-founded Code Heaven Studio and works as a software engineer alongside leading business development, partnerships, and client success. She spent years in beauty and hospitality before pivoting to tech, a background that gave her a sharp eye for detail and a natural instinct for what makes an experience feel right.",
    linkedin: "https://www.linkedin.com/in/trangmtruong/",
    github: "https://github.com/trangmtruong",
    portfolio: "https://www.miatruong.com/",
    founderPage: "/founder/mia-truong",
  },
];

const skills = [
  {
    title: "Full Stack Engineering",
    description:
      "We build end-to-end, from database to UI. Every layer of your product is handled in-house.",
    icon: <Layers className="h-8 w-8 text-primary" />,
  },
  {
    title: "Next.js & React",
    description:
      "Our primary stack. Next.js gives your product server-side rendering and 100% SEO out of the box.",
    icon: <Code2 className="h-8 w-8 text-primary" />,
  },
  {
    title: "Design Eye",
    description:
      "With 8+ years of design background between us, we build things that look as good as they perform.",
    icon: <Paintbrush className="h-8 w-8 text-primary" />,
  },
  {
    title: "SEO Optimized",
    description:
      "Every site we ship is structured for search engines from day one, not bolted on as an afterthought.",
    icon: <SearchCheck className="h-8 w-8 text-primary" />,
  },
  {
    title: "Backend & Databases",
    description:
      "APIs, authentication, and data storage built to scale, using Node.js, PostgreSQL, and more.",
    icon: <Database className="h-8 w-8 text-primary" />,
  },
  {
    title: "Responsive & Mobile-First",
    description:
      "Every product we deliver works beautifully across all screen sizes, from mobile to desktop.",
    icon: <Smartphone className="h-8 w-8 text-primary" />,
  },
];

const values = [
  {
    title: "Innovation",
    description:
      "We constantly explore new technologies and creative solutions to deliver cutting-edge products.",
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
  },
  {
    title: "Agility",
    description:
      "We work fast and adapt quickly, ensuring your project stays on track and ahead of the curve.",
    icon: <Zap className="h-8 w-8 text-primary" />,
  },
  {
    title: "Partnership",
    description:
      "Your success is our success. We work as an extension of your team to achieve your business goals.",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    title: "Impact",
    description:
      "We are passionate about creating work that not only looks great but also delivers measurable results.",
    icon: <Rocket className="h-8 w-8 text-primary" />,
  },
];

export default function AboutUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-secondary py-20 sm:py-32 text-secondary-foreground">
          <div className="absolute inset-0">
            <Image
              src="/about/team-collaboration.jpg"
              alt="Code Heaven Studio team collaborating on a project"
              data-ai-hint="team collaboration office"
              fill
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-secondary/80"></div>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline">
                Two Developers, One Vision
              </h1>
              <p className="mt-6 text-lg leading-8 text-secondary-foreground/80">
                We are Simon and Mia, two co-founders and developers who
                built Code Heaven Studio from the ground up. We thrive on
                learning new technologies and channeling that knowledge into
                innovative solutions that make your business better.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Meet the Founders
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                The two co-founders and developers behind Code Heaven Studio.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {founders.map((founder) => (
                <Card key={founder.name} className="shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md">
                      <AvatarImage
                        src={founder.avatar}
                        alt={founder.name}
                        data-ai-hint={founder.aiHint}
                      />
                      <AvatarFallback>{founder.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <Link href={founder.founderPage} className="hover:text-primary transition-colors">
                      <h3 className="text-xl font-semibold text-foreground">{founder.name}</h3>
                    </Link>
                    <p className="text-sm text-primary font-medium mt-1">{founder.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{founder.location}</p>
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{founder.bio}</p>
                    <div className="flex gap-4 mt-5">
                      <Link href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </Link>
                      <Link href={founder.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="h-5 w-5" />
                      </Link>
                      <Link href={founder.portfolio} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Globe className="h-5 w-5" />
                      </Link>
                    </div>
                    <Link href={founder.founderPage} className="mt-4 text-xs text-primary hover:underline">
                      View full profile →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-background py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                What We Work With
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                We are full stack engineers who turn ideas into shipped products, with the design instincts to make them shine.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <Card key={skill.title} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-background py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                The principles that drive our work every day.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 max-w-4xl mx-auto">
              {values.map((value, i) => (
                <div key={value.title} className="flex gap-6 p-8 border-t border-border last:border-b sm:[&:nth-child(odd)]:border-r">
                  <span className="text-5xl font-bold text-primary/20 leading-none flex-shrink-0 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Stats strip */}
        <section className="border-t border-border bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "2", label: "Co-founders" },
              { value: "20+", label: "Projects delivered" },
              { value: "3 yrs", label: "In business" },
              { value: "5★", label: "Average client rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-black mb-1">{value}</p>
                <p className="text-sm text-primary-foreground/70 uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
