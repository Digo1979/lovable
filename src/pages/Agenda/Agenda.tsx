
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

export default function Agenda() {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reunioes, setReunioes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchReunioes();
    }
  }, [user]);

  useEffect(() => {
    if (user && date) {
      fetchReunioesForDate(date);
    }
  }, [date, user]);

  const fetchReunioes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reunioes")
        .select("*")
        .order("data", { ascending: true });

      if (error) throw error;
      setReunioes(data || []);
    } catch (error) {
      console.error("Erro ao buscar reuniões:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReunioesForDate = async (selectedDate: Date) => {
    // No need to show loading spinner for date filter changes
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    try {
      const { data, error } = await supabase
        .from("reunioes")
        .select("*")
        .gte("data", startOfDay.toISOString())
        .lte("data", endOfDay.toISOString())
        .order("data", { ascending: true });

      if (error) throw error;
      setReunioes(data || []);
    } catch (error) {
      console.error("Erro ao buscar reuniões para esta data:", error);
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

  if (loading && reunioes.length === 0) {
    return (
      <MainLayout>
        <div className="h-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  const reunioesDoDia = reunioes;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Agenda</h1>
            <p className="text-muted-foreground">Gerencie suas reuniões e compromissos.</p>
          </div>
          <Button className="bg-acordo-500 hover:bg-acordo-600">
            + Nova Reunião
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Calendário</CardTitle>
                <CardDescription>Selecione uma data para ver os compromissos</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  Compromissos de {date?.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </CardTitle>
                <CardDescription>
                  {reunioesDoDia.length} reuniões agendadas para hoje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="todos">
                  <TabsList className="mb-4">
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="reunioes">Reuniões</TabsTrigger>
                    <TabsTrigger value="prazos">Prazos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="todos">
                    {reunioesDoDia.length > 0 ? (
                      <div className="space-y-4">
                        {reunioesDoDia.map((reuniao) => (
                          <div key={reuniao.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-medium">{reuniao.titulo}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {formatTime(reuniao.data)}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Editar</Button>
                                <Button size="sm" className="bg-acordo-500 hover:bg-acordo-600">Entrar</Button>
                              </div>
                            </div>
                            <p className="text-sm mb-3">{reuniao.descricao || "Sem descrição"}</p>
                            <div>
                              <p className="text-xs font-medium mb-1">Participantes:</p>
                              <div className="flex flex-wrap gap-1">
                                {Array.isArray(reuniao.participantes) && reuniao.participantes.length > 0 ? (
                                  reuniao.participantes.map((participante: any, i: number) => (
                                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                      {participante.nome || participante}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-xs text-muted-foreground">Nenhum participante registrado</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                        <h3 className="font-medium">Nenhum compromisso para esta data</h3>
                        <p className="text-sm text-muted-foreground">
                          Você não tem compromissos agendados para o dia selecionado.
                        </p>
                        <Button className="mt-4 bg-acordo-500 hover:bg-acordo-600">
                          + Agendar Reunião
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="reunioes">
                    <div className="text-center py-8">
                      <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                      <h3 className="font-medium">Filtro de Reuniões</h3>
                      <p className="text-sm text-muted-foreground">
                        Aqui serão mostradas apenas as reuniões.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="prazos">
                    <div className="text-center py-8">
                      <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                      <h3 className="font-medium">Filtro de Prazos</h3>
                      <p className="text-sm text-muted-foreground">
                        Aqui serão mostrados apenas os prazos.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
