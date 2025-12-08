import { cn } from "@/lib/utils";

type FormatKey = "1:1" | "4:5" | "9:16" | "16:9";

interface FormatPreviewProps {
  selectedFormats: FormatKey[];
}

const formatDimensions: Record<FormatKey, { width: number; height: number; label: string; description: string }> = {
  "1:1": { width: 1, height: 1, label: "1:1", description: "Square" },
  "4:5": { width: 4, height: 5, label: "4:5", description: "Portrait" },
  "9:16": { width: 9, height: 16, label: "9:16", description: "Vertical" },
  "16:9": { width: 16, height: 9, label: "16:9", description: "Landscape" },
};

export default function FormatPreview({ selectedFormats }: FormatPreviewProps) {
  if (selectedFormats.length === 0) return null;

  const getPreviewStyles = (format: FormatKey) => {
    const { width, height } = formatDimensions[format];
    const maxHeight = 100;
    const aspectRatio = width / height;
    
    if (aspectRatio >= 1) {
      // Horizontal or square
      const calculatedWidth = Math.min(maxHeight * aspectRatio, 140);
      return {
        width: calculatedWidth,
        height: calculatedWidth / aspectRatio,
      };
    } else {
      // Vertical
      return {
        width: maxHeight * aspectRatio,
        height: maxHeight,
      };
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-2">Format Previews</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Visual representation of your selected aspect ratios
      </p>
      <div className="flex flex-wrap items-end justify-center gap-8">
        {selectedFormats.map((format) => {
          const styles = getPreviewStyles(format);
          const { label, description } = formatDimensions[format];
          return (
            <div 
              key={format} 
              className="flex flex-col items-center gap-3 animate-in fade-in-50 zoom-in-95 duration-200"
            >
              <div
                className={cn(
                  "border-2 border-dashed border-primary/50 rounded-lg",
                  "bg-primary/5 flex items-center justify-center",
                  "transition-all duration-300 ease-out",
                  "hover:border-primary hover:bg-primary/10"
                )}
                style={{
                  width: styles.width,
                  height: styles.height,
                }}
              >
                <span className="text-xs font-medium text-primary/70">
                  {label}
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-foreground block">
                  {label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}