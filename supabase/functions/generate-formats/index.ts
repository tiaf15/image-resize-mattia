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
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) throw new Error("LOVABLE_API_KEY not configured");

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

    const isHighQuality = mode === "high-quality";
    const modelToUse = isHighQuality ? "google/gemini-3-pro-image-preview" : "google/gemini-2.5-flash-image-preview";

    console.log(`Starting format generation (${mode} mode, model: ${modelToUse}, CTA: ${cta || 'none'}, CTA Color: ${ctaColor || 'auto'}, Style: ${adsStyle || 'none'}) for: ${selectedFormats.join(", ")}`);
    
    // Generate all formats in parallel to avoid timeout
    const generateFormat = async (ratio: FormatKey): Promise<[FormatKey, string | null]> => {
      const config = formatConfigs[ratio];
      if (!config) {
        console.error(`Unknown format: ${ratio}`);
        return [ratio, null];
      }

      try {
        console.log(`Generating ${ratio} (${config.width}x${config.height}) in ${mode} mode...`);

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

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${lovableApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: modelToUse,
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: prompt },
                  { type: "image_url", image_url: { url: masterImage } }
                ]
              }
            ],
            modalities: ["image", "text"]
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error for ${ratio}:`, errorText);
          return [ratio, null];
        }

        const data = await response.json();
        const generatedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

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
