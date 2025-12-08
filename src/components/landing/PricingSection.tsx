import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Crown, Building2, Check } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    subtitle: "Get started",
    price: "€0",
    icon: Zap,
    featured: false,
    variant: "outline" as const,
    features: [
      { text: "10 Ads Packs/month", highlight: false },
      { text: "PNG export only", highlight: false },
      { text: "Basic support", highlight: false },
    ],
  },
  {
    name: "Pro",
    subtitle: "For professionals",
    price: "€19",
    icon: Crown,
    featured: true,
    variant: "accent" as const,
    features: [
      { text: "150 Ads Packs/month", highlight: true },
      { text: "All formats + exports", highlight: true },
      { text: "CTA, Styles & Safe Zones", highlight: true },
    ],
  },
  {
    name: "Agency",
    subtitle: "For teams",
    price: "€49",
    icon: Building2,
    featured: false,
    variant: "outline" as const,
    features: [
      { text: "Unlimited Ads Packs", highlight: false },
      { text: "Priority rendering", highlight: false },
      { text: "Team access (soon)", highlight: false },
    ],
  },
] as const;

const PlanCard = memo(function PlanCard({
  plan,
  index,
}: {
  plan: typeof PLANS[number];
  index: number;
}) {
  const Icon = plan.icon;
  
  return (
    <div
      className={`${
        plan.featured
          ? "relative bg-gradient-to-b from-primary/10 to-accent/5 rounded-2xl p-6 border-2 border-primary shadow-glow"
          : "bg-card rounded-2xl p-6 border border-border"
      } animate-fade-up`}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          Most Popular
        </div>
      )}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl ${plan.featured ? "gradient-primary" : "bg-secondary"} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${plan.featured ? "text-primary-foreground" : "text-primary"}`} />
        </div>
        <div>
          <h3 className="font-bold text-foreground">{plan.name}</h3>
          <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
        </div>
      </div>
      <div className="mb-4">
        <span className="text-3xl font-bold text-foreground">{plan.price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      <ul className="space-y-2 mb-6 text-sm">
        {plan.features.map((feature) => (
          <li 
            key={feature.text} 
            className={`flex items-center gap-2 ${feature.highlight ? "text-foreground" : "text-muted-foreground"}`}
          >
            <Check className="w-4 h-4 text-primary" />
            {feature.text}
          </li>
        ))}
      </ul>
      <Link to="/pricing">
        <Button variant={plan.variant} size="sm" className="w-full">
          View Details
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
});

const PricingSection = memo(function PricingSection() {
  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/pricing">
            <Button variant="ghost" size="lg">
              View Full Pricing
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

export default PricingSection;
