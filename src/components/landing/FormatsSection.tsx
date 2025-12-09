import { memo } from "react";

const FORMATS = [
  { ratio: "1:1", size: "1080×1080", use: "Instagram Post, Facebook" },
  { ratio: "4:5", size: "1080×1350", use: "Instagram Feed" },
  { ratio: "9:16", size: "1080×1920", use: "Stories, Reels, TikTok" },
  { ratio: "16:9", size: "1920×1080", use: "YouTube, LinkedIn, Twitter" },
] as const;

const BASE_SIZE = 120;
const PREVIEW_SIZES: Record<string, { width: number; height: number }> = {
  "1:1": { width: BASE_SIZE, height: BASE_SIZE },
  "4:5": { width: BASE_SIZE * 0.8, height: BASE_SIZE },
  "9:16": { width: BASE_SIZE * 0.5625, height: BASE_SIZE },
  "16:9": { width: BASE_SIZE, height: BASE_SIZE * 0.5625 },
};

const FormatCard = memo(function FormatCard({ 
  format, 
  index 
}: { 
  format: typeof FORMATS[number]; 
  index: number;
}) {
  const size = PREVIEW_SIZES[format.ratio];
  
  return (
    <div
      className="bg-card rounded-2xl p-6 border border-border hover-lift animate-fade-up flex flex-col"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="h-36 flex items-center justify-center mb-4">
        <div 
          className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center border border-primary/30"
          style={{ width: `${size.width}px`, height: `${size.height}px` }}
        >
          <span className="text-xl font-bold text-primary">{format.ratio}</span>
        </div>
      </div>
      <h3 className="font-semibold text-foreground text-lg mb-1">{format.size}</h3>
      <p className="text-sm text-muted-foreground">{format.use}</p>
    </div>
  );
});

const FormatsSection = memo(function FormatsSection() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Supported Formats
          </h2>
          <p className="text-muted-foreground text-lg">
            All the formats you need for your advertising campaigns
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {FORMATS.map((format, index) => (
            <FormatCard key={format.ratio} format={format} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default FormatsSection;
