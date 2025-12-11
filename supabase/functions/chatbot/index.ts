import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Sei l'assistente virtuale di AdsImagePack, una piattaforma che genera automaticamente immagini per annunci pubblicitari in diversi formati (1:1, 4:5, 9:16, 16:9) usando l'intelligenza artificiale.

CONTESTO AZIENDALE:
- AdsImagePack trasforma una singola immagine in tutti i formati necessari per le piattaforme social (Instagram, TikTok, YouTube, Facebook, LinkedIn)
- Utilizza AI per estendere intelligentemente le immagini mantenendo coerenza visiva

PIANI DISPONIBILI:
1. FREE (€0/mese): 10 Ads Packs/mese, solo PNG, un formato per generazione, supporto base
2. PREMIUM (€19/mese - Più popolare): 150 Ads Packs/mese, tutti i formati, PNG+JPG+WEBP, CTA overlay, Ads Styles, Safe Zones, adattamento colori brand, elaborazione veloce, no watermark
3. AGENCY (€49/mese): Ads Packs illimitati, rendering prioritario, tutti i formati export, CTA personalizzate, team access (coming soon), batch upload (coming soon), supporto prioritario

FUNZIONALITÀ:
- CTA Overlays: aggiunge pulsanti call-to-action alle immagini
- Ads Styles: stili grafici predefiniti per annunci (Clean Frame, Soft Gradient, Promo Badge, Highlight Glow, Minimal Shadow)
- Safe Zones: mostra le aree sicure per ogni piattaforma
- Brand Color Adaptation: estrae e usa i colori del brand dall'immagine

INFORMAZIONI IMPORTANTI:
- Tutti i piani includono 7 giorni di prova gratuita
- Nessuna carta di credito richiesta per iniziare
- Puoi fare upgrade, downgrade o cancellare in qualsiasi momento
- Privacy-first: le immagini vengono eliminate automaticamente dopo l'elaborazione

REGOLE:
1. Rispondi SOLO a domande relative ad AdsImagePack e alle sue funzionalità
2. Se l'utente chiede qualcosa non correlato alla piattaforma, rispondi gentilmente che puoi aiutarlo solo con domande su AdsImagePack
3. Sii sempre cortese, professionale e conciso
4. Usa l'italiano come lingua principale, ma rispondi nella lingua dell'utente
5. Se non conosci una risposta specifica, suggerisci di contattare il supporto`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) throw new Error("LOVABLE_API_KEY not configured");

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Messages array is required");
    }

    console.log("[CHATBOT] Processing request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[CHATBOT] AI API error:", errorText);
      throw new Error("Failed to get AI response");
    }

    console.log("[CHATBOT] Streaming response");
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[CHATBOT] Error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
