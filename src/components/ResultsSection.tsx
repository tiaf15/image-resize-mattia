import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Package, RefreshCw, Clock, Shield } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface GeneratedFormats {
  "1:1": string;
  "4:5": string;
  "9:16": string;
  "16:9": string;
}

interface ResultsSectionProps {
  formats: GeneratedFormats;
  generationTime: number | null;
  onReset: () => void;
}

const formatInfo = {
  "1:1": { size: "1080×1080", use: "Instagram Post, Facebook" },
  "4:5": { size: "1080×1350", use: "Instagram Feed" },
  "9:16": { size: "1080×1920", use: "Stories, Reels, TikTok" },
  "16:9": { size: "1920×1080", use: "YouTube, LinkedIn, Twitter" },
};

const EXPIRY_TIME = 3 * 60 * 1000; // 3 minutes in milliseconds

export default function ResultsSection({ formats, generationTime, onReset }: ResultsSectionProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(EXPIRY_TIME);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!generationTime) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - generationTime;
      const remaining = Math.max(0, EXPIRY_TIME - elapsed);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [generationTime]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleDownloadSingle = (format: keyof GeneratedFormats) => {
    const link = document.createElement("a");
    link.href = formats[format];
    link.download = `ads-image-${format.replace(":", "x")}.png`;
    link.click();
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();

    for (const [format, dataUrl] of Object.entries(formats)) {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      zip.file(`ads-image-${format.replace(":", "x")}.png`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "ads-image-pack.zip");
  };

  if (isExpired) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Sessione scaduta
        </h2>
        <p className="text-muted-foreground mb-6">
          Per la tua privacy, le immagini sono state eliminate automaticamente.
        </p>
        <Button onClick={onReset} variant="accent" size="lg">
          <RefreshCw className="w-5 h-5" />
          Genera nuovo pack
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Timer and Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3 bg-primary/10 rounded-full px-4 py-2">
          <Clock className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">
            Tempo rimanente: {formatTime(timeRemaining)}
          </span>
        </div>

        <div className="flex gap-3">
          <Button onClick={onReset} variant="outline">
            <RefreshCw className="w-4 h-4" />
            Nuovo Pack
          </Button>
          <Button onClick={handleDownloadAll} variant="accent">
            <Package className="w-4 h-4" />
            Scarica tutto in ZIP
          </Button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {(Object.entries(formats) as [keyof GeneratedFormats, string][]).map(([format, dataUrl]) => (
          <div
            key={format}
            className="bg-card rounded-2xl border border-border overflow-hidden hover-lift"
          >
            <div className="aspect-square bg-muted flex items-center justify-center p-4">
              <img
                src={dataUrl}
                alt={`Format ${format}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {format}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatInfo[format].size}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatInfo[format].use}
                </p>
              </div>
              <Button
                onClick={() => handleDownloadSingle(format)}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Privacy Notice */}
      <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Le immagini verranno eliminate automaticamente tra {formatTime(timeRemaining)}. 
          Scarica il pack prima della scadenza.
        </p>
      </div>
    </div>
  );
}
