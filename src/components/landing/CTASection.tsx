import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = memo(function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Try AdsImagePack for Free
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Create your first Ads Pack in seconds. No credit card required.
            </p>
            <Link to="/auth">
              <Button 
                size="xl" 
                className="bg-background text-foreground hover:bg-background/90 shadow-lg"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default CTASection;
