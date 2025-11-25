import { DollarSign, ShieldCheck, Clock, Globe } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Dinheiro na hora",
    description: "Simule, contrate e tenha seu dinheiro na conta na hora.",
  },
  {
    icon: ShieldCheck,
    title: "Sem garantia",
    description: "Operação sem fiador, garantias e burocracia.",
  },
  {
    icon: Clock,
    title: "Pré-aprovado",
    description: "Crédito pré-aprovado simples e disponível para negativados.",
  },
  {
    icon: Globe,
    title: "100% Digital",
    description: "Solicite seu empréstimo totalmente online, simples e rápido.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Dinheiro na conta, com parcelas que cabem no seu bolso.
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
