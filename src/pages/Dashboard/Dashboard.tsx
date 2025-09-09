
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

export default function Dashboard() {
  const { user } = useAuth();
  const [acordosRecentes, setAcordosRecentes] = useState<any[]>([]);
  const [proximasReunioes, setProximasReunioes] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalAcordos: 0,
    acordosConcluidos: 0,
    acordosNegados: 0,
    reunioesAgendadas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch recent agreements
      const { data: acordos, error: acordosError } = await supabase
        .from("acordos")
        .select("*")
        .order("atualizado_em", { ascending: false })
        .limit(4);

      if (acordosError) throw acordosError;
      setAcordosRecentes(acordos || []);

      // Fetch upcoming meetings
      const today = new Date();
      const { data: reunioes, error: reunioesError } = await supabase
        .from("reunioes")
        .select("*")
        .gte("data", today.toISOString())
        .order("data", { ascending: true })
        .limit(3);

      if (reunioesError) throw reunioesError;
      setProximasReunioes(reunioes || []);

      // Calculate statistics
      const { count: totalAcordos, error: totalError } = await supabase
        .from("acordos")
        .select("*", { count: "exact", head: true });

      const { count: acordosConcluidos, error: concluidosError } = await supabase
        .from("acordos")
        .select("*", { count: "exact", head: true })
        .eq("status", "concluido");

        const { count: acordosNegados, error: NegadosError } = await supabase
        .from("acordos")
        .select("*", { count: "exact", head: true })
        .eq("status", "negados");        

      // Get upcoming meetings for the next 7 days
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const { count: reunioesAgendadas, error: reunioesCountError } = await supabase
        .from("reunioes")
        .select("*", { count: "exact", head: true })
        .gte("data", today.toISOString())
        .lte("data", nextWeek.toISOString());

      setStats({
        totalAcordos: totalAcordos || 0,
        acordosConcluidos: acordosConcluidos || 0,
        acordosNegados: acordosNegados || 0,
        reunioesAgendadas: reunioesAgendadas || 0
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('pt-BR', options);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="h-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo à sua plataforma de acordos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total de Acordos</CardTitle>
              <CardDescription>Total de acordos em andamento</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-acordo-500">{stats.totalAcordos}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acordos Concluídos</CardTitle>
              <CardDescription>Total de acordos concluídos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-500">{stats.acordosConcluidos}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acordos Negados</CardTitle>
              <CardDescription>Total de acordos negados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-500">{stats.acordosNegados}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Acordos Recentes</CardTitle>
              <CardDescription>Últimos acordos criados ou atualizados</CardDescription>
            </CardHeader>
            <CardContent>
              {acordosRecentes.length > 0 ? (
                <div className="space-y-4">
                  {acordosRecentes.map((acordo) => (
                    <div key={acordo.id} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{acordo.titulo}</h3>
                        <span 
                          className={`text-xs px-2 py-1 rounded-full ${
                            acordo.status === "concluido" 
                              ? "bg-green-100 text-green-700" 
                              : acordo.status === "em_andamento" 
                              ? "bg-blue-100 text-blue-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {acordo.status === "em_andamento" ? "Em andamento" : 
                           acordo.status === "concluido" ? "Concluído" : 
                           acordo.status === "aguardando" ? "Aguardando" : "Cancelado"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {Array.isArray(acordo.partes) && acordo.partes.length > 0 
                          ? acordo.partes.map((parte: any) => parte.nome).join(", ")
                          : "Sem partes definidas"}
                      </p>
                      <div className="flex items-center gap-2 mb-1">
                        <Progress value={acordo.progresso} className="h-2" />
                        <span className="text-xs">{acordo.progresso}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Atualizado em: {formatDate(acordo.atualizado_em)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum acordo encontrado. Comece criando seu primeiro acordo!</p>
                </div>
              )}
              <div className="mt-4 text-center">
                <a href="#" className="text-sm font-medium text-acordo-500 hover:text-acordo-600">
                  Ver todos
                </a>
              </div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle>Próximas Reuniões</CardTitle>
              <CardDescription>Agenda das próximas reuniões</CardDescription>
            </CardHeader>
            <CardContent>
              {proximasReunioes.length > 0 ? (
                <div className="space-y-4">
                  {proximasReunioes.map((reuniao) => (
                    <div key={reuniao.id} className="flex items-center gap-4 border-b pb-3 last:border-0 last:pb-0">
                      <div className="bg-acordo-100 text-acordo-700 p-3 rounded-lg">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{reuniao.titulo}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(reuniao.data)} às {formatTime(reuniao.data)} • {
                            Array.isArray(reuniao.participantes) ? reuniao.participantes.length : 0
                          } participantes
                        </p>
                      </div>
                      <button className="text-sm font-medium text-acordo-500 hover:text-acordo-600">
                        Entrar
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhuma reunião agendada. Agende sua primeira reunião!</p>
                </div>
              )}
              <div className="mt-4 text-center">
                <a href="/agenda" className="text-sm font-medium text-acordo-500 hover:text-acordo-600">
                  Ver agenda completa
                </a>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </MainLayout>
  );
}
