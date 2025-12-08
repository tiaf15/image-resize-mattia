import { memo } from "react";
import { Layers } from "lucide-react";

const Footer = memo(function Footer() {
  return (
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
  );
});

export default Footer;
