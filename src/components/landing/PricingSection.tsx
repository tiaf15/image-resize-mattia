import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Crown, Building2 } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";

const PLANS = [
  {
    name: "Free",
    description: "Perfect to try out",
    euroPrice: 0,
    icon: Zap,
    credits: "20 credits",
  },
  {
    name: "Pro",
    description: "Best for marketers & creators",
    euroPrice: 16.90,
    icon: Crown,
    featured: true,
    credits: "180 credits",
  },
  {
    name: "Creator",
    description: "For high-volume content creators",
    euroPrice: 39,
    icon: Crown,
    credits: "600 credits",
  },
  {
    name: "Agency",
    description: "For teams & agencies",
    euroPrice: 89,
    icon: Building2,
    credits: "2,000 credits",
  },
] as const;

const PricingSection = memo(function PricingSection() {
  const { formatPrice } = useCurrency();

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Simple Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {PLANS.map((plan, index) => {
            const Icon = plan.icon;
            const isFeatured = "featured" in plan && plan.featured;
            
            return (
              <div
                key={plan.name}
                className={`text-center p-6 rounded-2xl animate-fade-up ${
                  isFeatured 
                    ? "bg-gradient-to-b from-primary/10 to-accent/5 border-2 border-primary" 
                    : "bg-card border border-border"
                }`}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                  isFeatured ? "gradient-primary" : "bg-secondary"
                }`}>
                  <Icon className={`w-6 h-6 ${isFeatured ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                <div className="mb-1">
                  <span className="text-2xl font-bold text-foreground">{formatPrice(plan.euroPrice)}</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <p className="text-xs text-muted-foreground">{plan.credits}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/pricing">
            <Button variant="outline" size="lg">
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
