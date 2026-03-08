import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export const metadata = {
  title: "Accessibility Statement | Code Heaven Studio",
  description:
    "Our commitment to making Code Heaven Studio accessible to everyone.",
};

export default function AccessibilityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Accessibility Statement
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Code Heaven Studio is committed to ensuring digital
                accessibility for people of all abilities.
              </p>
            </div>

            <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  Our Commitment
                </h2>
                <p>
                  We strive to ensure that our website is accessible to
                  everyone, including people with disabilities. We aim to
                  conform to the Web Content Accessibility Guidelines (WCAG)
                  2.1 Level AA standards.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  Measures We Take
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Semantic HTML structure for screen reader compatibility</li>
                  <li>Sufficient color contrast ratios throughout the site</li>
                  <li>Keyboard navigable interface</li>
                  <li>Descriptive alt text for all meaningful images</li>
                  <li>Responsive design that works across devices and zoom levels</li>
                  <li>Clear focus indicators for interactive elements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  Known Limitations
                </h2>
                <p>
                  While we strive for full accessibility, some content may not
                  yet meet all guidelines. We are continuously working to
                  improve the accessibility of our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  Feedback & Contact
                </h2>
                <p>
                  If you experience any accessibility barriers on our website,
                  please contact us at{" "}
                  <a
                    href="mailto:codeheavenstudio@gmail.com"
                    className="text-primary hover:underline"
                  >
                    codeheavenstudio@gmail.com
                  </a>
                  . We welcome your feedback and will make every effort to
                  address issues promptly.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  Last Updated
                </h2>
                <p>This statement was last reviewed in March 2026.</p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
