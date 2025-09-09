import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CaseManagement = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap items-center gap-6">
            <span><strong>Status Tratativa:</strong> <span className="text-green-300">Iniciado</span></span>
            <span><strong>Responsável:</strong> Rodrigo de Oliveira</span>
            <span><strong>Prazo de negociação:</strong> 07/08/2025</span>
          </div>
          <div className="flex gap-4">
            <span><strong>Nº INTERNO 1</strong></span>
            <span><strong>Nº INTERNO 2</strong></span>
          </div>
        </div>
        <div className="mt-2 text-sm">
          <div className="flex flex-wrap gap-6">
            <span><strong>Processo nº:</strong> 1131730-74.2024.8.26.0100</span>
            <span><strong>COMARCA:</strong> VARA</span>
            <span><strong>AÇÃO DE REPARAÇÃO DE DANOS</strong></span>
          </div>
          <div className="mt-1">
            <span><strong>Autor:</strong> ROSANA ANDRADE DE OLIVEIRA</span>
            <span className="ml-8"><strong>Réu:</strong> BANCO BRADESCO S.A.</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-6">
            <span><strong>Fase:</strong> Conhecimento</span>
            <span><strong>Alçada Atual:</strong> <span className="text-red-300">R$ 500,00</span></span>
            <span><strong>Alçadas:</strong> 1.500,00 / 5.000,00 / 7.500,00</span>
          </div>
          <div className="mt-1 text-xs">
            <div><strong>Observação:</strong> Cancelamento do contrato de empréstimo pessoal n. 8888888 e a retirada do nome da parte autora dos cadastros de proteção ao crédito.</div>
            <div className="mt-1 flex flex-wrap gap-6">
              <span><strong>Adverso:</strong> Dr. João da Silva</span>
              <span><strong>E-mail:</strong> joaosilva@hotmail.com</span>
              <span><strong>WhtsApp:</strong> (41) 9999-9999</span>
              <span><strong>Telefone:</strong> (41) 3333-3333</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dados de Contato */}
        <Card className="lg:col-span-12">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">DADOS DE CONTATO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs font-semibold">NOME ADVERSO</Label>
                <Input defaultValue="João da Silva" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold">E-MAIL</Label>
                <Input defaultValue="joaosilva@hotmail.com" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold">WHATSAPP</Label>
                <Input defaultValue="(41) 9999-9999" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold">CONTATO 2 OPCIONAL</Label>
                <Input defaultValue="José Lopes" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold">E-MAIL 2 OPCIONAL</Label>
                <Input defaultValue="joselopes@hotmail.com" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold">WHATSAPP 2 OPCIONAL</Label>
                <Input defaultValue="(41) 8888-8888" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tratativa */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">TRATATIVA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs font-semibold">ALÇADA PARA ACORDO</Label>
              <div className="flex">
                <Input defaultValue="5.000,00" className="mt-1 rounded-r-none" />
                <Button variant="outline" className="mt-1 rounded-l-none px-2">✓</Button>
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold">OBSERVAÇÃO</Label>
              <Textarea 
                defaultValue="Acordo referente apenas ao Banco Bradesco." 
                className="mt-1 min-h-[60px]" 
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">OBRIGAÇÃO DE FAZER</Label>
              <Textarea 
                defaultValue="Cancelamento do contrato de empréstimo pessoal n. 8888888 e a retirada do nome da parte autora dos cadastros de proteção ao crédito." 
                className="mt-1 min-h-[80px]" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Forma de Pagamento e Prazo */}
        <Card className="lg:col-span-4">
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label className="text-xs font-semibold">FORMA DE PAGAMENTO</Label>
              <Select defaultValue="vista">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vista">À VISTA</SelectItem>
                  <SelectItem value="parcelado">PARCELADO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-semibold">PRAZO DE PAGAMENTO</Label>
              <Input defaultValue="15 DIAS ÚTEIS" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs font-semibold">DEPÓSITO</Label>
              <div className="flex">
                <Select defaultValue="conta-autor">
                  <SelectTrigger className="mt-1 rounded-r-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conta-autor">CONTA DO AUTOR</SelectItem>
                    <SelectItem value="conta-escritorio">CONTA DO ESCRITÓRIO</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="mt-1 rounded-l-none px-2">✓</Button>
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold">PRAZO OBRIGAÇÃO DE FAZER</Label>
              <Input defaultValue="15 DIAS ÚTEIS" className="mt-1" />
            </div>
          </CardContent>
        </Card>

        {/* Contraproposta */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">CONTRAPROPOSTA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs font-semibold">VALOR</Label>
              <Input defaultValue="12.000,00" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs font-semibold">OBSERVAÇÃO</Label>
              <Textarea 
                defaultValue="Cancelamento do contrato de empréstimo pessoal n. 8888888 e a retirada do nome da parte autora dos cadastros de proteção ao crédito." 
                className="mt-1 min-h-[100px]" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Minuta de Acordo */}
        <Card className="lg:col-span-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">MINUTA DE ACORDO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <Label className="text-xs font-semibold">ORIGINAL</Label>
                <Button className="w-full mt-1 bg-cyan-500 hover:bg-cyan-600 text-white">
                  ANEXAR
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-6">
          <CardContent className="pt-6">
            <div>
              <Label className="text-xs font-semibold">DEVOLVIDA</Label>
              <Button className="w-full mt-1 bg-orange-500 hover:bg-orange-600 text-white">
                DOWNLOAD
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Histórico */}
        <Card className="lg:col-span-12">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">HISTÓRICO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded border min-h-[120px] text-sm space-y-1">
              <div><strong>05/08/2025</strong> - ENVIADO PROPOSTA DE ACORDO NO VALOR DE R$ 5.000,00</div>
              <div><strong>06/08/2025</strong> - CONTRAPROPOSTA NO VALOR DE R$ 12.000,00</div>
              <div><strong>06/08/2025</strong> - PROPOSTA MAJORADA NO VALOR DE R$ 7.500,00</div>
              <div><strong>07/08/2025</strong> - POROPOSTA ACEITA. ENVIAR MINUTA DE ACORDO.</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <Button variant="destructive" className="min-w-[120px]">
          CANCELAR
        </Button>
        <Button className="min-w-[120px] bg-yellow-600 hover:bg-yellow-700 text-white">
          LIMPAR
        </Button>
        <Button className="min-w-[120px] bg-green-600 hover:bg-green-700 text-white">
          TRATAR
        </Button>
        <div className="flex items-center gap-2">
          <Select defaultValue="acordo-realizado">
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acordo-realizado">ACORDO REALIZADO</SelectItem>
              <SelectItem value="acordo-negado">ACORDO NEGADO</SelectItem>
              <SelectItem value="em-negociacao">EM NEGOCIAÇÃO</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gray-700 hover:bg-gray-800 text-white">
            ENCERRAR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseManagement;