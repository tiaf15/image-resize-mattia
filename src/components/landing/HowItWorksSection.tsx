import { memo } from "react";
import { Upload, Sparkles, Download, LucideIcon } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Upload or Generate",
    description: "Upload your image or generate one with AI using a text prompt",
  },
  {
    icon: Sparkles,
    title: "AI Processing",
    description: "Our AI adapts your image to all ad formats using intelligent outpainting",
  },
  {
    icon: Download,
    title: "Download Pack",
    description: "Get all variants in one click, ready for your campaigns",
  },
] as const;

const StepCard = memo(function StepCard({
  step,
  index,
}: {
  step: { icon: LucideIcon; title: string; description: string };
  index: number;
}) {
  const Icon = step.icon;
  
  return (
    <div
      className="text-center animate-fade-up"
      style={{ animationDelay: `${0.15 * index}s` }}
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
        <Icon className="w-10 h-10 text-primary-foreground" />
      </div>
      <div className="w-8 h-8 mx-auto -mt-10 mb-4 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm">
        {index + 1}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
      <p className="text-muted-foreground">{step.description}</p>
    </div>
  );
});

const HowItWorksSection = memo(function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-secondary/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Three simple steps to get your Ads Pack
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default HowItWorksSection;
