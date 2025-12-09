import { memo } from "react";
import { Shield } from "lucide-react";

const PrivacySection = memo(function PrivacySection() {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card rounded-2xl p-8 border border-border flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Privacy by Design
            </h3>
            <p className="text-muted-foreground">
              For your privacy, no images are stored on our servers. 
              All images are processed in real-time and automatically deleted after download.
            </p>
            <p className="text-sm text-primary font-medium mt-2">
              Auto-delete after processing for full privacy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default PrivacySection;
