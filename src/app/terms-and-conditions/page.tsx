import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Terms & Conditions
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Please read these terms and conditions carefully.
              </p>
            </div>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing and using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.
              </p>

              <h2>2. Services</h2>
              <p>
                Code Heaven Studio provides web design, development, and AI-powered services as described on our website. All services are subject to the terms outlined in individual project agreements.
              </p>

              <h2>3. Payments</h2>
              <p>
                Our services are billed on a one-time basis as outlined in your project proposal. Payment terms will be specified in your contract. We do not currently handle payments directly through the website.
              </p>
              
              <h2>4. Intellectual Property</h2>
              <p>
                Upon final payment, you will own the intellectual property rights to the final website design and code. We retain the right to showcase the work in our portfolio.
              </p>
              
              <h2>5. Limitation of Liability</h2>
              <p>
                Code Heaven Studio will not be liable for any indirect, incidental, or consequential damages arising out of the use of our services or website.
              </p>

              <h2>6. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of our jurisdiction, and you submit to the exclusive jurisdiction of the courts in that location for the resolution of any disputes.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
