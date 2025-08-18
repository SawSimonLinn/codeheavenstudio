import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Privacy Policy
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Your privacy is important to us.
              </p>
            </div>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              
              <h2>1. Introduction</h2>
              <p>
                Welcome to Code Heaven Studio. We are committed to protecting your privacy and handling your data in an open and transparent manner. This privacy policy sets out how we collect, use, and protect any information that you give us when you use this website.
              </p>

              <h2>2. Information We Collect</h2>
              <p>
                We may collect the following information:
              </p>
              <ul>
                <li>Contact information including name and email address when you fill out our contact or demo request forms.</li>
                <li>Information you provide for project estimates or other AI-powered tools, such as website needs or URLs for analysis.</li>
                <li>Usage data and analytics on how you interact with our website.</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>
                We use this information to understand your needs and provide you with a better service, and in particular for the following reasons:
              </p>
              <ul>
                <li>To respond to your inquiries and requests.</li>
                <li>To provide our services, such as project estimates and SEO analysis.</li>
                <li>To improve our products and services.</li>
                <li>Internal record keeping.</li>
              </ul>

              <h2>4. Security</h2>
              <p>
                We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
              </p>

              <h2>5. Your Rights</h2>
              <p>
                You have the right to request access to the personal data we hold about you. If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible. We will promptly correct any information found to be incorrect.
              </p>

              <h2>6. Changes to This Policy</h2>
              <p>
                We may update this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
