import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const LoanForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartLoan = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/solicitar');
    }
  };

  return (
    <section id="form" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
              Empréstimo pessoal na hora
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Confira sua oferta de empréstimo
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Precisa de dinheiro rápido e sem burocracia? No RecargaPay, você solicita seu empréstimo de forma{" "}
            <span className="font-bold text-foreground">100% digital</span> e, após a aprovação,{" "}
            <span className="font-bold text-foreground">recebe o valor na hora</span>. Aproveite condições especiais e contrate seu crédito!
          </p>
          <Button 
            onClick={handleStartLoan} 
            variant="cta" 
            size="lg" 
            className="px-12 py-6 text-lg"
          >
            Solicitar Empréstimo Agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LoanForm;
