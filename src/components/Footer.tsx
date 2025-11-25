import { Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Legal Information */}
          <div className="text-sm text-muted-foreground space-y-4">
            <p>
              A RecargaPay é uma instituição de Pagamento conforme normas do Banco Central, emissora de moeda eletrônica que gerencia contas de pagamento do tipo pré-paga e pós-paga.
            </p>
            <p>
              CNPJ: 11.276.560/0001-75. Endereço: Avenida Brigadeiro Faria Lima, nº 4055, 1º andar, sala 1-11L, Espaço WeWork - Sala RecargaPay, Itaim Bibi, São Paulo/SP, CEP 04538-133.
            </p>
            <p>
              Copyright ©2025 RecargaPay Instituição de Pagamento Ltda. Todos os direitos reservados.
            </p>
          </div>

          {/* Awards Section */}
          <div className="pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Experiência do cliente que é reconhecida!
            </h3>
            <div className="flex flex-wrap gap-4 items-center opacity-60">
              <div className="w-12 h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
