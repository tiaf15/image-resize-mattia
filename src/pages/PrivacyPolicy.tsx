import { Header, Footer } from "@/components/landing";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: December 10, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                AdsImagePack ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services at adsimagepack.com (the "Service"). Please read this privacy policy carefully. By using the Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.1 Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you register for an account, we may collect:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Email address</li>
                <li>Name (optional)</li>
                <li>Payment information (processed securely by our payment processor)</li>
                <li>Account preferences and settings</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you access the Service, we automatically collect:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>IP address and approximate location</li>
                <li>Browser type and version</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.3 Image Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Important:</strong> Images you upload for processing are automatically deleted from our servers immediately after processing is complete. We do not store, retain, or use your images for any purpose other than providing the requested service. Your creative assets remain yours.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide, operate, and maintain the Service</li>
                <li>Process your transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions and unauthorized access</li>
                <li>Personalize and improve your experience</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong className="text-foreground">Service Providers:</strong> With third-party vendors who perform services on our behalf (payment processing, hosting, analytics)</li>
                <li><strong className="text-foreground">Legal Requirements:</strong> If required by law or in response to valid legal process</li>
                <li><strong className="text-foreground">Protection of Rights:</strong> To protect our rights, privacy, safety, or property</li>
                <li><strong className="text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights and Choices</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong className="text-foreground">Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal data</li>
                <li><strong className="text-foreground">Portability:</strong> Request transfer of your data to another service</li>
                <li><strong className="text-foreground">Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@adsimagepack.com.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. California Privacy Rights (CCPA)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Right to know what personal information is collected</li>
                <li>Right to know whether your personal information is sold or disclosed</li>
                <li>Right to say no to the sale of personal information</li>
                <li>Right to equal service and price, even if you exercise your privacy rights</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong className="text-foreground">We do not sell your personal information.</strong>
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p><strong className="text-foreground">AdsImagePack</strong></p>
                <p>Email: privacy@adsimagepack.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
