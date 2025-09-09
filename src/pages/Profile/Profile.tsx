
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    nome: "Eduardo Felix",
    email: "eduardo.felix@exemplo.com",
    telefone: "(11) 98765-4321",
    cargo: "Advogado",
    empresa: "Vida RP Advogados",
    bio: "Especialista em direito civil e resolução de conflitos. Atuo há mais de 10 anos na área de mediação e conciliação."
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Perfil atualizado com sucesso!");
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas informações pessoais e documentos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback className="text-2xl bg-acordo-500 text-white">
                      EF
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{profileForm.nome}</h2>
                  <p className="text-muted-foreground">{profileForm.cargo}</p>
                  <p className="text-sm">{profileForm.empresa}</p>
                  
                  <div className="w-full mt-6 space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm font-medium">{profileForm.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Telefone</p>
                          <p className="text-sm font-medium">{profileForm.telefone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Informações do Perfil</CardTitle>
                    <CardDescription>Gerencie suas informações pessoais</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancelar
                      </Button>
                      <Button className="bg-acordo-500 hover:bg-acordo-600" onClick={handleSubmit}>
                        Salvar
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="info">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">Informações</TabsTrigger>
                    {/* <TabsTrigger value="docs">Documentos</TabsTrigger> */}
                    {/* <TabsTrigger value="history">Histórico</TabsTrigger> */}
                  </TabsList>
                  
                  <TabsContent value="info">
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="nome" className="block text-sm font-medium mb-1">
                            Nome Completo
                          </label>
                          <Input
                            id="nome"
                            name="nome"
                            value={profileForm.nome}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            E-mail
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileForm.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <label htmlFor="telefone" className="block text-sm font-medium mb-1">
                            Telefone
                          </label>
                          <Input
                            id="telefone"
                            name="telefone"
                            value={profileForm.telefone}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <label htmlFor="cargo" className="block text-sm font-medium mb-1">
                            Cargo
                          </label>
                          <Input
                            id="cargo"
                            name="cargo"
                            value={profileForm.cargo}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <label htmlFor="empresa" className="block text-sm font-medium mb-1">
                            Empresa/Organização
                          </label>
                          <Input
                            id="empresa"
                            name="empresa"
                            value={profileForm.empresa}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium mb-1">
                          Biografia
                        </label>
                        <Textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={profileForm.bio}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="docs">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Meus Documentos</h3>
                        <Button variant="outline" size="sm">
                          Adicionar Documento
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="border rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                            </div>
                            <div>
                              <p className="font-medium">OAB-SP.pdf</p>
                              <p className="text-xs text-muted-foreground">Adicionado em 10/05/2023</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                          </Button>
                        </div>
                        
                        <div className="border rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                            </div>
                            <div>
                              <p className="font-medium">Certificado-Mediação.pdf</p>
                              <p className="text-xs text-muted-foreground">Adicionado em 05/03/2023</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <div className="space-y-4">
                      <h3 className="font-medium">Histórico de Atividades</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 text-blue-700 p-2 rounded-full h-min">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                          </div>
                          <div>
                            <p className="font-medium">Perfil atualizado</p>
                            <p className="text-sm text-muted-foreground">Você atualizou suas informações de perfil</p>
                            <p className="text-xs text-muted-foreground mt-1">10/06/2023, 15:30</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 text-green-700 p-2 rounded-full h-min">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                          </div>
                          <div>
                            <p className="font-medium">Acordo finalizado</p>
                            <p className="text-sm text-muted-foreground">Acordo Trabalhista #A12345 foi concluído</p>
                            <p className="text-xs text-muted-foreground mt-1">05/06/2023, 09:45</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-yellow-100 text-yellow-700 p-2 rounded-full h-min">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-plus"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
                          </div>
                          <div>
                            <p className="font-medium">Documento adicionado</p>
                            <p className="text-sm text-muted-foreground">Você adicionou um novo documento: OAB-SP.pdf</p>
                            <p className="text-xs text-muted-foreground mt-1">10/05/2023, 11:20</p>
                          </div>
                        </div>
                      </div>
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
