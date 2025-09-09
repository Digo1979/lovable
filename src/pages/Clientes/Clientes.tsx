
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { ClientForm } from "./components/ClientForm";
import { formatCNPJ, formatPhone, formatCEP } from "@/lib/formatters";
import { toast } from "sonner";

interface Client {
  id: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  nome_responsavel: string;
  email: string;
  telefone_celular: string;
  status: string;
  cidade: string;
  uf: string;
  data_cadastro: string;
}

export default function Clientes() {
  const { user } = useAuth();
  const [filtro, setFiltro] = useState<string>("todos");
  const [busca, setBusca] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const { data: clients, isLoading, refetch } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      if (!user) throw new Error("Usuário não autenticado");
      
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("usuario_id", user.id)
        .order("data_cadastro", { ascending: false });
      
      if (error) throw error;
      return data as Client[];
    },
  });

  const clientesFiltrados = clients?.filter((client) => {
    const matchesFiltro = filtro === "todos" || client.status.toLowerCase() === filtro.toLowerCase();
    const matchesBusca = !busca || 
      client.razao_social.toLowerCase().includes(busca.toLowerCase()) ||
      client.nome_fantasia.toLowerCase().includes(busca.toLowerCase()) ||
      client.cnpj.includes(busca) ||
      client.nome_responsavel.toLowerCase().includes(busca.toLowerCase());
    
    return matchesFiltro && matchesBusca;
  });

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleDelete = async (clientId: string) => {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
    
    try {
      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", clientId);
      
      if (error) throw error;
      
      toast.success("Cliente excluído com sucesso!");
      refetch();
    } catch (error: any) {
      toast.error("Erro ao excluir cliente: " + error.message);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingClient(null);
    refetch();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ativo":
        return "bg-green-100 text-green-800";
      case "inativo":
        return "bg-gray-100 text-gray-800";
      case "suspenso":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (showForm) {
    return (
      <MainLayout>
        <ClientForm 
          client={editingClient} 
          onClose={handleFormClose}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Clientes</h1>
            <p className="text-muted-foreground">Gerencie seus clientes e informações cadastrais</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por razão social, nome fantasia, CNPJ ou responsável..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filtro} onValueChange={setFiltro}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="suspenso">Suspenso</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <Spinner size="lg" />
        </div>
      ) : clientesFiltrados && clientesFiltrados.length > 0 ? (
        <div className="grid gap-4">
          {clientesFiltrados.map((client) => (
            <Card key={client.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{client.razao_social}</CardTitle>
                    <CardDescription className="mt-1">
                      {client.nome_fantasia} • CNPJ: {formatCNPJ(client.cnpj)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(client)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(client.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Responsável</p>
                    <p className="text-sm">{client.nome_responsavel}</p>
                    {client.telefone_celular && (
                      <p className="text-sm text-gray-500">{formatPhone(client.telefone_celular)}</p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-600">Localização</p>
                    <p className="text-sm">
                      {client.cidade && client.uf ? `${client.cidade} - ${client.uf}` : "Não informado"}
                    </p>
                    {client.email && (
                      <p className="text-sm text-gray-500">{client.email}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        Cadastrado em {new Date(client.data_cadastro).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center">
          <p className="text-lg font-medium mb-2">Nenhum cliente encontrado</p>
          <p className="text-muted-foreground mb-4">
            {busca || filtro !== "todos" 
              ? "Tente ajustar os filtros ou busca." 
              : "Comece criando seu primeiro cliente."}
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </Card>
      )}
    </MainLayout>
  );
}