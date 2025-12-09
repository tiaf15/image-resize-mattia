import { memo } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import demo1x1 from "@/assets/demo-1x1.jpg";
import demo4x5 from "@/assets/demo-4x5.jpg";
import demo9x16 from "@/assets/demo-9x16.jpg";
import demo16x9 from "@/assets/demo-16x9.jpg";

const OUTPUT_FORMATS = [
  { 
    ratio: "1:1", 
    size: "1080×1080", 
    w: 110, 
    h: 110, 
    img: demo1x1,
    label: "Perfect for Instagram & Facebook",
    color: "from-pink-500 to-purple-500",
  },
  { 
    ratio: "4:5", 
    size: "1080×1350", 
    w: 88, 
    h: 110, 
    img: demo4x5,
    label: "Perfect for Instagram Feed",
    color: "from-purple-500 to-pink-500",
  },
  { 
    ratio: "9:16", 
    size: "1080×1920", 
    w: 62, 
    h: 110, 
    img: demo9x16,
    label: "Perfect for TikTok & Reels",
    color: "from-gray-800 to-gray-600",
  },
  { 
    ratio: "16:9", 
    size: "1920×1080", 
    w: 130, 
    h: 73, 
    img: demo16x9,
    label: "Perfect for YouTube & LinkedIn",
    color: "from-red-500 to-orange-500",
  },
] as const;

const FormatPreviewCard = memo(function FormatPreviewCard({
  format,
  index,
}: {
  format: typeof OUTPUT_FORMATS[number];
  index: number;
}) {
  return (
    <div 
      className="text-center animate-fade-up"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div 
        className={`rounded-xl mx-auto mb-3 overflow-hidden shadow-lg ring-2 ring-offset-2 ring-offset-background ring-primary/20 hover:ring-primary/50 transition-all hover:scale-105`}
        style={{ width: `${format.w}px`, height: `${format.h}px` }}
      >
        <img 
          src={format.img} 
          alt={`${format.ratio} format example`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className={`inline-block px-2 py-0.5 rounded-full bg-gradient-to-r ${format.color} mb-1`}>
        <span className="text-[10px] font-semibold text-white">{format.ratio}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{format.label}</p>
    </div>
  );
});

const TransformationShowcase = memo(function TransformationShowcase() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-10 mb-8 animate-fade-up">
      <div className="flex flex-col items-center gap-8">
        {/* Top: Input Image */}
        <div className="text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            Your Original Image
          </div>
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl border-2 border-primary shadow-glow mx-auto overflow-hidden">
            <img 
              src={demo1x1} 
              alt="Original input image" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-3">Upload any image, any size</p>
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary" />
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent" />
        </div>
        
        <p className="text-sm font-medium text-foreground">AI generates all formats instantly</p>

        {/* Output Formats Grid */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-end justify-items-center">
          {OUTPUT_FORMATS.map((format, index) => (
            <FormatPreviewCard key={format.ratio} format={format} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
});

const CTAShowcase = memo(function CTAShowcase() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 animate-fade-up [animation-delay:0.1s]">
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
          <div className="w-36 h-36 rounded-xl border border-border/50 mb-3 mx-auto relative overflow-hidden shadow-md opacity-75">
            <img 
              src={demo1x1} 
              alt="Image without CTA" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-muted-foreground">Standard</p>
        </div>

        <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
        <ArrowRight className="w-6 h-6 text-primary rotate-90 md:hidden" />

        {/* With CTA */}
        <div className="text-center">
          <div className="w-36 h-36 rounded-xl border-2 border-primary/40 mb-3 mx-auto relative overflow-hidden shadow-lg">
            <img 
              src={demo1x1} 
              alt="Image with CTA overlay" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-2.5 left-2.5 right-2.5">
              <div className="w-full py-2 px-3 rounded-lg bg-accent text-accent-foreground text-xs font-bold text-center shadow-lg">
                Shop Now →
              </div>
            </div>
          </div>
          <p className="text-sm font-medium text-primary">With CTA Overlay</p>
        </div>
      </div>
    </div>
  );
});

const SeeItInActionSection = memo(function SeeItInActionSection() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See It in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload one image, get perfectly adapted versions for every platform — all in seconds
          </p>
        </div>

        <TransformationShowcase />
        <CTAShowcase />
      </div>
    </section>
  );
});

export default SeeItInActionSection;
