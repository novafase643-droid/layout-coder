import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    acceptPolicy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptPolicy) {
      toast.error("Por favor, aceite a Política de Privacidade");
      return;
    }

    toast.success("Solicitação enviada com sucesso! Entraremos em contato em breve.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      cpf: "",
      acceptPolicy: false,
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                Empréstimo pessoal na hora
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Confira sua oferta de empréstimo
            </h2>
            <p className="text-muted-foreground text-lg">
              Precisa de dinheiro rápido e sem burocracia? No RecargaPay, você solicita seu empréstimo de forma{" "}
              <span className="font-bold text-foreground">100% digital</span> e, após a aprovação,{" "}
              <span className="font-bold text-foreground">recebe o valor na hora</span>. Aproveite condições especiais e contrate seu crédito!
            </p>
          </div>

          {/* Right Form */}
          <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome*</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder=""
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone*</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00)00000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF*</Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder=""
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="policy"
                  checked={formData.acceptPolicy}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, acceptPolicy: checked as boolean })
                  }
                  required
                />
                <label
                  htmlFor="policy"
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Li e aceito a{" "}
                  <a href="#" className="text-accent hover:underline">
                    Política de Privacidade
                  </a>
                  .
                </label>
              </div>

              <Button type="submit" variant="secondary" size="lg" className="w-full">
                Enviar agora
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanForm;
