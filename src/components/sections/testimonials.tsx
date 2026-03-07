import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Susan Lee",
    title: "CEO, CodeJourney",
    quote:
      "Working with Code Heaven Studio was a game-changer for our platform. Their attention to detail and user-centric design approach helped us create an intuitive and engaging experience.",
    avatar: "/review/review01.png",
    aiHint: "female tech CEO",
    rating: 5,
  },
  {
    name: "Diana Kim",
    title: "Owner, Digishop",
    quote:
      "The team at Code Heaven Studio transformed our online store. The admin dashboard is intuitive and powerful, allowing us to manage products effortlessly. Highly recommend!",
    avatar: "/review/review02.png",
    aiHint: "female online store owner",
    rating: 5,
  },
  {
    name: "Mr. Kim",
    title: "Artistic Director, Jindallae Choir & Orchestra",
    quote:
      "Our new website made it so much easier for our community to buy tickets and stay updated. The blog and member sections brought our orchestra closer to our audience.",
    avatar: "/review/review03.png",
    aiHint: "korean music director",
    rating: 5,
  },
  {
    name: "Mrs. Park",
    title: "Administrator, Hope Private High School",
    quote:
      "The admin dashboard Code Heaven built is powerful and intuitive. It has streamlined our school's operations significantly. Their professionalism and technical skill are top-notch.",
    avatar: "/review/review04.png",
    aiHint: "korean school administrator",
    rating: 5,
  },
  {
    name: "John Smith",
    title: "Owner, The Daily Grind Coffee",
    quote:
      "I needed a simple, clean, and fast website for my coffee shop, and they delivered perfectly. The process was straightforward and the final result looks fantastic!",
    avatar: "/review/review05.png",
    aiHint: "male coffee shop owner",
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
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            data-ai-hint={testimonial.aiHint}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
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
