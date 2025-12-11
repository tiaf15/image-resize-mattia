import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const googleApiKey = Deno.env.get("GOOGLE_AI_API_KEY");
    if (!googleApiKey) throw new Error("GOOGLE_AI_API_KEY not configured");

    const { prompt } = await req.json();
    if (!prompt) throw new Error("Prompt is required");

    console.log("Generating master image with prompt:", prompt);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${googleApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a high-quality 1:1 square image (1024x1024 pixels) based on this description: ${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Google AI error:", response.status, errorData);
      throw new Error(`Google AI error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Google AI response structure:", JSON.stringify(data, null, 2));

    // Extract image from Google's response format
    const parts = data.candidates?.[0]?.content?.parts || [];
    let generatedImageUrl = null;

    for (const part of parts) {
      if (part.inlineData?.mimeType?.startsWith("image/")) {
        generatedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!generatedImageUrl) {
      console.error("No image returned from Google AI:", JSON.stringify(data));
      throw new Error("No image generated");
    }

    console.log("Master image generated successfully");
    return new Response(JSON.stringify({ image: generatedImageUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in generate-master:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
