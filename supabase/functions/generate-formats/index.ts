import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type FormatKey = "1:1" | "4:5" | "9:16" | "16:9";

const formatConfigs: Record<FormatKey, { width: number; height: number; aspectRatio: string }> = {
  "1:1": { width: 1080, height: 1080, aspectRatio: "1:1 square" },
  "4:5": { width: 1080, height: 1350, aspectRatio: "4:5 vertical portrait" },
  "9:16": { width: 1080, height: 1920, aspectRatio: "9:16 tall vertical story" },
  "16:9": { width: 1920, height: 1080, aspectRatio: "16:9 wide horizontal landscape" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const googleApiKey = Deno.env.get("GOOGLE_AI_API_KEY");
    if (!googleApiKey) throw new Error("GOOGLE_AI_API_KEY not configured");

    const { masterImage, selectedFormats, mode = "high-quality", cta = null, ctaColor = null, adsStyle = null } = await req.json();
    if (!masterImage) throw new Error("Master image is required");
    if (!selectedFormats || !Array.isArray(selectedFormats) || selectedFormats.length === 0) {
      throw new Error("At least one format must be selected");
    }

    const ctaInstruction = cta 
      ? `\n\nIMPORTANT CTA OVERLAY: Add a clean, modern call-to-action button at the bottom center of the image with the text "${cta}". The button should have:
- Background color: ${ctaColor ? `Use ${ctaColor} as the primary button color (this matches the brand colors detected from the image)` : "A semi-transparent dark or white background (whichever contrasts better with the image)"}
- Rounded corners (pill-shaped)
- Modern sans-serif typography in ${ctaColor ? "white or dark text (whichever contrasts better with the button color)" : "contrasting color"}
- Subtle shadow for depth
- Positioned in the lower third of the image
- The button should look professional and not obstruct the main subject.`
      : "";

    // Ads Style instructions
    const adsStyleInstructions: Record<string, string> = {
      "clean-frame": `\n\nADS STYLE - CLEAN FRAME: Add a subtle, elegant frame around the image. Use a thin white or dark border (whichever contrasts better) with softly rounded corners. The frame should be minimal and refined, giving a polished, professional look without distracting from the content.`,
      "soft-gradient": `\n\nADS STYLE - SOFT GRADIENT: Apply a gentle, semi-transparent gradient overlay at the edges of the image. The gradient should fade from a complementary color (derived from the image's palette) towards transparency at the center. This creates depth and visual interest while keeping the main subject clear.`,
      "promo-badge": `\n\nADS STYLE - PROMO BADGE: Add a modern promotional badge in the top-right or top-left corner of the image. The badge should say "SALE" or "NEW" in bold, clean typography. Use a vibrant accent color (red, orange, or brand-matching) with white text. The badge should be angled slightly and have a modern 2025 aesthetic with subtle shadow.`,
      "highlight-glow": `\n\nADS STYLE - HIGHLIGHT GLOW: Add a soft, subtle glow effect around the main subject or product in the image. The glow should be a warm or complementary color that enhances the subject without overpowering it. This creates a premium, eye-catching effect perfect for product showcases.`,
      "minimal-shadow": `\n\nADS STYLE - MINIMAL SHADOW BANNER: Add an elegant gradient shadow at the bottom of the image, fading from semi-transparent dark/black at the bottom edge to fully transparent about 1/4 up the image. This creates space for text overlays and gives a sophisticated, modern advertising look.`,
    };

    const styleInstruction = adsStyle && adsStyleInstructions[adsStyle] ? adsStyleInstructions[adsStyle] : "";

    // Use different models based on quality mode
    const modelToUse = mode === "high-quality" 
      ? "gemini-3-pro-image-preview" 
      : "gemini-2.5-flash-image";

    console.log(`Starting format generation (${mode} mode, model: ${modelToUse}, CTA: ${cta || 'none'}, CTA Color: ${ctaColor || 'auto'}, Style: ${adsStyle || 'none'}) for: ${selectedFormats.join(", ")}`);
    
    // Extract base64 data from masterImage if it's a data URL
    let imageData = masterImage;
    let mimeType = "image/png";
    
    if (masterImage.startsWith("data:")) {
      const matches = masterImage.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        imageData = matches[2];
      }
    }

    // Helper function to retry on transient errors
    const fetchWithRetry = async (url: string, options: RequestInit, maxRetries = 3): Promise<Response> => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const response = await fetch(url, options);
        
        // Retry on 503 (overloaded) or 429 (rate limit)
        if ((response.status === 503 || response.status === 429) && attempt < maxRetries) {
          const delay = attempt * 2000; // 2s, 4s, 6s
          console.log(`API returned ${response.status}, retrying in ${delay}ms (attempt ${attempt}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        return response;
      }
      throw new Error("Max retries exceeded");
    };

    // Generate all formats in parallel
    const generateFormat = async (ratio: FormatKey): Promise<[FormatKey, string | null]> => {
      const config = formatConfigs[ratio];
      if (!config) {
        console.error(`Unknown format: ${ratio}`);
        return [ratio, null];
      }

      try {
        console.log(`Generating ${ratio} (${config.width}x${config.height}) in ${mode} mode...`);

        const isHighQuality = mode === "high-quality";

        const highQualityPrompt = `CRITICAL INSTRUCTION: Generate a NEW image with EXACTLY ${config.aspectRatio} aspect ratio (${config.width}x${config.height} pixels).

Analyze the reference image carefully. Your task is to recreate this exact scene adapted to a ${config.aspectRatio} format while maintaining:

STRICT REQUIREMENTS:
1. ASPECT RATIO: The output MUST be exactly ${config.aspectRatio} (${config.width}x${config.height}px) - this is non-negotiable
2. VISUAL CONSISTENCY: Preserve exact colors, lighting conditions, shadows, and visual style
3. SUBJECT INTEGRITY: The main subject must remain centered, complete, and undistorted
4. NATURAL EXTENSION: Intelligently extend the background/environment to fill the ${config.aspectRatio} canvas
5. SEAMLESS BLENDING: Any extended areas must blend naturally with the original composition
6. QUALITY: Maintain high resolution and sharp details throughout

Generate a professional-quality ${config.aspectRatio} image now.${styleInstruction}${ctaInstruction}`;

        const fastModePrompt = `Create a ${config.aspectRatio} version (${config.width}x${config.height}px) of this image. Keep the main subject centered and extend the background naturally to fit the new format.${styleInstruction}${ctaInstruction}`;

        const prompt = isHighQuality ? highQualityPrompt : fastModePrompt;

        const requestBody = {
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: imageData,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
          },
        };

        const response = await fetchWithRetry(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${googleApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          },
          3
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error for ${ratio}:`, errorText);
          return [ratio, null];
        }

        const data = await response.json();
        
        // Extract image from Google's response format
        const parts = data.candidates?.[0]?.content?.parts || [];
        let generatedImageUrl = null;

        for (const part of parts) {
          if (part.inlineData?.mimeType?.startsWith("image/")) {
            generatedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }

        if (generatedImageUrl) {
          console.log(`${ratio} done successfully`);
          return [ratio, generatedImageUrl];
        } else {
          console.error(`No image returned for ${ratio}`, JSON.stringify(data));
          return [ratio, null];
        }
      } catch (e) {
        console.error(`Error ${ratio}:`, e);
        return [ratio, null];
      }
    };

    // Run all generations in parallel
    const results = await Promise.all(
      (selectedFormats as FormatKey[]).map(ratio => generateFormat(ratio))
    );

    // Build formats object from results
    const formats: Partial<Record<FormatKey, string>> = {};
    for (const [ratio, url] of results) {
      if (url) {
        formats[ratio] = url;
      }
    }

    console.log(`Generation complete. Formats generated: ${Object.keys(formats).join(", ")}`);
    return new Response(JSON.stringify({ formats }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", message);
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
