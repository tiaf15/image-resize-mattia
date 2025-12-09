import { memo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    id: "item-1",
    question: "Do you store my images?",
    answer: "No. Your privacy is our priority. All images are processed in real-time and automatically deleted after you download your Ads Pack. We never store your images on our servers.",
  },
  {
    id: "item-2",
    question: "What formats can I generate?",
    answer: "We support the four most popular ad formats: 1:1 (1080×1080) for Instagram and Facebook posts, 4:5 (1080×1350) for Instagram Feed, 9:16 (1080×1920) for Stories, Reels, and TikTok, and 16:9 (1920×1080) for YouTube, LinkedIn, and Twitter.",
  },
  {
    id: "item-3",
    question: "Can I use these images for paid advertising?",
    answer: "Absolutely! All images generated with AdsImagePack are yours to use for any commercial purpose, including paid advertising campaigns on any platform.",
  },
  {
    id: "item-4",
    question: "Does the AI change my image?",
    answer: "The AI uses intelligent outpainting to extend your image to fit different aspect ratios. Your original image remains intact at the center, while the AI seamlessly generates matching content around it to fill the new dimensions.",
  },
  {
    id: "item-5",
    question: "How fast is the generation process?",
    answer: "Most Ads Packs are generated in under 30 seconds. The exact time depends on server load and image complexity, but we optimize for speed so you can iterate quickly on your campaigns.",
  },
  {
    id: "item-6",
    question: "What's included in Free vs Pro plan?",
    answer: "The Free plan includes 10 Ads Packs per month with PNG export. Pro unlocks 150 Ads Packs, all export formats (PNG, JPG, WebP), CTA overlays, custom styles, and safe zone previews. Check our pricing page for full details.",
  },
  {
    id: "item-7",
    question: "Can I cancel anytime?",
    answer: "Yes! All our plans are month-to-month with no long-term commitment. You can cancel anytime from your account settings, and you'll retain access until the end of your billing period.",
  },
  {
    id: "item-8",
    question: "Do you support agencies?",
    answer: "Yes! Our Agency plan offers unlimited Ads Packs, priority rendering, and team access (coming soon). It's designed for agencies and teams managing multiple clients and high-volume campaigns.",
  },
] as const;

const FAQSection = memo(function FAQSection() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about AdsImagePack
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem 
              key={item.id} 
              value={item.id} 
              className="bg-card rounded-xl border border-border px-6"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
});

export default FAQSection;
