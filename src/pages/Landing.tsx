import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Sparkles, Download, Shield, Zap, Layers } from "lucide-react";

const formats = [
  { ratio: "1:1", size: "1080×1080", use: "Instagram Post, Facebook" },
  { ratio: "4:5", size: "1080×1350", use: "Instagram Feed" },
  { ratio: "9:16", size: "1080×1920", use: "Stories, Reels, TikTok" },
  { ratio: "16:9", size: "1920×1080", use: "YouTube, LinkedIn, Twitter" },
];

const steps = [
  {
    icon: Upload,
    title: "Carica o Genera",
    description: "Carica la tua immagine o generala con AI tramite un prompt testuale",
  },
  {
    icon: Sparkles,
    title: "AI Processing",
    description: "La nostra AI adatta l'immagine a tutti i formati pubblicitari con outpainting intelligente",
  },
  {
    icon: Download,
    title: "Scarica il Pack",
    description: "Ottieni tutte le varianti in un click, pronte per le tue campagne",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AdsImagePack</span>
          </div>
          <Link to="/tool">
            <Button variant="accent" size="sm">
              Inizia Ora
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
            Un'immagine,{" "}
            <span className="text-primary">tutti i formati</span>{" "}
            per le tue Ads
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Genera automaticamente versioni ottimizzate per ogni piattaforma social. 
            Carica o crea con AI, scarica il pack completo in un click.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/tool">
              <Button variant="accent" size="xl" className="w-full sm:w-auto">
                Genera il tuo Ads Pack
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Come funziona
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
              Formati Supportati
            </h2>
            <p className="text-muted-foreground text-lg">
              Tutti i formati necessari per le tue campagne pubblicitarie
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {formats.map((format, index) => (
              <div
                key={format.ratio}
                className="bg-card rounded-2xl p-6 border border-border hover-lift animate-fade-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-full aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">{format.ratio}</span>
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-1">{format.size}</h3>
                <p className="text-sm text-muted-foreground">{format.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-secondary/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Come Funziona
            </h2>
            <p className="text-muted-foreground text-lg">
              Tre semplici step per ottenere il tuo Ads Pack
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
                Per la tua privacy, nessuna immagine viene salvata sui nostri server. 
                Tutte le immagini vengono elaborate in tempo reale e eliminate automaticamente dopo il download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pronto a creare il tuo Ads Pack?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Inizia subito, nessuna registrazione richiesta
          </p>
          <Link to="/tool">
            <Button variant="accent" size="xl">
              Inizia Ora — È Gratis
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
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
            © 2025 AdsImagePack. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
}
