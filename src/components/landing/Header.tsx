import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers } from "lucide-react";

const Header = memo(function Header() {
  return (
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
  );
});

export default Header;
