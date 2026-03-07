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
                Terms &amp; Conditions
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Please read these terms carefully before using our services.
              </p>
            </div>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-8">
              <p className="text-sm">
                <strong>Effective Date:</strong> March 7, 2026<br />
                <strong>Last Updated:</strong> March 7, 2026
              </p>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Agreement to Terms</h2>
                <p>
                  These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;) and Code Heaven Studio (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a web design and development studio operating at{' '}
                  <a href="https://www.codeheavenstudio.com" className="text-primary underline underline-offset-4 hover:opacity-80" target="_blank" rel="noopener noreferrer">
                    https://www.codeheavenstudio.com
                  </a>.
                </p>
                <p>
                  By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our website or services. We reserve the right to update these Terms at any time, and continued use of our services after any changes constitutes your acceptance of the revised Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Services</h2>
                <p>
                  Code Heaven Studio provides web design, web development, and related digital services, including but not limited to: custom website design and development, frontend and backend engineering, SEO optimization, and ongoing maintenance and support.
                </p>
                <p>
                  The specific scope of services for each project will be defined in a written project proposal or statement of work agreed upon by both parties prior to the commencement of any work. Services not included in the agreed scope are subject to additional charges.
                </p>
                <p>
                  We reserve the right to refuse service to anyone for any reason at any time.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Project Proposals and Agreements</h2>
                <p>
                  All projects begin with a written proposal outlining the scope of work, deliverables, timeline, and total cost. A project is considered accepted when the Client provides written confirmation (email or signed agreement) and submits the required deposit as specified in Section 4.
                </p>
                <p>
                  Any changes to the agreed scope of work requested by the Client after project commencement may result in additional charges and timeline adjustments. All scope changes must be agreed upon in writing before work proceeds.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Payment Terms</h2>
                <p>
                  Our services are billed on a one-time, flat-rate basis as outlined in your project proposal. There are no recurring fees unless a separate ongoing maintenance agreement is established.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Deposit:</strong> A non-refundable deposit of 50% of the total project cost is required before work begins. This deposit secures your place in our schedule and covers initial design and planning work.</li>
                  <li><strong>Final Payment:</strong> The remaining 50% balance is due upon project completion and prior to final delivery or website launch.</li>
                  <li><strong>Late Payments:</strong> If final payment is not received within 14 days of the invoice date, we reserve the right to suspend delivery of all project files and take the website offline (if hosted) until payment is received in full.</li>
                </ul>
                <p>
                  All prices are listed in US Dollars (USD). We accept payment via bank transfer (ACH), PayPal, Venmo, and Zelle. Payment instructions will be provided in your invoice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Revisions and Client Feedback</h2>
                <p>
                  Each project includes a defined number of revision rounds as specified in the project proposal. A revision round is defined as a consolidated set of feedback provided in a single communication. Revisions that exceed the agreed number of rounds, or that represent significant changes to the original scope, will be billed at our standard hourly rate, which will be communicated to you in advance.
                </p>
                <p>
                  The Client is responsible for providing timely and complete feedback. Delays in Client feedback may result in timeline adjustments. If a Client is unresponsive for more than 30 consecutive days, the project may be considered abandoned and the deposit will be forfeited.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Intellectual Property & Ownership</h2>
                <p>
                  Upon receipt of final payment in full, the Client will receive full ownership of the final website design, code, and all custom assets created specifically for their project. This transfer of ownership includes all copyrights to those deliverables.
                </p>
                <p>
                  Code Heaven Studio retains the right to display the completed project as part of our portfolio and to reference the Client&apos;s name and website in marketing materials, unless the Client explicitly requests otherwise in writing prior to project completion.
                </p>
                <p>
                  We do not transfer ownership of any third-party tools, plugins, fonts, stock assets, or software frameworks used in the project. The Client is responsible for ensuring they have valid licenses for any such third-party components incorporated into the final product at their request.
                </p>
                <p>
                  The Client represents and warrants that any content, images, logos, or materials they provide to us for use in the project do not infringe on any third-party intellectual property rights. The Client assumes all liability for such content.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Confidentiality</h2>
                <p>
                  We treat all Client information, project details, and business data as confidential. We will not disclose confidential information to third parties without your prior written consent, except as required by law or as necessary to complete your project (e.g., shared with a hosting provider).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Post-Launch Support</h2>
                <p>
                  All completed projects include 30 days of complimentary post-launch support, beginning on the date the website goes live. During this period, we will address and resolve bugs, errors, or issues directly caused by our work at no additional charge.
                </p>
                <p>
                  Post-launch support does not cover new feature requests, content updates, third-party service issues, or problems resulting from Client modifications to the codebase. After the 30-day support window, ongoing support is available through a separate maintenance agreement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">9. Hosting and Domain</h2>
                <p>
                  Code Heaven Studio does not provide hosting or domain registration services directly. We will assist with the setup and deployment of your website to your chosen hosting provider, but all hosting and domain costs are the sole responsibility of the Client. We are not liable for any hosting provider downtime, data loss, or service interruptions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">10. Disclaimer of Warranties</h2>
                <p>
                  Our services and website are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
                </p>
                <p>
                  We make no guarantees regarding specific business results, search engine rankings, or website traffic resulting from our work. SEO outcomes depend on many factors outside our control.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">11. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by applicable law, Code Heaven Studio and its founders shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, loss of data, loss of business, or loss of goodwill, arising out of or in connection with our services or these Terms, even if we have been advised of the possibility of such damages.
                </p>
                <p>
                  Our total cumulative liability to you for any claims arising out of or related to these Terms or our services shall not exceed the total amount you paid to us for the specific project giving rise to the claim.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">12. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless Code Heaven Studio and its founders from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys&apos; fees, arising out of or related to your use of our services, your violation of these Terms, or your violation of any third-party rights, including intellectual property rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">13. Termination</h2>
                <p>
                  Either party may terminate the project agreement with written notice. In the event of termination:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The initial deposit is non-refundable under any circumstances.</li>
                  <li>If the Client terminates after work has begun, payment is due for all work completed up to the termination date, prorated against the total project cost.</li>
                  <li>If Code Heaven Studio terminates the agreement for reasons other than Client breach, we will refund any amounts paid that exceed the value of work completed.</li>
                  <li>Upon termination, we will deliver all completed work product to the Client upon receipt of all outstanding payments.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">14. Governing Law and Dispute Resolution</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or our services that cannot be resolved through good-faith negotiation shall be submitted to binding arbitration in Los Angeles County, California, in accordance with the rules of the American Arbitration Association.
                </p>
                <p>
                  Notwithstanding the foregoing, either party may seek injunctive or equitable relief in a court of competent jurisdiction to prevent irreparable harm.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">15. Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable or invalid under applicable law, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">16. Entire Agreement</h2>
                <p>
                  These Terms, together with any project proposal or statement of work agreed upon between the parties, constitute the entire agreement between you and Code Heaven Studio with respect to the subject matter herein and supersede all prior and contemporaneous understandings, agreements, representations, and warranties.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">17. Contact Us</h2>
                <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                <div className="mt-3 pl-4 border-l-2 border-border space-y-1">
                  <p><strong>Code Heaven Studio</strong></p>
                  <p>Los Angeles, CA &amp; San Diego, CA</p>
                  <p>Email: <a href="mailto:codeheavenstudio@gmail.com" className="text-primary underline underline-offset-4 hover:opacity-80">codeheavenstudio@gmail.com</a></p>
                  <p>Website: <a href="https://www.codeheavenstudio.com/contact" className="text-primary underline underline-offset-4 hover:opacity-80">codeheavenstudio.com/contact</a></p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
