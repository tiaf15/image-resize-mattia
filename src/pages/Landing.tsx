import {
  Header,
  HeroSection,
  FormatsSection,
  HowItWorksSection,
  PlatformsSection,
  TestimonialsSection,
  SeeItInActionSection,
  WhyChooseSection,
  PrivacySection,
  PricingSection,
  CTASection,
  FAQSection,
  Footer,
} from "@/components/landing";

export default function Landing() {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <HeroSection />
      <FormatsSection />
      <HowItWorksSection />
      <PlatformsSection />
      <TestimonialsSection />
      <SeeItInActionSection />
      <WhyChooseSection />
      <PrivacySection />
      <PricingSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  );
}
