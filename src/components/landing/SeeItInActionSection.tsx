import { memo, useMemo } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import demo1x1 from "@/assets/demo-1x1.jpg";
import demo4x5 from "@/assets/demo-4x5.jpg";
import demo9x16 from "@/assets/demo-9x16.jpg";
import demo16x9 from "@/assets/demo-16x9.jpg";

const OUTPUT_FORMATS = [
  { ratio: "1:1", size: "1080×1080", w: 100, h: 100, img: demo1x1 },
  { ratio: "4:5", size: "1080×1350", w: 80, h: 100, img: demo4x5 },
  { ratio: "9:16", size: "1080×1920", w: 56, h: 100, img: demo9x16 },
  { ratio: "16:9", size: "1920×1080", w: 120, h: 68, img: demo16x9 },
] as const;

const FormatPreviewCard = memo(function FormatPreviewCard({
  format,
}: {
  format: typeof OUTPUT_FORMATS[number];
}) {
  return (
    <div className="text-center">
      <div 
        className="rounded-lg border border-primary/30 mx-auto mb-2 overflow-hidden shadow-md"
        style={{ width: `${format.w}px`, height: `${format.h}px` }}
      >
        <img 
          src={format.img} 
          alt={`${format.ratio} format example`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="text-sm font-medium text-foreground">{format.ratio}</p>
      <p className="text-xs text-muted-foreground">{format.size}</p>
    </div>
  );
});

const TransformationShowcase = memo(function TransformationShowcase() {
  return (
    <div className="bg-card rounded-2xl border border-border p-8 mb-8 animate-fade-up">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Original Image */}
        <div className="flex-shrink-0 text-center">
          <div className="w-48 h-48 rounded-xl border-2 border-primary/40 mb-3 mx-auto overflow-hidden shadow-lg">
            <img 
              src={demo1x1} 
              alt="Original input image" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="text-sm font-medium text-foreground">Input Image</p>
          <p className="text-xs text-muted-foreground">Any size</p>
        </div>

        {/* Arrow */}
        <div className="hidden lg:flex items-center justify-center px-4">
          <div className="flex items-center gap-2">
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent" />
            <Sparkles className="w-6 h-6 text-primary" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-primary" />
          </div>
        </div>
        <div className="lg:hidden py-4">
          <ArrowRight className="w-8 h-8 text-primary rotate-90" />
        </div>

        {/* Output Formats */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {OUTPUT_FORMATS.map((format) => (
            <FormatPreviewCard key={format.ratio} format={format} />
          ))}
        </div>
      </div>
    </div>
  );
});

const CTAShowcase = memo(function CTAShowcase() {
  return (
    <div className="bg-card rounded-2xl border border-border p-8 animate-fade-up [animation-delay:0.1s]">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Add CTA Overlays Automatically
        </h3>
        <p className="text-muted-foreground">
          Enhance your ads with customizable call-to-action buttons
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Without CTA */}
        <div className="text-center">
          <div className="w-40 h-40 rounded-xl border border-border mb-3 mx-auto relative overflow-hidden shadow-md">
            <img 
              src={demo1x1} 
              alt="Image without CTA" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-muted-foreground">Without CTA</p>
        </div>

        <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
        <ArrowRight className="w-6 h-6 text-primary rotate-90 md:hidden" />

        {/* With CTA */}
        <div className="text-center">
          <div className="w-40 h-40 rounded-xl border-2 border-primary/40 mb-3 mx-auto relative overflow-hidden shadow-lg">
            <img 
              src={demo1x1} 
              alt="Image with CTA overlay" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="w-full py-2 px-3 rounded-lg bg-accent text-accent-foreground text-xs font-semibold text-center shadow-lg">
                Shop Now →
              </div>
            </div>
          </div>
          <p className="text-sm font-medium text-foreground">With CTA Overlay</p>
        </div>
      </div>
    </div>
  );
});

const SeeItInActionSection = memo(function SeeItInActionSection() {
  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See It in Action
          </h2>
          <p className="text-muted-foreground text-lg">
            Upload one image, get perfectly adapted versions for every platform
          </p>
        </div>

        <TransformationShowcase />
        <CTAShowcase />
      </div>
    </section>
  );
});

export default SeeItInActionSection;
