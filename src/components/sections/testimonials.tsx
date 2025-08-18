import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah L.',
    title: 'CEO of Tech-Innovators',
    quote: 'Code Heaven Studio transformed our online presence. Their AI-driven approach gave us an edge over competitors, and the results were phenomenal. The team was professional, responsive, and a pleasure to work with.',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'professional woman',
    rating: 5,
  },
  {
    name: 'Michael B.',
    title: 'Founder of Fresh Eats',
    quote: 'The free demo was a game-changer. It showed me exactly what I was getting, and the final product exceeded my expectations. Our new e-commerce site is fast, beautiful, and user-friendly.',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'man smiling',
    rating: 5,
  },
  {
    name: 'Emily C.',
    title: 'Marketing Director at Growth Co.',
    quote: 'Working with Code Heaven was seamless from start to finish. Their process is incredibly streamlined, and the AI features they integrated have already boosted our lead generation. Highly recommend!',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'marketing director',
    rating: 5,
  },
   {
    name: 'David R.',
    title: 'Real Estate Agent',
    quote: 'I needed a modern, professional website quickly, and they delivered. The one-time pricing model is transparent and fair. I\'m thrilled with the final result and the support I received.',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'real estate agent',
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
    ))}
  </div>
);

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="container mx-auto py-16 sm:py-24 px-4">
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
            align: 'start',
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
                      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    </CardContent>
                    <div className="flex items-center gap-4 p-6 pt-0">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
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
