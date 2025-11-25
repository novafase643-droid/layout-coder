import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    id: '',
    approved_amount: '',
    adhesion_fee: '',
    pix_key: '',
    pix_qr_code_url: '',
    pix_copy_paste: '',
  });
  const [applications, setApplications] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/');
      toast.error('Acesso negado');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchSettings();
      fetchApplications();
    }
  }, [isAdmin]);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from('admin_settings')
      .select('*')
      .single();
    
    if (data) {
      setSettings({
        id: data.id,
        approved_amount: data.approved_amount.toString(),
        adhesion_fee: data.adhesion_fee.toString(),
        pix_key: data.pix_key || '',
        pix_qr_code_url: data.pix_qr_code_url || '',
        pix_copy_paste: data.pix_copy_paste || '',
      });
    }
  };

  const fetchApplications = async () => {
    const { data } = await supabase
      .from('loan_applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setApplications(data);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('admin_settings')
        .update({
          approved_amount: parseFloat(settings.approved_amount),
          adhesion_fee: parseFloat(settings.adhesion_fee),
          pix_key: settings.pix_key,
          pix_qr_code_url: settings.pix_qr_code_url,
          pix_copy_paste: settings.pix_copy_paste,
        })
        .eq('id', settings.id);

      if (error) throw error;

      toast.success('Configurações salvas com sucesso!');
    } catch (error: any) {
      toast.error('Erro ao salvar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Painel Administrativo</h1>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Configurações</h2>
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="approved_amount">Valor Aprovado (R$)</Label>
                  <Input
                    id="approved_amount"
                    type="number"
                    step="0.01"
                    value={settings.approved_amount}
                    onChange={(e) => setSettings({ ...settings, approved_amount: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adhesion_fee">Taxa de Adesão (R$)</Label>
                  <Input
                    id="adhesion_fee"
                    type="number"
                    step="0.01"
                    value={settings.adhesion_fee}
                    onChange={(e) => setSettings({ ...settings, adhesion_fee: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pix_key">Chave PIX</Label>
                  <Input
                    id="pix_key"
                    value={settings.pix_key}
                    onChange={(e) => setSettings({ ...settings, pix_key: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pix_qr_code_url">URL do QR Code PIX</Label>
                  <Input
                    id="pix_qr_code_url"
                    value={settings.pix_qr_code_url}
                    onChange={(e) => setSettings({ ...settings, pix_qr_code_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pix_copy_paste">PIX Copia e Cola</Label>
                  <Input
                    id="pix_copy_paste"
                    value={settings.pix_copy_paste}
                    onChange={(e) => setSettings({ ...settings, pix_copy_paste: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? 'Salvando...' : 'Salvar Configurações'}
                </Button>
              </form>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Estatísticas</h2>
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total de Solicitações</p>
                  <p className="text-3xl font-bold">{applications.length}</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Aprovadas</p>
                  <p className="text-3xl font-bold">
                    {applications.filter(a => a.status === 'approved').length}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Aguardando Pagamento</p>
                  <p className="text-3xl font-bold">
                    {applications.filter(a => a.status === 'payment_pending').length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Solicitações Recentes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Nome</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">CPF</th>
                    <th className="text-left p-3">Valor</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b">
                      <td className="p-3">{app.name}</td>
                      <td className="p-3">{app.email}</td>
                      <td className="p-3">{app.cpf}</td>
                      <td className="p-3">R$ {app.approved_amount.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          app.status === 'approved' ? 'bg-green-100 text-green-800' :
                          app.status === 'payment_pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3">
                        {new Date(app.created_at).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
