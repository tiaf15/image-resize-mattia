import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, X, Layers, Zap, Crown, Building2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: "€0",
    period: "/month",
    description: "Perfect to get started",
    features: [
      { text: "10 Ads Packs per month", included: true },
      { text: "PNG export only", included: true },
      { text: "Single-format generation", included: true },
      { text: "Basic support", included: true },
      { text: "CTA overlay", included: false },
      { text: "Ads Styles", included: false },
      { text: "Safe Zones", included: false },
      { text: "Brand color adaptation", included: false },
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: "€19",
    period: "/month",
    description: "Best for professionals",
    badge: "Most Popular",
    features: [
      { text: "150 Ads Packs per month", included: true },
      { text: "All formats available", included: true },
      { text: "PNG + JPG + WEBP export", included: true },
      { text: "CTA overlay", included: true },
      { text: "Ads Styles", included: true },
      { text: "Safe Zones", included: true },
      { text: "Brand color adaptation", included: true },
      { text: "Faster processing", included: true },
      { text: "No watermark", included: true },
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Agency",
    icon: Building2,
    price: "€49",
    period: "/month",
    description: "For teams and agencies",
    features: [
      { text: "Unlimited Ads Packs", included: true },
      { text: "Priority rendering", included: true },
      { text: "All export formats", included: true },
      { text: "All CTA features + custom text", included: true },
      { text: "All Ads Styles", included: true },
      { text: "Safe Zones", included: true },
      { text: "Team access (coming soon)", included: true },
      { text: "Batch upload (coming soon)", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Get Started",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AdsImagePack</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/pricing" className="text-foreground font-medium">
              Pricing
            </Link>
          </nav>
          <Link to="/tool">
            <Button variant="accent" size="sm">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up">
            Simple, transparent{" "}
            <span className="text-primary">pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 animate-fade-up flex flex-col ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-primary/10 to-accent/5 border-2 border-primary shadow-glow"
                    : "bg-card border border-border"
                }`}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {plan.badge}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    plan.highlighted ? "gradient-primary" : "bg-secondary"
                  }`}>
                    <plan.icon className={`w-7 h-7 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground/60"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/tool" className="mt-auto">
                  <Button 
                    variant={plan.highlighted ? "accent" : "outline"} 
                    size="lg" 
                    className="w-full"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground">
            All plans include a 7-day free trial. No credit card required to start.
            <br />
            You can upgrade, downgrade, or cancel your subscription at any time.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="bg-card rounded-2xl p-10 border border-border">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Not sure which plan is right for you?
            </h2>
            <p className="text-muted-foreground mb-6">
              Start with our Free plan and upgrade when you need more power.
            </p>
            <Link to="/tool">
              <Button variant="accent" size="lg">
                Try Free Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">AdsImagePack</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            © 2025 AdsImagePack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
