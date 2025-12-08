/**
 * Extracts the dominant color from an image using canvas.
 * Fully local, privacy-safe - no external calls.
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface ColorResult {
  hex: string;
  rgb: RGB;
  isLight: boolean;
}

export async function extractDominantColor(imageDataUrl: string): Promise<ColorResult | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          resolve(null);
          return;
        }
        
        // Sample at a smaller size for performance
        const sampleSize = 50;
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        
        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        
        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imageData.data;
        
        // Color frequency map using quantized colors
        const colorCounts: Map<string, { count: number; r: number; g: number; b: number }> = new Map();
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          // Skip transparent pixels
          if (a < 128) continue;
          
          // Skip very light (near white) and very dark (near black) colors
          const brightness = (r + g + b) / 3;
          if (brightness > 240 || brightness < 15) continue;
          
          // Quantize to reduce color space (group similar colors)
          const quantize = 24;
          const qr = Math.round(r / quantize) * quantize;
          const qg = Math.round(g / quantize) * quantize;
          const qb = Math.round(b / quantize) * quantize;
          
          const key = `${qr},${qg},${qb}`;
          
          const existing = colorCounts.get(key);
          if (existing) {
            existing.count++;
            // Keep running average for more accurate final color
            existing.r = Math.round((existing.r * (existing.count - 1) + r) / existing.count);
            existing.g = Math.round((existing.g * (existing.count - 1) + g) / existing.count);
            existing.b = Math.round((existing.b * (existing.count - 1) + b) / existing.count);
          } else {
            colorCounts.set(key, { count: 1, r, g, b });
          }
        }
        
        if (colorCounts.size === 0) {
          resolve(null);
          return;
        }
        
        // Find the most frequent color with good saturation
        let bestColor: { r: number; g: number; b: number } | null = null;
        let bestScore = 0;
        
        colorCounts.forEach((value) => {
          const { count, r, g, b } = value;
          
          // Calculate saturation (higher is more colorful)
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;
          
          // Score combines frequency and saturation
          const score = count * (0.5 + saturation * 0.5);
          
          if (score > bestScore) {
            bestScore = score;
            bestColor = { r, g, b };
          }
        });
        
        if (!bestColor) {
          resolve(null);
          return;
        }
        
        const hex = rgbToHex(bestColor.r, bestColor.g, bestColor.b);
        const isLight = (bestColor.r * 0.299 + bestColor.g * 0.587 + bestColor.b * 0.114) > 150;
        
        resolve({
          hex,
          rgb: bestColor,
          isLight,
        });
      } catch (error) {
        console.error("Color extraction error:", error);
        resolve(null);
      }
    };
    
    img.onerror = () => {
      resolve(null);
    };
    
    img.src = imageDataUrl;
  });
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}
