import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Sparkles, Download, Shield, Zap, Layers, Crown, Building2, Check } from "lucide-react";

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

      {/* Privacy Banner */}
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