import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => navigate('/')} className="text-2xl font-bold text-foreground">
              RecargaPay
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-accent transition-colors">
              Início
            </a>
            <a href="#features" className="text-foreground hover:text-accent transition-colors">
              Vantagens
            </a>
            <a href="#form" className="text-foreground hover:text-accent transition-colors">
              Solicitar
            </a>
            {isAdmin && (
              <button onClick={() => navigate('/admin')} className="text-foreground hover:text-accent transition-colors">
                Admin
              </button>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Button variant="outlineWhite" size="sm" onClick={signOut}>
                Sair
              </Button>
            ) : (
              <>
                <Button variant="outlineWhite" size="sm" onClick={() => navigate('/auth')}>
                  Entrar
                </Button>
                <Button variant="cta" size="sm" onClick={() => navigate('/auth')}>
                  Criar conta
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <a href="#home" className="block text-foreground hover:text-accent transition-colors">
              Início
            </a>
            <a href="#features" className="block text-foreground hover:text-accent transition-colors">
              Vantagens
            </a>
            <a href="#form" className="block text-foreground hover:text-accent transition-colors">
              Solicitar
            </a>
            {isAdmin && (
              <button onClick={() => navigate('/admin')} className="block w-full text-left text-foreground hover:text-accent transition-colors">
                Admin
              </button>
            )}
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <Button variant="outlineWhite" size="sm" onClick={signOut}>
                  Sair
                </Button>
              ) : (
                <>
                  <Button variant="outlineWhite" size="sm" onClick={() => navigate('/auth')}>
                    Entrar
                  </Button>
                  <Button variant="cta" size="sm" onClick={() => navigate('/auth')}>
                    Criar conta
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
