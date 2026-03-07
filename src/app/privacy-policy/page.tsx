import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { LegalContactInfo } from '@/components/legal/contact-info';
import { EFFECTIVE_DATE, LAST_UPDATED_DATE } from '@/lib/legal-metadata';

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
                Your privacy is important to us. Please read this policy carefully.
              </p>
            </div>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-8">
              <p className="text-sm">
                <strong>Effective Date:</strong> {EFFECTIVE_DATE}<br />
                <strong>Last Updated:</strong> {LAST_UPDATED_DATE}
              </p>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
                <p>
                  Welcome to Code Heaven Studio (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the website located at{' '}
                  <a href="https://www.codeheavenstudio.com" className="text-primary underline underline-offset-4 hover:opacity-80" target="_blank" rel="noopener noreferrer">
                    https://www.codeheavenstudio.com
                  </a>{' '}
                  (the &quot;Site&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site or engage our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.
                </p>
                <p>
                  We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will indicate the date of the most recent revision at the top of this page. Your continued use of the Site after any changes constitutes your acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
                <p>We may collect information about you in the following ways:</p>

                <h3 className="text-base font-semibold text-foreground mt-4 mb-2">2.1 Information You Provide Directly</h3>
                <p>When you fill out a contact form, request a free demo, or otherwise communicate with us, we may collect:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Business name and website URL</li>
                  <li>Phone number (if provided)</li>
                  <li>Project details and any other information you voluntarily submit</li>
                </ul>

                <h3 className="text-base font-semibold text-foreground mt-4 mb-2">2.2 Information Collected Automatically</h3>
                <p>When you visit our Site, we may automatically collect certain information about your device and browsing behavior, including:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address and general geographic location</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring URLs and pages visited on our Site</li>
                  <li>Time and date of your visit</li>
                </ul>
                <p>This information is collected through standard web server logs and, where applicable, analytics tools such as Google Analytics.</p>

                <h3 className="text-base font-semibold text-foreground mt-4 mb-2">2.3 Cookies and Tracking Technologies</h3>
                <p>
                  Our Site may use cookies, web beacons, and similar tracking technologies to enhance your experience. Cookies are small data files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of the Site may not function properly if cookies are disabled.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>To respond to your inquiries:</strong> to reply to messages, questions, and requests you send us via the contact form or email.</li>
                  <li><strong>To provide and manage our services:</strong> to deliver web design and development services, process project estimates, and fulfill contractual obligations.</li>
                  <li><strong>To communicate with you:</strong> to send project updates, invoices, and relevant business communications. We do not send unsolicited marketing emails.</li>
                  <li><strong>To improve our Site and services:</strong> to analyze usage data and identify areas for improvement.</li>
                  <li><strong>To maintain internal records:</strong> for business administration and legal compliance.</li>
                  <li><strong>To comply with legal obligations:</strong> where required by applicable law or legal process.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. How We Share Your Information</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following limited circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Providers:</strong> We may share information with trusted third-party vendors who assist in operating our Site or conducting our business (e.g., email delivery services, analytics providers), provided they agree to keep this information confidential.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information where required by law, court order, or governmental authority.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                  <li><strong>With Your Consent:</strong> We may share information for any other purpose with your explicit consent.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Retention</h2>
                <p>
                  We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. When information is no longer needed, we take reasonable steps to destroy or de-identify it.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Security</h2>
                <p>
                  We use commercially reasonable administrative, technical, and physical security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use acceptable means to protect your information, we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Third-Party Links</h2>
                <p>
                  Our Site may contain links to third-party websites. We have no control over the content, privacy policies, or practices of those sites and assume no responsibility for them. We encourage you to review the privacy policy of any third-party site you visit.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Children&apos;s Privacy</h2>
                <p>
                  Our Site and services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately and we will take steps to remove such information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">9. Your Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Right to Access:</strong> You may request a copy of the personal data we hold about you.</li>
                  <li><strong>Right to Correction:</strong> You may request that we correct inaccurate or incomplete information.</li>
                  <li><strong>Right to Deletion:</strong> You may request that we delete your personal information, subject to any legal obligations we have to retain it.</li>
                  <li><strong>Right to Opt-Out:</strong> You may opt out of any non-essential communications at any time.</li>
                </ul>
                <p className="mt-3">To exercise any of these rights, please contact us at the information provided in Section 11 below.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">10. California Privacy Rights</h2>
                <p>
                  If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA). We do not sell personal information as defined under the CCPA. For any CCPA-related requests, please contact us directly.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact Us</h2>
                <p>If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
                <LegalContactInfo />
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
