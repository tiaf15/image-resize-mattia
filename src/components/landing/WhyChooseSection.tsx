import { memo } from "react";
import { Zap, Sparkles, Palette, Shield, Users, Layers } from "lucide-react";

const BENEFITS = [
  {
    icon: Zap,
    title: "Instant Multi-Format",
    description: "Generate all ad sizes in seconds, not hours",
  },
  {
    icon: Palette,
    title: "No Design Skills Needed",
    description: "Upload any image and let AI do the work",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Outpainting",
    description: "Seamlessly extend images to any aspect ratio",
  },
  {
    icon: Layers,
    title: "Consistent Visuals",
    description: "Perfect brand consistency across all platforms",
  },
  {
    icon: Shield,
    title: "Zero Storage, Full Privacy",
    description: "Images processed in real-time, never stored",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    description: "Creators, marketers, and agencies love it",
  },
] as const;

const WhyChooseSection = memo(function WhyChooseSection() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose AdsImagePack?
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to create professional ads faster
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover-lift animate-fade-up"
                style={{ animationDelay: `${0.08 * index}s` }}
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default WhyChooseSection;
