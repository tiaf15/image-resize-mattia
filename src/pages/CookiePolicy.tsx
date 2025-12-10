import { Header, Footer } from "@/components/landing";
import { Cookie } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Cookie className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: December 10, 2025
            </p>
          </div>

          {/* EU Notice */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
            <p className="text-foreground font-medium mb-2">🇪🇺 European Union Compliance</p>
            <p className="text-muted-foreground text-sm">
              This Cookie Policy is designed to comply with the EU General Data Protection Regulation (GDPR) and the ePrivacy Directive (Cookie Law). We are committed to transparency about the data we collect and how we use it.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide information to website owners, and enable certain features. Cookies can be "persistent" (remain on your device until deleted) or "session" cookies (deleted when you close your browser).
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                AdsImagePack uses cookies and similar technologies for the following purposes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>To enable essential website functionality</li>
                <li>To remember your preferences and settings</li>
                <li>To keep you signed in to your account</li>
                <li>To understand how you use our Service</li>
                <li>To improve our Service based on usage patterns</li>
                <li>To measure the effectiveness of our marketing</li>
              </ul>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.1 Strictly Necessary Cookies</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies as the Service would not work without them.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-muted-foreground border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-foreground">Cookie</th>
                      <th className="text-left p-3 font-semibold text-foreground">Purpose</th>
                      <th className="text-left p-3 font-semibold text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3">session_id</td>
                      <td className="p-3">Maintains your session state</td>
                      <td className="p-3">Session</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">csrf_token</td>
                      <td className="p-3">Security: prevents cross-site request forgery</td>
                      <td className="p-3">Session</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">auth_token</td>
                      <td className="p-3">Keeps you logged in</td>
                      <td className="p-3">30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.2 Functional Cookies</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These cookies enable enhanced functionality and personalization, such as remembering your language preference or region. If you do not allow these cookies, some features may not function properly.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-muted-foreground border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-foreground">Cookie</th>
                      <th className="text-left p-3 font-semibold text-foreground">Purpose</th>
                      <th className="text-left p-3 font-semibold text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3">locale</td>
                      <td className="p-3">Stores your language preference</td>
                      <td className="p-3">1 year</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">currency</td>
                      <td className="p-3">Stores your currency preference</td>
                      <td className="p-3">1 year</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">theme</td>
                      <td className="p-3">Remembers dark/light mode preference</td>
                      <td className="p-3">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.3 Analytics Cookies</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our Service.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-muted-foreground border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-foreground">Cookie</th>
                      <th className="text-left p-3 font-semibold text-foreground">Purpose</th>
                      <th className="text-left p-3 font-semibold text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3">_ga</td>
                      <td className="p-3">Google Analytics: distinguishes users</td>
                      <td className="p-3">2 years</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">_ga_*</td>
                      <td className="p-3">Google Analytics: maintains session state</td>
                      <td className="p-3">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.4 Marketing Cookies</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These cookies are used to track visitors across websites to display relevant advertisements. They are set by our advertising partners with our permission.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-muted-foreground border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-foreground">Cookie</th>
                      <th className="text-left p-3 font-semibold text-foreground">Purpose</th>
                      <th className="text-left p-3 font-semibold text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3">_fbp</td>
                      <td className="p-3">Facebook: tracks visits across websites</td>
                      <td className="p-3">3 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Your Cookie Choices</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under the GDPR and ePrivacy Directive, you have the right to decide whether to accept or reject cookies (except strictly necessary cookies). You can exercise your cookie preferences in the following ways:
              </p>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.1 Cookie Consent Banner</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you first visit our website, you will see a cookie consent banner that allows you to accept or reject different categories of cookies.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.2 Browser Settings</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies, accept only certain cookies, or notify you when a cookie is set. Please note that blocking all cookies may affect website functionality.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.3 Opt-Out Links</h3>
              <p className="text-muted-foreground leading-relaxed">
                You can opt out of certain third-party cookies using these links:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-2">
                <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-Out</a></li>
                <li><a href="https://www.youronlinechoices.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Your Online Choices (EU)</a></li>
              </ul>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some cookies are placed by third-party services that appear on our pages. We do not control the use of these cookies and cannot access them. Third-party cookies are covered by the respective third party's privacy policy. We use the following third-party services that may set cookies:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
                <li><strong className="text-foreground">Google Analytics</strong> - for website analytics</li>
                <li><strong className="text-foreground">Stripe</strong> - for payment processing</li>
              </ul>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p><strong className="text-foreground">AdsImagePack</strong></p>
                <p>Email: privacy@adsimagepack.com</p>
                <p className="mt-2">For EU residents, you also have the right to lodge a complaint with your local data protection authority.</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
