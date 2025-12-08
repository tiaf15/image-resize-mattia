type FormatKey = "1:1" | "4:5" | "9:16" | "16:9";

interface SafeZonesOverlayProps {
  format: FormatKey;
}

const safeZoneConfig: Record<FormatKey, { zones: { position: string; label: string }[] }> = {
  "1:1": {
    zones: [
      { position: "top-0 left-0 right-0 h-[8%]", label: "Top UI" },
      { position: "bottom-0 left-0 right-0 h-[8%]", label: "Bottom UI" },
    ],
  },
  "4:5": {
    zones: [
      { position: "top-0 left-0 right-0 h-[6%]", label: "Top trim" },
      { position: "bottom-0 left-0 right-0 h-[10%]", label: "Caption area" },
    ],
  },
  "9:16": {
    zones: [
      { position: "top-0 left-0 right-0 h-[12%]", label: "Stories/Reels UI" },
      { position: "bottom-0 left-0 right-0 h-[18%]", label: "Caption & controls" },
      { position: "top-[15%] right-0 w-[12%] h-[35%]", label: "TikTok icons" },
    ],
  },
  "16:9": {
    zones: [
      { position: "bottom-0 right-0 w-[15%] h-[12%]", label: "Timestamp" },
      { position: "top-0 left-0 right-0 h-[5%]", label: "Top trim" },
    ],
  },
};

export default function SafeZonesOverlay({ format }: SafeZonesOverlayProps) {
  const config = safeZoneConfig[format];

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {config.zones.map((zone, index) => (
        <div
          key={index}
          className={`absolute ${zone.position} bg-destructive/25 border border-destructive/40 backdrop-blur-[1px]`}
        >
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-destructive-foreground/80 uppercase tracking-wide">
            {zone.label}
          </span>
        </div>
      ))}
    </div>
  );
}
