
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { maskCNPJ, maskPhone, maskCEP, unmaskCNPJ } from "@/lib/formatters";

interface Client {
  id: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  cnae_principal?: string;
  data_abertura?: string;
  natureza_juridica?: string;
  data_inicio_contrato?: string;
  data_encerramento_contrato?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  telefone_fixo?: string;
  telefone_celular?: string;
  email?: string;
  site?: string;
  nome_responsavel: string;
  cargo_responsavel?: string;
  telefone_responsavel?: string;
  email_responsavel?: string;
  status: string;
  observacoes?: string;
}

interface ClientFormProps {
  client?: Client | null;
  onClose: () => void;
}

export function ClientForm({ client, onClose }: ClientFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cnpj: "",
    razao_social: "",
    nome_fantasia: "",
    inscricao_estadual: "",
    inscricao_municipal: "",
    cnae_principal: "",
    data_abertura: "",
    natureza_juridica: "",
    data_inicio_contrato: "",
    data_encerramento_contrato: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    telefone_fixo: "",
    telefone_celular: "",
    email: "",
    site: "",
    nome_responsavel: "",
    cargo_responsavel: "",
    telefone_responsavel: "",
    email_responsavel: "",
    status: "Ativo",
    observacoes: "",
  });

  useEffect(() => {
    if (client) {
      setFormData({
        cnpj: client.cnpj || "",
        razao_social: client.razao_social || "",
        nome_fantasia: client.nome_fantasia || "",
        inscricao_estadual: client.inscricao_estadual || "",
        inscricao_municipal: client.inscricao_municipal || "",
        cnae_principal: client.cnae_principal || "",
        data_abertura: client.data_abertura || "",
        natureza_juridica: client.natureza_juridica || "",
        data_inicio_contrato: client.data_inicio_contrato || "",
        data_encerramento_contrato: client.data_encerramento_contrato || "",
        cep: client.cep || "",
        logradouro: client.logradouro || "",
        numero: client.numero || "",
        complemento: client.complemento || "",
        bairro: client.bairro || "",
        cidade: client.cidade || "",
        uf: client.uf || "",
        telefone_fixo: client.telefone_fixo || "",
        telefone_celular: client.telefone_celular || "",
        email: client.email || "",
        site: client.site || "",
        nome_responsavel: client.nome_responsavel || "",
        cargo_responsavel: client.cargo_responsavel || "",
        telefone_responsavel: client.telefone_responsavel || "",
        email_responsavel: client.email_responsavel || "",
        status: client.status || "Ativo",
        observacoes: client.observacoes || "",
      });
    }
  }, [client]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const dataToSave = {
        ...formData,
        cnpj: unmaskCNPJ(formData.cnpj),
        usuario_id: user.id,
      };

      if (client) {
        const { error } = await supabase
          .from("clients")
          .update(dataToSave)
          .eq("id", client.id);
        
        if (error) throw error;
        toast.success("Cliente atualizado com sucesso!");
      } else {
        const { error } = await supabase
          .from("clients")
          .insert([dataToSave]);
        
        if (error) throw error;
        toast.success("Cliente cadastrado com sucesso!");
      }

      onClose();
    } catch (error: any) {
      toast.error("Erro ao salvar cliente: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const estadosBrasil = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", 
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onClose}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {client ? "Editar Cliente" : "Novo Cliente"}
          </h1>
          <p className="text-muted-foreground">
            {client ? "Altere os dados do cliente" : "Preencha os dados do novo cliente"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="cadastrais" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cadastrais">Dados Cadastrais</TabsTrigger>
            <TabsTrigger value="endereco">Endereço</TabsTrigger>
            <TabsTrigger value="contato">Contato</TabsTrigger>
            <TabsTrigger value="outros">Outros</TabsTrigger>
          </TabsList>

          <TabsContent value="cadastrais">
            <Card>
              <CardHeader>
                <CardTitle>Dados Cadastrais</CardTitle>
                <CardDescription>Informações básicas da empresa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) => handleInputChange("cnpj", maskCNPJ(e.target.value))}
                      placeholder="00.000.000/0000-00"
                      maxLength={18}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="natureza_juridica">Natureza Jurídica</Label>
                    <Select value={formData.natureza_juridica} onValueChange={(value) => handleInputChange("natureza_juridica", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LTDA">LTDA</SelectItem>
                        <SelectItem value="S/A">S/A</SelectItem>
                        <SelectItem value="MEI">MEI</SelectItem>
                        <SelectItem value="EIRELI">EIRELI</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="razao_social">Razão Social *</Label>
                  <Input
                    id="razao_social"
                    value={formData.razao_social}
                    onChange={(e) => handleInputChange("razao_social", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nome_fantasia">Nome Fantasia *</Label>
                  <Input
                    id="nome_fantasia"
                    value={formData.nome_fantasia}
                    onChange={(e) => handleInputChange("nome_fantasia", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inscricao_estadual">Inscrição Estadual</Label>
                    <Input
                      id="inscricao_estadual"
                      value={formData.inscricao_estadual}
                      onChange={(e) => handleInputChange("inscricao_estadual", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inscricao_municipal">Inscrição Municipal</Label>
                    <Input
                      id="inscricao_municipal"
                      value={formData.inscricao_municipal}
                      onChange={(e) => handleInputChange("inscricao_municipal", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cnae_principal">CNAE Principal</Label>
                    <Input
                      id="cnae_principal"
                      value={formData.cnae_principal}
                      onChange={(e) => handleInputChange("cnae_principal", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="data_abertura">Data de Abertura</Label>
                    <Input
                      id="data_abertura"
                      type="date"
                      value={formData.data_abertura}
                      onChange={(e) => handleInputChange("data_abertura", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data_inicio_contrato">Data Início Contrato</Label>
                    <Input
                      id="data_inicio_contrato"
                      type="date"
                      value={formData.data_inicio_contrato}
                      onChange={(e) => handleInputChange("data_inicio_contrato", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="data_encerramento_contrato">Data Encerramento Contrato</Label>
                    <Input
                      id="data_encerramento_contrato"
                      type="date"
                      value={formData.data_encerramento_contrato}
                      onChange={(e) => handleInputChange("data_encerramento_contrato", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endereco">
            <Card>
              <CardHeader>
                <CardTitle>Endereço</CardTitle>
                <CardDescription>Localização da empresa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      value={formData.cep}
                      onChange={(e) => handleInputChange("cep", maskCEP(e.target.value))}
                      placeholder="00000-000"
                      maxLength={9}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="logradouro">Logradouro</Label>
                    <Input
                      id="logradouro"
                      value={formData.logradouro}
                      onChange={(e) => handleInputChange("logradouro", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numero">Número</Label>
                    <Input
                      id="numero"
                      value={formData.numero}
                      onChange={(e) => handleInputChange("numero", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input
                      id="complemento"
                      value={formData.complemento}
                      onChange={(e) => handleInputChange("complemento", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input
                      id="bairro"
                      value={formData.bairro}
                      onChange={(e) => handleInputChange("bairro", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      value={formData.cidade}
                      onChange={(e) => handleInputChange("cidade", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="uf">UF</Label>
                    <Select value={formData.uf} onValueChange={(value) => handleInputChange("uf", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {estadosBrasil.map((estado) => (
                          <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contato">
            <Card>
              <CardHeader>
                <CardTitle>Contato e Responsável</CardTitle>
                <CardDescription>Informações de contato da empresa e responsável</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Contato da Empresa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone_fixo">Telefone Fixo</Label>
                      <Input
                        id="telefone_fixo"
                        value={formData.telefone_fixo}
                        onChange={(e) => handleInputChange("telefone_fixo", maskPhone(e.target.value))}
                        placeholder="(00) 0000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone_celular">Telefone Celular/WhatsApp</Label>
                      <Input
                        id="telefone_celular"
                        value={formData.telefone_celular}
                        onChange={(e) => handleInputChange("telefone_celular", maskPhone(e.target.value))}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail Principal</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="site">Site</Label>
                      <Input
                        id="site"
                        value={formData.site}
                        onChange={(e) => handleInputChange("site", e.target.value)}
                        placeholder="https://www.exemplo.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Responsável na Empresa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome_responsavel">Nome do Responsável *</Label>
                      <Input
                        id="nome_responsavel"
                        value={formData.nome_responsavel}
                        onChange={(e) => handleInputChange("nome_responsavel", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cargo_responsavel">Cargo</Label>
                      <Input
                        id="cargo_responsavel"
                        value={formData.cargo_responsavel}
                        onChange={(e) => handleInputChange("cargo_responsavel", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone_responsavel">Telefone do Responsável</Label>
                      <Input
                        id="telefone_responsavel"
                        value={formData.telefone_responsavel}
                        onChange={(e) => handleInputChange("telefone_responsavel", maskPhone(e.target.value))}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email_responsavel">E-mail do Responsável</Label>
                      <Input
                        id="email_responsavel"
                        type="email"
                        value={formData.email_responsavel}
                        onChange={(e) => handleInputChange("email_responsavel", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outros">
            <Card>
              <CardHeader>
                <CardTitle>Outras Informações</CardTitle>
                <CardDescription>Status e observações gerais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status do Cliente</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                      <SelectItem value="Suspenso">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações Gerais</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange("observacoes", e.target.value)}
                    placeholder="Anotações gerais sobre o cliente..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Salvando..." : client ? "Atualizar" : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
}