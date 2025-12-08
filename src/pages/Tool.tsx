import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Upload, 
  Sparkles, 
  ArrowLeft, 
  Layers, 
  ImageIcon,
  Loader2,
  X
} from "lucide-react";
import ResultsSection from "@/components/ResultsSection";

interface GeneratedFormats {
  "1:1": string;
  "4:5": string;
  "9:16": string;
  "16:9": string;
}

export default function Tool() {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGeneratingMaster, setIsGeneratingMaster] = useState(false);
  const [isGeneratingFormats, setIsGeneratingFormats] = useState(false);
  const [masterImage, setMasterImage] = useState<string | null>(null);
  const [generatedFormats, setGeneratedFormats] = useState<GeneratedFormats | null>(null);
  const [generationTime, setGenerationTime] = useState<number | null>(null);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setMasterImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setMasterImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleGenerateMaster = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt richiesto",
        description: "Inserisci una descrizione per generare l'immagine",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingMaster(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-master", {
        body: { prompt },
      });

      if (error) throw error;

      if (data?.image) {
        setMasterImage(data.image);
        setUploadedImage(null);
        toast({
          title: "Immagine generata!",
          description: "Ora puoi generare il pack per tutti i formati",
        });
      }
    } catch (error: any) {
      console.error("Error generating master:", error);
      toast({
        title: "Errore nella generazione",
        description: error.message || "Si è verificato un errore",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingMaster(false);
    }
  };

  const handleGenerateFormats = async () => {
    if (!masterImage) {
      toast({
        title: "Immagine richiesta",
        description: "Carica o genera un'immagine prima di procedere",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingFormats(true);
    setGenerationTime(Date.now());

    try {
      const { data, error } = await supabase.functions.invoke("generate-formats", {
        body: { masterImage },
      });

      if (error) throw error;

      if (data?.formats) {
        setGeneratedFormats(data.formats);
        toast({
          title: "Ads Pack generato!",
          description: "Tutte le varianti sono pronte per il download",
        });
      }
    } catch (error: any) {
      console.error("Error generating formats:", error);
      toast({
        title: "Errore nella generazione",
        description: error.message || "Si è verificato un errore",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingFormats(false);
    }
  };

  const handleClear = () => {
    setUploadedImage(null);
    setMasterImage(null);
    setGeneratedFormats(null);
    setPrompt("");
    setGenerationTime(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AdsImagePack</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Torna alla Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Genera il tuo Ads Pack
          </h1>
          <p className="text-muted-foreground text-lg">
            Carica un'immagine o generala con AI, poi ottieni tutti i formati
          </p>
        </div>

        {!generatedFormats ? (
          <>
            {/* Tabs Section */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="upload" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Carica Immagine
                  </TabsTrigger>
                  <TabsTrigger value="generate" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Genera con AI
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-0">
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer relative"
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                    {uploadedImage ? (
                      <div className="relative inline-block">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="max-h-64 rounded-lg mx-auto"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedImage(null);
                            setMasterImage(null);
                          }}
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <ImageIcon className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-foreground font-medium mb-2">
                          Trascina qui la tua immagine
                        </p>
                        <p className="text-muted-foreground text-sm">
                          oppure clicca per selezionare un file
                        </p>
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="generate" className="mt-0 space-y-4">
                  <Textarea
                    placeholder="Descrivi l'immagine che vuoi generare... Es: 'Un moderno ufficio con piante verdi e luce naturale, stile minimalista'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                  <Button
                    onClick={handleGenerateMaster}
                    disabled={isGeneratingMaster || !prompt.trim()}
                    className="w-full"
                    variant="premium"
                  >
                    {isGeneratingMaster ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generazione in corso...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Genera Immagine Master
                      </>
                    )}
                  </Button>

                  {masterImage && !uploadedImage && (
                    <div className="mt-6 text-center">
                      <p className="text-sm text-muted-foreground mb-3">Immagine generata:</p>
                      <div className="relative inline-block">
                        <img
                          src={masterImage}
                          alt="Generated"
                          className="max-h-64 rounded-lg mx-auto"
                        />
                        <button
                          onClick={() => setMasterImage(null)}
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Generate Pack Button */}
            <div className="text-center">
              <Button
                onClick={handleGenerateFormats}
                disabled={!masterImage || isGeneratingFormats}
                variant="accent"
                size="xl"
                className="min-w-64"
              >
                {isGeneratingFormats ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generazione Pack in corso...
                  </>
                ) : (
                  <>
                    <Layers className="w-5 h-5" />
                    Genera Ads Pack
                  </>
                )}
              </Button>
              {!masterImage && (
                <p className="text-sm text-muted-foreground mt-3">
                  Carica o genera un'immagine per procedere
                </p>
              )}
            </div>
          </>
        ) : (
          <ResultsSection
            formats={generatedFormats}
            generationTime={generationTime}
            onReset={handleClear}
          />
        )}

        {/* Privacy Banner */}
        <div className="mt-12 bg-primary/5 rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            🔒 Per la tua privacy, nessuna immagine viene salvata sui nostri server. 
            Tutte le immagini vengono eliminate automaticamente dopo l'elaborazione.
          </p>
        </div>
      </main>
    </div>
  );
}
