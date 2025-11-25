import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md font-bold text-lg">
              R
            </div>
            <span className="font-bold text-lg text-foreground">RecargaPay</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#para-voce" className="text-foreground hover:text-accent transition-colors">
              Para você
            </a>
            <a href="#seu-negocio" className="text-foreground hover:text-accent transition-colors">
              Seu negócio
            </a>
            <a href="#planos" className="text-foreground hover:text-accent transition-colors">
              Planos
            </a>
            <a href="#ajuda" className="text-foreground hover:text-accent transition-colors">
              Ajuda
            </a>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost">Entrar</Button>
            <Button variant="cta" size="lg">
              Faça seu empréstimo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a href="#para-voce" className="block text-foreground hover:text-accent transition-colors">
              Para você
            </a>
            <a href="#seu-negocio" className="block text-foreground hover:text-accent transition-colors">
              Seu negócio
            </a>
            <a href="#planos" className="block text-foreground hover:text-accent transition-colors">
              Planos
            </a>
            <a href="#ajuda" className="block text-foreground hover:text-accent transition-colors">
              Ajuda
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="ghost" className="w-full">Entrar</Button>
              <Button variant="cta" className="w-full">
                Faça seu empréstimo
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
