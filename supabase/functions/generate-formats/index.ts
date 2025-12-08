import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type FormatKey = "1:1" | "4:5" | "9:16" | "16:9";

const formatConfigs: Record<FormatKey, { width: number; height: number; description: string }> = {
  "1:1": { width: 1080, height: 1080, description: "square 1:1 aspect ratio" },
  "4:5": { width: 1080, height: 1350, description: "vertical 4:5 aspect ratio (taller than wide)" },
  "9:16": { width: 1080, height: 1920, description: "vertical 9:16 aspect ratio (portrait/story format)" },
  "16:9": { width: 1920, height: 1080, description: "horizontal 16:9 aspect ratio (widescreen landscape)" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) throw new Error("LOVABLE_API_KEY not configured");

    const { masterImage, selectedFormats } = await req.json();
    if (!masterImage) throw new Error("Master image is required");
    if (!selectedFormats || !Array.isArray(selectedFormats) || selectedFormats.length === 0) {
      throw new Error("At least one format must be selected");
    }

    console.log(`Starting format generation for: ${selectedFormats.join(", ")}`);
    const formats: Partial<Record<FormatKey, string>> = {};

    for (const ratio of selectedFormats as FormatKey[]) {
      const config = formatConfigs[ratio];
      if (!config) {
        console.error(`Unknown format: ${ratio}`);
        continue;
      }

      try {
        console.log(`Generating ${ratio} (${config.width}x${config.height})...`);

        const prompt = `Reframe and adapt this image to fit a ${config.description} with dimensions ${config.width}x${config.height} pixels. Keep the main subject, colors, style, and mood exactly the same. Only extend or crop the canvas to match the new aspect ratio. Use outpainting to fill any new areas seamlessly while maintaining visual consistency. Do not add new objects or change the subject.`;

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${lovableApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image-preview",
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
          continue;
        }

        const data = await response.json();
        const generatedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (generatedImageUrl) {
          formats[ratio] = generatedImageUrl;
          console.log(`${ratio} done`);
        } else {
          console.error(`No image returned for ${ratio}`);
        }
      } catch (e) {
        console.error(`Error ${ratio}:`, e);
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
