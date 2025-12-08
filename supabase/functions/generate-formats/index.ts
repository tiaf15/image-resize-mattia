import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const formatConfigs = [
  { ratio: "1:1", size: "1024x1024" },
  { ratio: "4:5", size: "1024x1024" },
  { ratio: "9:16", size: "1024x1536" },
  { ratio: "16:9", size: "1536x1024" },
];

const outpaintingPrompt = "Keep the image exactly identical in composition, subjects, colors and style. Only change the aspect ratio by adapting the image to the new format. Do not add new elements. Do not modify the subject. Only perform the outpainting necessary to complete the new format.";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAIApiKey) throw new Error("OPENAI_API_KEY not configured");

    const { masterImage } = await req.json();
    if (!masterImage) throw new Error("Master image is required");

    console.log("Starting format generation...");
    const formats: Record<string, string> = {};

    for (const config of formatConfigs) {
      try {
        console.log(`Generating ${config.ratio}...`);
        const base64Data = masterImage.split(",")[1];
        const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
        const blob = new Blob([binaryData], { type: "image/png" });

        const formData = new FormData();
        formData.append("image", blob, "image.png");
        formData.append("model", "gpt-image-1");
        formData.append("prompt", `${outpaintingPrompt} Format: ${config.ratio}`);
        formData.append("size", config.size);

        const response = await fetch("https://api.openai.com/v1/images/edits", {
          method: "POST",
          headers: { "Authorization": `Bearer ${openAIApiKey}` },
          body: formData,
        });

        if (!response.ok) {
          console.error(`Error for ${config.ratio}:`, await response.text());
          formats[config.ratio] = masterImage;
          continue;
        }

        const data = await response.json();
        formats[config.ratio] = `data:image/png;base64,${data.data[0].b64_json}`;
        console.log(`${config.ratio} done`);
      } catch (e) {
        console.error(`Error ${config.ratio}:`, e);
        formats[config.ratio] = masterImage;
      }
    }

    return new Response(JSON.stringify({ formats }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", message);
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});