import { Header, Footer } from "@/components/landing";
import { FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: December 10, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using AdsImagePack ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the Terms, you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                AdsImagePack is an AI-powered image processing service that automatically generates multiple format versions of uploaded images optimized for various social media and advertising platforms. The Service includes web-based tools, APIs, and related features as made available by us.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts</h2>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.1 Account Creation</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.2 Account Security</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are responsible for safeguarding the password you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party and to notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.3 Account Termination</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Subscription and Payments</h2>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.1 Billing</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Some aspects of the Service are provided on a subscription basis ("Subscription"). You will be billed in advance on a recurring periodic basis ("Billing Cycle"). Billing cycles are set on a monthly or annual basis.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.2 Price Changes</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to modify our prices at any time. Price changes will be communicated to you in advance and will apply to the next Billing Cycle.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.3 Refunds</h3>
              <p className="text-muted-foreground leading-relaxed">
                Except where required by law, paid subscription fees are non-refundable. However, we may offer refunds at our sole discretion in exceptional circumstances.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to use the Service:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>For any unlawful purpose or to promote illegal activities</li>
                <li>To upload, transmit, or distribute any content that infringes intellectual property rights</li>
                <li>To upload content that is defamatory, obscene, pornographic, or offensive</li>
                <li>To impersonate any person or entity or falsely state your affiliation</li>
                <li>To interfere with or disrupt the Service or servers</li>
                <li>To attempt to gain unauthorized access to any portion of the Service</li>
                <li>To use automated systems to access the Service without permission</li>
                <li>To transmit viruses, malware, or other harmful code</li>
                <li>To harvest or collect user information without consent</li>
              </ul>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property</h2>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.1 Our Content</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of AdsImagePack and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.2 Your Content</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You retain all rights to images and content you upload to the Service. By uploading content, you grant us a limited, non-exclusive license to process your content solely to provide the Service. This license terminates when your content is deleted from our servers (which occurs automatically after processing).
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.3 Output</h3>
              <p className="text-muted-foreground leading-relaxed">
                You own all rights to the processed images and outputs generated by the Service from your original content.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                IN NO EVENT SHALL ADSIMAGEPACK, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRIOR TO THE CLAIM.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to defend, indemnify, and hold harmless AdsImagePack and its licensors, employees, contractors, agents, officers, and directors from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from your use of and access to the Service, your violation of these Terms, or your violation of any third-party rights.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any legal action or proceeding relating to these Terms shall be brought exclusively in the federal or state courts located in Delaware.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Any dispute arising from these Terms shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You agree to waive any right to a jury trial or to participate in a class action.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after revisions become effective, you agree to be bound by the revised Terms.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law.
              </p>
            </section>

            <section className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">14. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p><strong className="text-foreground">AdsImagePack</strong></p>
                <p>Email: legal@adsimagepack.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
