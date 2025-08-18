import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'What is your pricing model?',
    answer: 'We offer one-time pricing for all our website design and development packages. There are no hidden fees or recurring charges. You pay once, and the website is yours forever.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'The timeline depends on the package you choose. Our Starter Package typically takes 1–2 weeks, the Growth Package takes 3–4 weeks, and the Premium Package takes 6–8 weeks. Additional features may affect the timeline.',
  },
  {
    question: 'Do I own the website once it\'s finished?',
    answer: 'Yes, absolutely. Once the project is complete and the final payment is made, you have 100% ownership of the website code, design, and all assets.',
  },
  {
    question: 'Do you offer a free demo?',
    answer: 'Yes, we do! We believe in showing our value first. We will create a free demo layout for your business before you make any payment or commitment.',
  },
  {
    question: 'What kind of support do you offer after launch?',
    answer: 'We provide 30 days of free support after your website is launched to fix any bugs or issues that may arise. We also offer ongoing maintenance packages for long-term support.',
  }
]

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Find answers to common questions about our services, process, and pricing.
            </p>
          </div>

          <div className="mt-12 mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
