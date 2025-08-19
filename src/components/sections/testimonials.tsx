import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jar Ja",
    title: "Owner, Blue Bird Haus Sushi",
    quote:
      "Code Heaven Studio delivered exactly what we needed. The admin panel for updating our menu and photo gallery is incredibly easy to use, which saves us so much time. Our customers love the new site!",
    avatar: "/review01.png",
    aiHint: "asian restaurant owner",
    rating: 5,
  },
  {
    name: "Venus Mawi",
    title: "Founder, J&C Collections",
    quote:
      "They beautifully captured the essence of our vintage traditional clothing brand. The admin blog page is a fantastic tool for us to share stories behind our collections. The team was a dream to work with.",
    avatar: "/review02.png",
    aiHint: "fashion founder",
    rating: 5,
  },
  {
    name: "Mr. Kim",
    title: "Artistic Director, Jindallae Choir & Orchestra",
    quote:
      "Our new website has made it so much easier for our community to buy tickets and stay updated. The blog and member sections have brought our orchestra closer to our audience. Exceptional work!",
    avatar: "/review03.png",
    aiHint: "korean music director",
    rating: 5,
  },
  {
    name: "Mrs. Park",
    title: "Administrator, Hope Private High School",
    quote:
      "The admin dashboard Code Heaven built for us is powerful and intuitive. It has streamlined our school's operations significantly. Their professionalism and technical skill are top-notch.",
    avatar: "/review04.png",
    aiHint: "korean school administrator",
    rating: 5,
  },
  {
    name: "John Smith",
    title: "Owner, The Daily Grind Coffee",
    quote:
      "I needed a simple, clean, and fast website for my coffee shop, and they delivered perfectly. The process was straightforward, and the final result looks fantastic. I'm getting more foot traffic already!",
    avatar: "/review05.png",
    aiHint: "male coffee shop owner",
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-muted-foreground"
        }`}
      />
    ))}
  </div>
);

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="container mx-auto py-16 sm:py-24 px-4"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Real stories from businesses we've helped to grow and succeed.
        </p>
      </div>

      <div className="mt-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="flex flex-col justify-between h-full shadow-lg">
                    <CardHeader>
                      <StarRating rating={testimonial.rating} />
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground italic">
                        "{testimonial.quote}"
                      </p>
                    </CardContent>
                    <div className="flex items-center gap-4 p-6 pt-0">
                      <Avatar>
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
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
