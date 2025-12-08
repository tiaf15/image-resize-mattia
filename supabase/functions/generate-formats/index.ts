import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type FormatKey = "1:1" | "4:5" | "9:16" | "16:9";

const formatConfigs: Record<FormatKey, { size: string; width: number; height: number }> = {
  "1:1": { size: "1024x1024", width: 1080, height: 1080 },
  "4:5": { size: "1024x1024", width: 1080, height: 1350 },
  "9:16": { size: "1024x1536", width: 1080, height: 1920 },
  "16:9": { size: "1536x1024", width: 1920, height: 1080 },
};

const outpaintingPrompt = (ratio: string) =>
  `Reframe this image to fit a ${ratio} aspect ratio. Keep the subject, composition, colors, and style exactly identical. Only perform the outpainting or cropping necessary to achieve the new aspect ratio. Do not add new elements or modify the subject.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAIApiKey) throw new Error("OPENAI_API_KEY not configured");

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
        console.log(`Generating ${ratio} (${config.size})...`);
        const base64Data = masterImage.split(",")[1];
        const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
        const blob = new Blob([binaryData], { type: "image/png" });

        const formData = new FormData();
        formData.append("image", blob, "image.png");
        formData.append("model", "gpt-image-1");
        formData.append("prompt", outpaintingPrompt(ratio));
        formData.append("size", config.size);

        const response = await fetch("https://api.openai.com/v1/images/edits", {
          method: "POST",
          headers: { "Authorization": `Bearer ${openAIApiKey}` },
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error for ${ratio}:`, errorText);
          continue;
        }

        const data = await response.json();
        formats[ratio] = `data:image/png;base64,${data.data[0].b64_json}`;
        console.log(`${ratio} done`);
      } catch (e) {
        console.error(`Error ${ratio}:`, e);
      }
    }

    return new Response(JSON.stringify({ formats }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", message);
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
