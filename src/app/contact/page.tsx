import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ContactSection from '@/components/sections/contact';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <ContactSection />

        {/* Stats strip */}
        <section className="border-t border-border bg-foreground text-background">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "Free", label: "Consultation call" },
              { value: "24h", label: "Response time" },
              { value: "4–6 wk", label: "Avg. launch time" },
              { value: "100%", label: "Client satisfaction" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-black mb-1">{value}</p>
                <p className="text-sm text-background/60 uppercase tracking-widest">
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
