import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Sparkles, Download, Shield, Zap, Layers, Crown, Building2, Check, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Demo images - same image adapted to different formats
import demo1x1 from "@/assets/demo-1x1.jpg";
import demo4x5 from "@/assets/demo-4x5.jpg";
import demo9x16 from "@/assets/demo-9x16.jpg";
import demo16x9 from "@/assets/demo-16x9.jpg";

const formats = [
  { ratio: "1:1", size: "1080×1080", use: "Instagram Post, Facebook" },
  { ratio: "4:5", size: "1080×1350", use: "Instagram Feed" },
  { ratio: "9:16", size: "1080×1920", use: "Stories, Reels, TikTok" },
  { ratio: "16:9", size: "1920×1080", use: "YouTube, LinkedIn, Twitter" },
];

const steps = [
  {
    icon: Upload,
    title: "Upload or Generate",
    description: "Upload your image or generate one with AI using a text prompt",
  },
  {
    icon: Sparkles,
    title: "AI Processing",
    description: "Our AI adapts your image to all ad formats using intelligent outpainting",
  },
  {
    icon: Download,
    title: "Download Pack",
    description: "Get all variants in one click, ready for your campaigns",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AdsImagePack</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
          </nav>
          <Link to="/auth">
            <Button variant="accent" size="sm">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            Powered by OpenAI
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            One image,{" "}
            <span className="text-primary">every format</span>{" "}
            for your Ads
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Automatically generate optimized versions for every social platform. 
            Upload or create with AI, download the complete pack in one click.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/auth">
              <Button variant="accent" size="xl" className="w-full sm:w-auto">
                Generate Your Ads Pack
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                How It Works
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Formats Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Supported Formats
            </h2>
            <p className="text-muted-foreground text-lg">
              All the formats you need for your advertising campaigns
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {formats.map((format, index) => {
              // Calculate preview dimensions based on a reference size
              const baseSize = 120;
              const previewSizes: Record<string, { width: number; height: number }> = {
                "1:1": { width: baseSize, height: baseSize },
                "4:5": { width: baseSize * 0.8, height: baseSize },
                "9:16": { width: baseSize * 0.5625, height: baseSize },
                "16:9": { width: baseSize, height: baseSize * 0.5625 },
              };
              
              const size = previewSizes[format.ratio] || { width: baseSize, height: baseSize };
              
              return (
                <div
                  key={format.ratio}
                  className="bg-card rounded-2xl p-6 border border-border hover-lift animate-fade-up flex flex-col"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="h-36 flex items-center justify-center mb-4">
                    <div 
                      className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center border border-primary/30"
                      style={{ 
                        width: `${size.width}px`,
                        height: `${size.height}px`,
                      }}
                    >
                      <span className="text-xl font-bold text-primary">{format.ratio}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">{format.size}</h3>
                  <p className="text-sm text-muted-foreground">{format.use}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-secondary/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Three simple steps to get your Ads Pack
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${0.15 * index}s` }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="w-8 h-8 mx-auto -mt-10 mb-4 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Creators and Advertisers Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Trusted by marketers, agencies, and creators worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Mitchell",
                role: "E-commerce Owner",
                quote: "Finally one tool that gives me every ad format in seconds. Game changer for my store.",
                avatar: "S"
              },
              {
                name: "Marcus Chen",
                role: "Performance Marketer",
                quote: "Our ROAS improved because we test more formats, faster. This tool pays for itself.",
                avatar: "M"
              },
              {
                name: "Elena Rodriguez",
                role: "Social Media Manager",
                quote: "A must-have for anyone creating ads for clients. Saves me hours every week.",
                avatar: "E"
              },
              {
                name: "David Kim",
                role: "Creative Director",
                quote: "The AI outpainting is incredible. No more awkward cropping or stretched images.",
                avatar: "D"
              },
              {
                name: "Lisa Thompson",
                role: "Digital Agency Founder",
                quote: "We scaled our ad production 5x without hiring. Essential for any agency.",
                avatar: "L"
              },
              {
                name: "James Wilson",
                role: "Freelance Designer",
                quote: "Clean, fast, professional. Exactly what I needed for quick turnarounds.",
                avatar: "J"
              }
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-card rounded-2xl p-6 border border-border hover-lift animate-fade-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See It in Action Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See It in Action
            </h2>
            <p className="text-muted-foreground text-lg">
              Upload one image, get perfectly adapted versions for every platform
            </p>
          </div>

          {/* Original to Formats Transformation */}
          <div className="bg-card rounded-2xl border border-border p-8 mb-8 animate-fade-up">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Original Image */}
              <div className="flex-shrink-0 text-center">
                <div className="w-48 h-48 rounded-xl border-2 border-primary/40 mb-3 mx-auto overflow-hidden shadow-lg">
                  <img 
                    src={demo1x1} 
                    alt="Original input image" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-foreground">Input Image</p>
                <p className="text-xs text-muted-foreground">Any size</p>
              </div>

              {/* Arrow */}
              <div className="hidden lg:flex items-center justify-center px-4">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
                  <Sparkles className="w-6 h-6 text-primary" />
                  <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-primary"></div>
                </div>
              </div>
              <div className="lg:hidden py-4">
                <ArrowRight className="w-8 h-8 text-primary rotate-90" />
              </div>

              {/* Output Formats */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                {[
                  { ratio: "1:1", size: "1080×1080", w: 100, h: 100, img: demo1x1 },
                  { ratio: "4:5", size: "1080×1350", w: 80, h: 100, img: demo4x5 },
                  { ratio: "9:16", size: "1080×1920", w: 56, h: 100, img: demo9x16 },
                  { ratio: "16:9", size: "1920×1080", w: 120, h: 68, img: demo16x9 },
                ].map((format) => (
                  <div key={format.ratio} className="text-center">
                    <div 
                      className="rounded-lg border border-primary/30 mx-auto mb-2 overflow-hidden shadow-md"
                      style={{ width: `${format.w}px`, height: `${format.h}px` }}
                    >
                      <img 
                        src={format.img} 
                        alt={`${format.ratio} format example`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-foreground">{format.ratio}</p>
                    <p className="text-xs text-muted-foreground">{format.size}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Overlay Example */}
          <div className="bg-card rounded-2xl border border-border p-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Add CTA Overlays Automatically
              </h3>
              <p className="text-muted-foreground">
                Enhance your ads with customizable call-to-action buttons
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Without CTA */}
              <div className="text-center">
                <div className="w-40 h-40 rounded-xl border border-border mb-3 mx-auto relative overflow-hidden shadow-md">
                  <img 
                    src={demo1x1} 
                    alt="Image without CTA" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Without CTA</p>
              </div>

              <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
              <ArrowRight className="w-6 h-6 text-primary rotate-90 md:hidden" />

              {/* With CTA */}
              <div className="text-center">
                <div className="w-40 h-40 rounded-xl border-2 border-primary/40 mb-3 mx-auto relative overflow-hidden shadow-lg">
                  <img 
                    src={demo1x1} 
                    alt="Image with CTA overlay" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="w-full py-2 px-3 rounded-lg bg-accent text-accent-foreground text-xs font-semibold text-center shadow-lg">
                      Shop Now →
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">With CTA Overlay</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-2xl p-8 border border-border flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Privacy by Design
              </h3>
              <p className="text-muted-foreground">
                For your privacy, no images are stored on our servers. 
                All images are processed in real-time and automatically deleted after download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple Pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className="bg-card rounded-2xl p-6 border border-border animate-fade-up" style={{ animationDelay: "0s" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Free</h3>
                  <p className="text-sm text-muted-foreground">Get started</p>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">€0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  10 Ads Packs/month
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  PNG export only
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Basic support
                </li>
              </ul>
              <Link to="/pricing">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative bg-gradient-to-b from-primary/10 to-accent/5 rounded-2xl p-6 border-2 border-primary shadow-glow animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                Most Popular
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Crown className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Pro</h3>
                  <p className="text-sm text-muted-foreground">For professionals</p>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">€19</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  150 Ads Packs/month
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  All formats + exports
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  CTA, Styles & Safe Zones
                </li>
              </ul>
              <Link to="/pricing">
                <Button variant="accent" size="sm" className="w-full">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Agency Plan */}
            <div className="bg-card rounded-2xl p-6 border border-border animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Agency</h3>
                  <p className="text-sm text-muted-foreground">For teams</p>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">€49</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Unlimited Ads Packs
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Priority rendering
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Team access (soon)
                </li>
              </ul>
              <Link to="/pricing">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/pricing">
              <Button variant="ghost" size="lg">
                View Full Pricing
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Try Free CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                Try AdsImagePack for Free
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Create your first Ads Pack in seconds. No credit card required.
              </p>
              <Link to="/auth">
                <Button 
                  size="xl" 
                  className="bg-background text-foreground hover:bg-background/90 shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-secondary/30">
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
            <AccordionItem value="item-1" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Do you store my images?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No. Your privacy is our priority. All images are processed in real-time and automatically deleted after you download your Ads Pack. We never store your images on our servers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                What formats can I generate?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We support the four most popular ad formats: 1:1 (1080×1080) for Instagram and Facebook posts, 4:5 (1080×1350) for Instagram Feed, 9:16 (1080×1920) for Stories, Reels, and TikTok, and 16:9 (1920×1080) for YouTube, LinkedIn, and Twitter.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Can I use these images for paid advertising?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely! All images generated with AdsImagePack are yours to use for any commercial purpose, including paid advertising campaigns on any platform.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Does the AI change my image?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The AI uses intelligent outpainting to extend your image to fit different aspect ratios. Your original image remains intact at the center, while the AI seamlessly generates matching content around it to fill the new dimensions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                How fast is the generation process?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Most Ads Packs are generated in under 30 seconds. The exact time depends on server load and image complexity, but we optimize for speed so you can iterate quickly on your campaigns.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                What's included in Free vs Pro plan?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The Free plan includes 10 Ads Packs per month with PNG export. Pro unlocks 150 Ads Packs, all export formats (PNG, JPG, WebP), CTA overlays, custom styles, and safe zone previews. Check our pricing page for full details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Can I cancel anytime?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! All our plans are month-to-month with no long-term commitment. You can cancel anytime from your account settings, and you'll retain access until the end of your billing period.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-card rounded-xl border border-border px-6">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Do you support agencies?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! Our Agency plan offers unlimited Ads Packs, priority rendering, and team access (coming soon). It's designed for agencies and teams managing multiple clients and high-volume campaigns.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">AdsImagePack</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 AdsImagePack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}