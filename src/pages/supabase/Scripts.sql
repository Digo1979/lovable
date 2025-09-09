
-- Create a table for clients
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID NOT NULL REFERENCES profiles(id),
  cnpj TEXT NOT NULL,
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT NOT NULL,
  inscricao_estadual TEXT,
  inscricao_municipal TEXT,
  cnae_principal TEXT,
  data_abertura DATE,
  natureza_juridica TEXT,
  data_inicio_contrato DATE,
  data_encerramento_contrato DATE,
  
  -- Endereço
  cep TEXT,
  logradouro TEXT,
  numero TEXT,
  complemento TEXT,
  bairro TEXT,
  cidade TEXT,
  uf TEXT,
  
  -- Contato
  telefone_fixo TEXT,
  telefone_celular TEXT,
  email TEXT,
  site TEXT,
  
  -- Responsável
  nome_responsavel TEXT NOT NULL,
  cargo_responsavel TEXT,
  telefone_responsavel TEXT,
  email_responsavel TEXT,
  
  -- Outros
  status TEXT NOT NULL DEFAULT 'Ativo',
  observacoes TEXT,
  data_cadastro TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ultima_atualizacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Garantindo que cada usuário tenha CNPJs únicos
  UNIQUE(usuario_id, cnpj)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policies for clients table
CREATE POLICY "Users can view their own clients"
  ON public.clients
  FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert their own clients"
  ON public.clients
  FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Users can update their own clients"
  ON public.clients
  FOR UPDATE
  USING (auth.uid() = usuario_id);

CREATE POLICY "Users can delete their own clients"
  ON public.clients
  FOR DELETE
  USING (auth.uid() = usuario_id);

-- Create function to update the última_atualização timestamp
CREATE OR REPLACE FUNCTION update_client_modificado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ultima_atualizacao = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update última_atualização
CREATE TRIGGER update_client_modificado_em_trigger
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION update_client_modificado_em();
