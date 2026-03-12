import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Quote,
  Star,
  UtensilsCrossed,
  Beef,
  ShieldCheck,
  Soup,
  TrendingUp,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";

const testimonials: {
  name: string;
  title: string;
  quote: string;
  icon: LucideIcon;
  rating: number;
}[] = [
  {
    name: "Blue Bird Haus Sushi",
    title: "Owner, Blue Bird Haus Sushi",
    quote:
      "Our new website perfectly captures our restaurant's style and makes it effortless for customers to browse the menu on mobile. Updating content is so simple now, we don't need a developer for every small change.",
    icon: UtensilsCrossed,
    rating: 5,
  },
  {
    name: "Dunedin SD",
    title: "Owner, Dunedin SD, North Park, San Diego",
    quote:
      "Code Heaven built us a site that finally brings everything together, our menus, reservations, online ordering, and private events all in one place. It feels like us, and our guests love it.",
    icon: Beef,
    rating: 5,
  },
  {
    name: "Ventures Quality Insurance",
    title: "Director, Ventures Quality Insurance",
    quote:
      "Before this platform, we handled every application manually. Now customers apply online and our team manages everything from a clean admin panel. It's saved us hours every week.",
    icon: ShieldCheck,
    rating: 5,
  },
  {
    name: "Bangkok Soul Alhambra",
    title: "Owner, Bangkok Soul Alhambra",
    quote:
      "They didn't just build a website, they told our story. The culture page, the editable menu, the whole feel of the site reflects who we are. Our customers keep complimenting it.",
    icon: Soup,
    rating: 5,
  },
  {
    name: "Crypto Dashboard Client",
    title: "Fintech User, Crypto Dashboard",
    quote:
      "The dashboard is clean, fast, and shows exactly what I need without any clutter. Switching between assets and reading charts is smooth on both my desktop and phone.",
    icon: TrendingUp,
    rating: 5,
  },
  {
    name: "Booking System Client",
    title: "Restaurant Manager, Booking System",
    quote:
      "We used to take reservations over the phone and things would fall through the cracks. Now guests book online, we get notified instantly, and managing availability is completely stress-free.",
    icon: CalendarCheck,
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    <span className="sr-only">{rating} out of 5 stars</span>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
        }`}
      />
    ))}
  </div>
);

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 sm:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
              Testimonials
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              What our
              <br />
              clients say.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            Real stories from businesses we&apos;ve helped grow and succeed
            online.
          </p>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-6">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-6 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full flex flex-col justify-between rounded-2xl border border-border shadow-none bg-muted/40 hover:bg-muted/60 transition-colors">
                  <CardContent className="p-8 flex flex-col gap-6 h-full">
                    <Quote className="h-8 w-8 text-primary/30" />
                    <blockquote className="text-foreground/80 leading-relaxed flex-1">
                      {testimonial.quote}
                    </blockquote>
                    <div>
                      <StarRating rating={testimonial.rating} />
                      <div className="flex items-center gap-3 mt-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <testimonial.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex gap-3 mt-8">
            <CarouselPrevious className="relative translate-x-0 translate-y-0 top-0 left-0" />
            <CarouselNext className="relative translate-x-0 translate-y-0 top-0 left-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
