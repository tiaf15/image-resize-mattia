import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Download, Package, RefreshCw, Clock, Shield, Eye } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import SafeZonesOverlay from "./SafeZonesOverlay";

type FormatKey = "1:1" | "4:5" | "9:16" | "16:9";
type ExportFormat = "png" | "jpg" | "webp";

interface GeneratedFormats {
  "1:1"?: string;
  "4:5"?: string;
  "9:16"?: string;
  "16:9"?: string;
}

interface ResultsSectionProps {
  formats: GeneratedFormats;
  generationTime: number | null;
  onReset: () => void;
}

const formatInfo: Record<FormatKey, { size: string; use: string }> = {
  "1:1": { size: "1080×1080", use: "Instagram Post, Facebook" },
  "4:5": { size: "1080×1350", use: "Instagram Feed" },
  "9:16": { size: "1080×1920", use: "Stories, Reels, TikTok" },
  "16:9": { size: "1920×1080", use: "YouTube, LinkedIn, Twitter" },
};

const exportFormats: { key: ExportFormat; label: string; mime: string }[] = [
  { key: "png", label: "PNG", mime: "image/png" },
  { key: "jpg", label: "JPG", mime: "image/jpeg" },
  { key: "webp", label: "WEBP", mime: "image/webp" },
];

const EXPIRY_TIME = 3 * 60 * 1000;

async function convertImage(dataUrl: string, targetMime: string, quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      // Fill white background for JPG (no transparency)
      if (targetMime === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to convert image"));
        },
        targetMime,
        quality
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

export default function ResultsSection({ formats, generationTime, onReset }: ResultsSectionProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(EXPIRY_TIME);
  const [isExpired, setIsExpired] = useState(false);
  const [showSafeZones, setShowSafeZones] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("png");

  const validFormats = Object.entries(formats).filter(([, url]) => url) as [FormatKey, string][];
  const currentExport = exportFormats.find((f) => f.key === exportFormat)!;

  useEffect(() => {
    if (!generationTime) return;
    const interval = setInterval(() => {
      const elapsed = Date.now() - generationTime;
      const remaining = Math.max(0, EXPIRY_TIME - elapsed);
      setTimeRemaining(remaining);
      if (remaining === 0) { setIsExpired(true); clearInterval(interval); }
    }, 1000);
    return () => clearInterval(interval);
  }, [generationTime]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleDownloadSingle = async (format: FormatKey) => {
    const url = formats[format];
    if (!url) return;
    
    try {
      const blob = await convertImage(url, currentExport.mime);
      saveAs(blob, `ads-image-${format.replace(":", "x")}.${exportFormat}`);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    for (const [format, dataUrl] of validFormats) {
      try {
        const blob = await convertImage(dataUrl, currentExport.mime);
        zip.file(`ads-image-${format.replace(":", "x")}.${exportFormat}`, blob);
      } catch (error) {
        console.error(`Error converting ${format}:`, error);
      }
    }
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `ads-image-pack.zip`);
  };

  if (isExpired) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">Session Expired</h2>
        <p className="text-muted-foreground mb-6">For your privacy, images have been automatically deleted.</p>
        <Button onClick={onReset} variant="accent" size="lg">
          <RefreshCw className="w-5 h-5" /> Generate New Pack
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 bg-primary/10 rounded-full px-4 py-2">
          <Clock className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">Time remaining: {formatTime(timeRemaining)}</span>
        </div>
        <div className="flex gap-3">
          <Button onClick={onReset} variant="outline"><RefreshCw className="w-4 h-4" /> New Pack</Button>
          <Button onClick={handleDownloadAll} variant="accent"><Package className="w-4 h-4" /> Download All as ZIP</Button>
        </div>
      </div>

      {/* Export Format & Safe Zones Row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border flex-1">
          <Label className="text-sm font-medium text-foreground whitespace-nowrap">Download as:</Label>
          <div className="flex rounded-lg border border-border overflow-hidden">
            {exportFormats.map((format) => (
              <button
                key={format.key}
                onClick={() => setExportFormat(format.key)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  exportFormat === format.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {format.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border flex-1">
          <Eye className="w-5 h-5 text-muted-foreground" />
          <Label htmlFor="safe-zones" className="text-sm font-medium cursor-pointer flex-1">
            Show Safe Zones
          </Label>
          <Switch
            id="safe-zones"
            checked={showSafeZones}
            onCheckedChange={setShowSafeZones}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {validFormats.map(([format, dataUrl]) => (
          <div key={format} className="bg-card rounded-2xl border border-border overflow-hidden hover-lift">
            <div className="aspect-square bg-muted flex items-center justify-center p-4 relative">
              <img src={dataUrl} alt={`Format ${format}`} className="max-w-full max-h-full object-contain rounded-lg" />
              {showSafeZones && <SafeZonesOverlay format={format} />}
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded">{format}</span>
                  <span className="text-sm text-muted-foreground">{formatInfo[format].size}</span>
                </div>
                <p className="text-xs text-muted-foreground">{formatInfo[format].use}</p>
              </div>
              <Button onClick={() => handleDownloadSingle(format)} variant="outline" size="sm">
                <Download className="w-4 h-4" />
                <span className="ml-1 uppercase text-xs">{exportFormat}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Images will be automatically deleted in {formatTime(timeRemaining)}. Download the pack before expiration.
        </p>
      </div>
    </div>
  );
}