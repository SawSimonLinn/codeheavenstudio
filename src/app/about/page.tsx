import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Users,
  Lightbulb,
  Zap,
  Rocket,
  Code,
  PenTool,
  Bot,
  Megaphone,
  Palette,
  Cog,
} from "lucide-react";

const teamMembers = [
  {
    name: "Simon Linn",
    role: "Lead Developer",
    avatar: "/avatar.png",
    aiHint: "male developer",
    icon: <Code className="h-10 w-10 text-primary" />,
  },
  {
    name: "Alfred Lynn",
    role: "Lead Designer",
    avatar: "/avatar.png",
    aiHint: "female designer",
    icon: <Palette className="h-10 w-10 text-primary" />,
  },
  {
    name: "Chen Wang",
    role: "AI Engineer",
    avatar: "/avatar.png",
    aiHint: "male engineer",
    icon: <Bot className="h-10 w-10 text-primary" />,
  },
  {
    name: "Merina Sui",
    role: "Project Manager",
    avatar: "/avatar.png",
    aiHint: "female project manager",
    icon: <Megaphone className="h-10 w-10 text-primary" />,
  },
  {
    name: "Blessed Johnson",
    role: "Frontend Developer",
    avatar: "/avatar.png",
    aiHint: "developer portrait",
    icon: <Cog className="h-10 w-10 text-primary" />,
  },
  {
    name: "Priya Patel",
    role: "UX Researcher",
    avatar: "/avatar.png",
    aiHint: "female researcher",
    icon: <PenTool className="h-10 w-10 text-primary" />,
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
              src="https://placehold.co/1920x1080.png"
              alt="Team working collaboratively"
              data-ai-hint="team collaboration office"
              fill
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-secondary/80"></div>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline">
                We're a Team of Passionate Creators
              </h1>
              <p className="mt-6 text-lg leading-8 text-secondary-foreground/80">
                We are a close-knit team of 5-10 developers and designers who
                thrive on learning new technologies. Our passion is channeling
                that knowledge into building innovative solutions that make your
                business better.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                The principles that drive our work every day.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Meet the Team
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                The developers, designers, and strategists behind Code Heaven
                Studio.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 [perspective:1000px]">
              {teamMembers.map((member) => (
                <div key={member.name} className="group h-48 w-full">
                  <div className="relative h-full w-full rounded-lg shadow-md transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front side */}
                    <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-lg bg-card p-4 [backface-visibility:hidden]">
                      <div className="mb-2">{member.icon}</div>
                      <h3 className="font-semibold text-center text-foreground">
                        {member.role}
                      </h3>
                    </div>
                    {/* Back side */}
                    <div className="absolute h-full w-full rounded-lg bg-card [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <div className="flex flex-col items-center justify-center text-center p-4 h-full">
                        <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-background shadow-md">
                          <AvatarImage
                            src={member.avatar}
                            alt={member.name}
                            data-ai-hint={member.aiHint}
                          />
                          <AvatarFallback>
                            {member.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-foreground">
                          {member.name}
                        </h3>
                        <p className="text-sm text-primary">{member.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
