import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Layers, 
  Zap, 
  Shield, 
  Target, 
  Sparkles, 
  Users, 
  Rocket 
} from "lucide-react";
import { Header, Footer } from "@/components/landing";

const differentiators = [
  { icon: Sparkles, text: "AI-powered format adaptation" },
  { icon: Target, text: "Consistent visuals across all platforms" },
  { icon: Shield, text: "Privacy-first architecture (no storage)" },
  { icon: Zap, text: "Instant results" },
  { icon: Layers, text: "Built for real advertising workflows" },
  { icon: Users, text: "Simple for beginners, powerful for professionals" },
];

const About = memo(function About() {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Empowering creators and marketers, one image at a time
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            AdsImagePack was built to make visual production effortless. One image becomes every format you need—instantly, intelligently, and with zero complexity.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-6 bg-background/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Our Mission
          </h2>
          <div className="glass rounded-2xl p-8 md:p-12">
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Our mission is to remove the friction from creative production. 
              We believe anyone should be able to create platform-ready visuals 
              without design tools, resizing struggles, or inconsistent branding.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Built AdsImagePack */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why We Built AdsImagePack
          </h2>
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0" />
              <p className="text-lg text-muted-foreground">
                Creators waste hours adapting images for different platforms
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0" />
              <p className="text-lg text-muted-foreground">
                Advertisers struggle with maintaining consistent formats
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0" />
              <p className="text-lg text-muted-foreground">
                Agencies lose valuable time generating variants manually
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0" />
              <p className="text-lg text-muted-foreground">
                Existing tools are slow, manual, or simply not built for ads
              </p>
            </div>
          </div>
          <p className="text-2xl font-semibold text-foreground text-center">
            We wanted to fix that.
          </p>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-6 bg-background/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((item, index) => (
              <div 
                key={index} 
                className="glass rounded-xl p-6 flex items-center gap-4 hover:bg-background/60 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-foreground font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Our Vision
          </h2>
          <div className="glass rounded-2xl p-8 md:p-12">
            <Rocket className="w-12 h-12 text-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're building the future of automated creative production. 
              AdsImagePack will grow into a full creative engine for ads, creators, and teams—expanding into templates, batch workflows, brand kits, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Behind the Product */}
      <section className="py-20 px-6 bg-background/30">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Behind the Product
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AdsImagePack was created by a small independent team passionate about AI, design automation, and marketing performance. We move fast, listen to our users, and improve the product every week.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to create faster?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start your free trial today — no credit card required.
          </p>
          <Link to="/tool">
            <Button variant="accent" size="lg" className="text-lg px-8 py-6">
              Try AdsImagePack for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
});

export default About;
