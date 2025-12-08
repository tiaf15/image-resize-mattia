import { cn } from "@/lib/utils";

type FormatKey = "1:1" | "4:5" | "9:16" | "16:9";

interface FormatPreviewProps {
  selectedFormats: FormatKey[];
}

const formatDimensions: Record<FormatKey, { width: number; height: number; label: string }> = {
  "1:1": { width: 1, height: 1, label: "1:1" },
  "4:5": { width: 4, height: 5, label: "4:5" },
  "9:16": { width: 9, height: 16, label: "9:16" },
  "16:9": { width: 16, height: 9, label: "16:9" },
};

export default function FormatPreview({ selectedFormats }: FormatPreviewProps) {
  if (selectedFormats.length === 0) return null;

  const getPreviewStyles = (format: FormatKey) => {
    const { width, height } = formatDimensions[format];
    const maxHeight = 120;
    const aspectRatio = width / height;
    
    if (aspectRatio >= 1) {
      // Horizontal or square
      return {
        width: Math.min(maxHeight * aspectRatio, 160),
        height: maxHeight / aspectRatio < maxHeight ? maxHeight : maxHeight / aspectRatio,
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
      <h2 className="text-lg font-semibold text-foreground mb-4">Format Preview</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Visual representation of your selected aspect ratios
      </p>
      <div className="flex flex-wrap items-end justify-center gap-6">
        {selectedFormats.map((format) => {
          const styles = getPreviewStyles(format);
          return (
            <div key={format} className="flex flex-col items-center gap-3">
              <div
                className={cn(
                  "border-2 border-dashed border-primary/40 rounded-lg",
                  "bg-primary/5 flex items-center justify-center",
                  "transition-all duration-300 ease-out"
                )}
                style={{
                  width: styles.width,
                  height: styles.height,
                }}
              >
                <span className="text-xs font-medium text-primary/60">
                  {formatDimensions[format].label}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {format}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
