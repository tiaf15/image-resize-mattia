import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = memo(function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
          Visuals, perfectly adapted
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up">
          One image.{" "}
          <span className="text-primary">Every format.</span>{" "}
          Ready to publish.
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up [animation-delay:0.1s]">
          Automatically generate optimized versions for every social platform. 
          Upload or create with AI, download the complete pack in one click.
        </p>
        
        <div className="flex flex-col items-center gap-4 animate-fade-up [animation-delay:0.2s]">
          <Link to="/auth">
            <Button variant="accent" size="xl">
              Generate Your Ads Pack
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Instant setup
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
