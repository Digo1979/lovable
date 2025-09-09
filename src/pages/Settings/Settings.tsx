
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Settings() {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    browser: true,
    reunioes: true,
    prazos: true,
    documentos: true,
    marketing: false
  });

  const handleToggleChange = (key: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key as keyof typeof notificationSettings]
    });
  };

  const handleSaveNotifications = () => {
    toast.success("Configurações de notificações salvas com sucesso!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Senha alterada com sucesso!");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie suas preferências e configurações de conta.</p>
        </div>

        <Tabs defaultValue="conta">
          <TabsList className="mb-6">
            <TabsTrigger value="conta">Conta</TabsTrigger>
            {/* <TabsTrigger value="notificacoes">Notificações</TabsTrigger> */}
            {/* <TabsTrigger value="privacidade">Privacidade</TabsTrigger> */}
            {/* <TabsTrigger value="integracao">Integrações</TabsTrigger> */}
          </TabsList>
          
          <TabsContent value="conta">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detalhes da Conta</CardTitle>
                  <CardDescription>Atualize suas informações básicas de conta</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input id="nome" defaultValue="Eduardo Felix" />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" defaultValue="eduardo.felix@exemplo.com" />
                    </div>
                    <div>
                      <Label htmlFor="idioma">Idioma</Label>
                      <Select defaultValue="pt-BR">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Fuso horário</Label>
                      <Select defaultValue="America/Sao_Paulo">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o fuso horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Sao_Paulo">Horário de Brasília (GMT-3)</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (GMT-5/GMT-4)</SelectItem>
                          <SelectItem value="UTC">Universal Time (UTC)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-acordo-500 hover:bg-acordo-600">
                      Salvar Alterações
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>Atualize sua senha e configurações de segurança</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleChangePassword}>
                    <div>
                      <Label htmlFor="senhaAtual">Senha atual</Label>
                      <Input id="senhaAtual" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="novaSenha">Nova senha</Label>
                      <Input id="novaSenha" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmaSenha">Confirme a nova senha</Label>
                      <Input id="confirmaSenha" type="password" />
                    </div>
                    <Button type="submit" className="w-full bg-acordo-500 hover:bg-acordo-600">
                      Alterar Senha
                    </Button>
                  </form>
                  
                  {/* <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-4">Segurança da conta</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Autenticação de dois fatores</p>
                        <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta</p>
                      </div>
                      <Button variant="outline">Configurar</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sessões ativas</p>
                        <p className="text-sm text-muted-foreground">Gerencie os dispositivos conectados à sua conta</p>
                      </div>
                      <Button variant="outline">Visualizar</Button>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notificacoes">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>Escolha como e quando deseja receber notificações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Canais de notificação</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications" className="font-medium">E-mail</Label>
                          <p className="text-sm text-muted-foreground">Receba notificações por e-mail</p>
                        </div>
                        <Switch 
                          id="email-notifications" 
                          checked={notificationSettings.email} 
                          onCheckedChange={() => handleToggleChange('email')}
                        />
                      </div>
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-notifications" className="font-medium">SMS</Label>
                          <p className="text-sm text-muted-foreground">Receba notificações por SMS</p>
                        </div>
                        <Switch 
                          id="sms-notifications" 
                          checked={notificationSettings.sms} 
                          onCheckedChange={() => handleToggleChange('sms')}
                        />
                      </div>
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <Label htmlFor="browser-notifications" className="font-medium">Navegador</Label>
                          <p className="text-sm text-muted-foreground">Receba notificações no navegador</p>
                        </div>
                        <Switch 
                          id="browser-notifications" 
                          checked={notificationSettings.browser} 
                          onCheckedChange={() => handleToggleChange('browser')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Tipos de notificação</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <Label htmlFor="reunioes-notifications" className="font-medium">Reuniões e agendamentos</Label>
                          <p className="text-sm text-muted-foreground">Notificações sobre reuniões e agendamentos</p>
                        </div>
                        <Switch 
                          id="reunioes-notifications" 
                          checked={notificationSettings.reunioes} 
                          onCheckedChange={() => handleToggleChange('reunioes')}
                        />
                      </div>
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <Label htmlFor="prazos-notifications" className="font-medium">Prazos e lembretes</Label>
                          <p className="text-sm text-muted-foreground">Notificações sobre prazos e lembretes</p>
                        </div>
                        <Switch 
                          id="prazos-notifications" 
                          checked={notificationSettings.prazos} 
                          onCheckedChange={() => handleToggleChange('prazos')}
                        />
                      </div>
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <Label htmlFor="documentos-notifications" className="font-medium">Documentos</Label>
                          <p className="text-sm text-muted-foreground">Notificações sobre documentos e assinaturas</p>
                        </div>
                        <Switch 
                          id="documentos-notifications" 
                          checked={notificationSettings.documentos} 
                          onCheckedChange={() => handleToggleChange('documentos')}
                        />
                      </div>
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-notifications" className="font-medium">Marketing</Label>
                          <p className="text-sm text-muted-foreground">Receba novidades e atualizações do produto</p>
                        </div>
                        <Switch 
                          id="marketing-notifications" 
                          checked={notificationSettings.marketing} 
                          onCheckedChange={() => handleToggleChange('marketing')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-acordo-500 hover:bg-acordo-600" onClick={handleSaveNotifications}>
                      Salvar Configurações
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacidade">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Privacidade</CardTitle>
                <CardDescription>Gerencie suas configurações de privacidade e visibilidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Visibilidade do perfil</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <p className="font-medium">Perfil público</p>
                          <p className="text-sm text-muted-foreground">Permitir que seu perfil seja visualizado por outros usuários</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <p className="font-medium">Mostrar e-mail</p>
                          <p className="text-sm text-muted-foreground">Permitir que seu e-mail seja visualizado por outros usuários</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <p className="font-medium">Mostrar telefone</p>
                          <p className="text-sm text-muted-foreground">Permitir que seu telefone seja visualizado por outros usuários</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Cookies e rastreamento</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <p className="font-medium">Cookies essenciais</p>
                          <p className="text-sm text-muted-foreground">Cookies necessários para o funcionamento da plataforma</p>
                        </div>
                        <Switch defaultChecked disabled />
                      </div>
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <p className="font-medium">Cookies de análise</p>
                          <p className="text-sm text-muted-foreground">Cookies que nos ajudam a entender como você usa a plataforma</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between border p-4 rounded-lg">
                        <div className="space-y-0.5">
                          <p className="font-medium">Cookies de marketing</p>
                          <p className="text-sm text-muted-foreground">Cookies utilizados para marketing direcionado</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-acordo-500 hover:bg-acordo-600">
                      Salvar Configurações
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integracao">
            <Card>
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
                <CardDescription>Conecte sua conta com outros serviços</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between border p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        </div>
                        <div>
                          <p className="font-medium">Google Calendar</p>
                          <p className="text-sm text-muted-foreground">Sincronize reuniões com o Google Calendar</p>
                        </div>
                      </div>
                      <Button variant="outline">Conectar</Button>
                    </div>
                    
                    <div className="flex items-center justify-between border p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </div>
                        <div>
                          <p className="font-medium">Outlook</p>
                          <p className="text-sm text-muted-foreground">Integre com o Microsoft Outlook</p>
                        </div>
                      </div>
                      <Button variant="outline">Conectar</Button>
                    </div>
                    
                    <div className="flex items-center justify-between border p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                        </div>
                        <div>
                          <p className="font-medium">DocuSign</p>
                          <p className="text-sm text-muted-foreground">Assine documentos eletronicamente</p>
                        </div>
                      </div>
                      <Button variant="outline">Conectar</Button>
                    </div>
                    
                    <div className="flex items-center justify-between border p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                        </div>
                        <div>
                          <p className="font-medium">Google Drive</p>
                          <p className="text-sm text-muted-foreground">Armazene documentos no Google Drive</p>
                        </div>
                      </div>
                      <Button variant="outline">Conectar</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-6 border-t">
                    <h3 className="font-medium mb-4">APIs e webhooks</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="apiKey">Chave API</Label>
                        <div className="flex mt-1">
                          <Input id="apiKey" defaultValue="sk_test_***********************" readOnly className="rounded-r-none" />
                          <Button variant="secondary" className="rounded-l-none">
                            Copiar
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Esta é sua chave API para integrações. Nunca compartilhe esta chave.
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="webhook">URL de Webhook</Label>
                        <Input id="webhook" placeholder="https://sua-aplicacao.com/webhook" />
                        <p className="text-xs text-muted-foreground mt-2">
                          Configure um webhook para receber eventos em tempo real.
                        </p>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-acordo-500 hover:bg-acordo-600">
                          Salvar Configurações de API
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
