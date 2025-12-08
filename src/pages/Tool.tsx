import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Sparkles, ArrowLeft, Layers, ImageIcon, Loader2, X, Zap, Crown } from "lucide-react";
import ResultsSection from "@/components/ResultsSection";
import FormatPreview from "@/components/FormatPreview";

type FormatKey = "1:1" | "4:5" | "9:16" | "16:9";

interface GeneratedFormats {
  "1:1"?: string;
  "4:5"?: string;
  "9:16"?: string;
  "16:9"?: string;
}

const availableFormats: { key: FormatKey; label: string; size: string; use: string }[] = [
  { key: "1:1", label: "1:1", size: "1080×1080", use: "Instagram Post, Facebook" },
  { key: "4:5", label: "4:5", size: "1080×1350", use: "Instagram Feed" },
  { key: "9:16", label: "9:16", size: "1080×1920", use: "Stories, Reels, TikTok" },
  { key: "16:9", label: "16:9", size: "1920×1080", use: "YouTube, LinkedIn, Twitter" },
];

type GenerationMode = "high-quality" | "fast";

export default function Tool() {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGeneratingMaster, setIsGeneratingMaster] = useState(false);
  const [isGeneratingFormats, setIsGeneratingFormats] = useState(false);
  const [masterImage, setMasterImage] = useState<string | null>(null);
  const [generatedFormats, setGeneratedFormats] = useState<GeneratedFormats | null>(null);
  const [generationTime, setGenerationTime] = useState<number | null>(null);
  const [selectedFormats, setSelectedFormats] = useState<FormatKey[]>([]);
  const [generationMode, setGenerationMode] = useState<GenerationMode>("high-quality");
  const { toast } = useToast();

  const handleFormatToggle = (format: FormatKey) => {
    setSelectedFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

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
      toast({ title: "Prompt required", description: "Enter a description to generate the image", variant: "destructive" });
      return;
    }

    setIsGeneratingMaster(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-master", { body: { prompt } });
      if (error) throw error;
      if (data?.image) {
        setMasterImage(data.image);
        setUploadedImage(null);
        toast({ title: "Image generated!", description: "Now you can generate the pack for all formats" });
      }
    } catch (error: unknown) {
      console.error("Error generating master:", error);
      toast({ title: "Generation error", description: error instanceof Error ? error.message : "An error occurred", variant: "destructive" });
    } finally {
      setIsGeneratingMaster(false);
    }
  };

  const handleGenerateFormats = async () => {
    if (!masterImage) {
      toast({ title: "Image required", description: "Upload or generate an image before proceeding", variant: "destructive" });
      return;
    }

    if (selectedFormats.length === 0) {
      toast({ title: "No formats selected", description: "Please select at least one format to generate", variant: "destructive" });
      return;
    }

    setIsGeneratingFormats(true);
    setGenerationTime(Date.now());

    try {
      const { data, error } = await supabase.functions.invoke("generate-formats", {
        body: { masterImage, selectedFormats, mode: generationMode },
      });
      if (error) throw error;
      if (data?.formats) {
        setGeneratedFormats(data.formats);
        toast({ title: "Ads Pack generated!", description: `${Object.keys(data.formats).length} format(s) ready for download` });
      }
    } catch (error: unknown) {
      console.error("Error generating formats:", error);
      toast({ title: "Generation error", description: error instanceof Error ? error.message : "An error occurred", variant: "destructive" });
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
    setSelectedFormats([]);
  };

  return (
    <div className="min-h-screen bg-background">
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
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Generate Your Ads Pack</h1>
          <p className="text-muted-foreground text-lg">Upload an image or generate one with AI, then get all formats</p>
        </div>

        {!generatedFormats ? (
          <>
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="upload" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </TabsTrigger>
                  <TabsTrigger value="generate" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Generate with AI
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-0">
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer relative"
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    <input id="file-input" type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
                    {uploadedImage ? (
                      <div className="relative inline-block">
                        <img src={uploadedImage} alt="Uploaded" className="max-h-64 rounded-lg mx-auto" />
                        <button
                          onClick={(e) => { e.stopPropagation(); setUploadedImage(null); setMasterImage(null); }}
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
                        <p className="text-foreground font-medium mb-2">Drag and drop your image here</p>
                        <p className="text-muted-foreground text-sm">or click to select a file</p>
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="generate" className="mt-0 space-y-4">
                  <Textarea
                    placeholder="Describe the image you want to generate... E.g., 'A modern office with green plants and natural light, minimalist style'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                  <Button onClick={handleGenerateMaster} disabled={isGeneratingMaster || !prompt.trim()} className="w-full" variant="premium">
                    {isGeneratingMaster ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Generate Master Image</>
                    )}
                  </Button>

                  {masterImage && !uploadedImage && (
                    <div className="mt-6 text-center">
                      <p className="text-sm text-muted-foreground mb-3">Generated image:</p>
                      <div className="relative inline-block">
                        <img src={masterImage} alt="Generated" className="max-h-64 rounded-lg mx-auto" />
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

            {/* Generation Mode */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Generation Mode</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setGenerationMode("high-quality")}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                    generationMode === "high-quality"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    generationMode === "high-quality" ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <Crown className={`w-5 h-5 ${generationMode === "high-quality" ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-foreground block mb-1">High Quality</span>
                    <p className="text-sm text-muted-foreground">
                      Maximum visual accuracy and consistency. Uses detailed AI guidance for best results.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setGenerationMode("fast")}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                    generationMode === "fast"
                      ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    generationMode === "fast" ? "bg-accent/20" : "bg-muted"
                  }`}>
                    <Zap className={`w-5 h-5 ${generationMode === "fast" ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-foreground block mb-1">Fast Mode</span>
                    <p className="text-sm text-muted-foreground">
                      Quicker output with lighter processing. Good for previews and cost optimization.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Format Selection */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Select Formats to Generate</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableFormats.map((format) => (
                  <label
                    key={format.key}
                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedFormats.includes(format.key)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Checkbox
                      checked={selectedFormats.includes(format.key)}
                      onCheckedChange={() => handleFormatToggle(format.key)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{format.label}</span>
                        <span className="text-sm text-muted-foreground">({format.size})</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{format.use}</p>
                    </div>
                  </label>
                ))}
              </div>
              {selectedFormats.length === 0 && (
                <p className="text-sm text-muted-foreground mt-4 text-center">Select at least one format to generate</p>
              )}
            </div>

            {/* Format Preview */}
            <FormatPreview selectedFormats={selectedFormats} />

            <div className="text-center">
              <Button
                onClick={handleGenerateFormats}
                disabled={!masterImage || isGeneratingFormats || selectedFormats.length === 0}
                variant="accent"
                size="xl"
                className="min-w-64"
              >
                {isGeneratingFormats ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Generating Pack...</>
                ) : (
                  <><Layers className="w-5 h-5" /> Generate Ads Pack ({selectedFormats.length})</>
                )}
              </Button>
              {!masterImage && <p className="text-sm text-muted-foreground mt-3">Upload or generate an image to proceed</p>}
            </div>
          </>
        ) : (
          <ResultsSection formats={generatedFormats} generationTime={generationTime} onReset={handleClear} />
        )}

        <div className="mt-12 bg-primary/5 rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            🔒 For your privacy, no images are stored on our servers. All images are automatically deleted after processing.
          </p>
        </div>
      </main>
    </div>
  );
}