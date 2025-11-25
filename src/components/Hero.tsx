import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-hero-title">Empréstimo Online:</span>
              <br />
              <span className="text-primary-foreground">rápido e pré-aprovado</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl">
              Solicite seu empréstimo sem garantia no RecargaPay: rápido, 100% digital e com aprovação instantânea.
            </p>
            <Button variant="cta" size="lg" className="group">
              Veja sua oferta
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Mulher feliz usando o aplicativo RecargaPay"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
