
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Acordo {
  id: string;
  titulo: string;
  descricao: string;
  status: 'em_andamento' | 'concluido' | 'aguardando' | 'cancelado';
  progresso: number;
  criado_em: string;
}

export default function Acordo() {
  const { user } = useAuth();
  const [filtro, setFiltro] = useState<string>("todos");

  const { data: acordos, isLoading } = useQuery({
    queryKey: ["acordos"],
    queryFn: async () => {
      if (!user) throw new Error("Usuário não autenticado");
      
      const { data, error } = await supabase
        .from("acordos")
        .select("*")
        .eq("usuario_id", user.id)
        .order("criado_em", { ascending: false });
      
      if (error) throw error;
      return data as Acordo[];
    },
  });

  const acordosFiltrados = acordos?.filter((acordo) => {
    if (filtro === "todos") return true;
    return acordo.status === filtro;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em_andamento":
        return "bg-blue-100 text-blue-800";
      case "concluido":
        return "bg-green-100 text-green-800";
      case "aguardando":
        return "bg-yellow-100 text-yellow-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "em_andamento":
        return "Em andamento";
      case "concluido":
        return "Concluído";
      case "aguardando":
        return "Aguardando";
      case "cancelado":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Acordos</h1>
        <p className="text-muted-foreground">Gerencie seus acordos e acompanhe o progresso</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={filtro === "todos" ? "default" : "outline"} 
          onClick={() => setFiltro("todos")}
          className="text-sm"
        >
          Todos
        </Button>
        <Button 
          variant={filtro === "em_andamento" ? "default" : "outline"} 
          onClick={() => setFiltro("em_andamento")}
          className="text-sm"
        >
          Em andamento
        </Button>
        <Button 
          variant={filtro === "concluido" ? "default" : "outline"} 
          onClick={() => setFiltro("concluido")}
          className="text-sm"
        >
          Concluídos
        </Button>
        <Button 
          variant={filtro === "aguardando" ? "default" : "outline"} 
          onClick={() => setFiltro("aguardando")}
          className="text-sm"
        >
          Aguardando
        </Button>
        <Button 
          variant={filtro === "cancelado" ? "default" : "outline"} 
          onClick={() => setFiltro("cancelado")}
          className="text-sm"
        >
          Cancelados
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <Spinner size="lg" />
        </div>
      ) : acordosFiltrados && acordosFiltrados.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {acordosFiltrados.map((acordo) => (
            <Card key={acordo.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle>{acordo.titulo}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {acordo.descricao || "Sem descrição"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(acordo.status)}`}>
                    {getStatusText(acordo.status)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Progresso: {acordo.progresso}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-acordo-500 h-2 rounded-full" 
                    style={{ width: `${acordo.progresso}%` }}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">Ver detalhes</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center">
          <p className="text-lg font-medium mb-2">Nenhum acordo encontrado</p>
          <p className="text-muted-foreground mb-4">
            Comece criando seu primeiro acordo para gerenciar suas negociações.
          </p>
          <Button>Criar novo acordo</Button>
        </Card>
      )}
    </MainLayout>
  );
}
