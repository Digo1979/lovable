export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      acordos: {
        Row: {
          atualizado_em: string
          criado_em: string
          descricao: string | null
          id: string
          partes: Json
          progresso: number
          status: string
          titulo: string
          usuario_id: string
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          descricao?: string | null
          id?: string
          partes?: Json
          progresso?: number
          status?: string
          titulo: string
          usuario_id: string
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          descricao?: string | null
          id?: string
          partes?: Json
          progresso?: number
          status?: string
          titulo?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "acordos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          bairro: string | null
          cargo_responsavel: string | null
          cep: string | null
          cidade: string | null
          cnae_principal: string | null
          cnpj: string
          complemento: string | null
          data_abertura: string | null
          data_cadastro: string
          data_encerramento_contrato: string | null
          data_inicio_contrato: string | null
          email: string | null
          email_responsavel: string | null
          id: string
          inscricao_estadual: string | null
          inscricao_municipal: string | null
          logradouro: string | null
          natureza_juridica: string | null
          nome_fantasia: string
          nome_responsavel: string
          numero: string | null
          observacoes: string | null
          razao_social: string
          site: string | null
          status: string
          telefone_celular: string | null
          telefone_fixo: string | null
          telefone_responsavel: string | null
          uf: string | null
          ultima_atualizacao: string
          usuario_id: string
        }
        Insert: {
          bairro?: string | null
          cargo_responsavel?: string | null
          cep?: string | null
          cidade?: string | null
          cnae_principal?: string | null
          cnpj: string
          complemento?: string | null
          data_abertura?: string | null
          data_cadastro?: string
          data_encerramento_contrato?: string | null
          data_inicio_contrato?: string | null
          email?: string | null
          email_responsavel?: string | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          logradouro?: string | null
          natureza_juridica?: string | null
          nome_fantasia: string
          nome_responsavel: string
          numero?: string | null
          observacoes?: string | null
          razao_social: string
          site?: string | null
          status?: string
          telefone_celular?: string | null
          telefone_fixo?: string | null
          telefone_responsavel?: string | null
          uf?: string | null
          ultima_atualizacao?: string
          usuario_id: string
        }
        Update: {
          bairro?: string | null
          cargo_responsavel?: string | null
          cep?: string | null
          cidade?: string | null
          cnae_principal?: string | null
          cnpj?: string
          complemento?: string | null
          data_abertura?: string | null
          data_cadastro?: string
          data_encerramento_contrato?: string | null
          data_inicio_contrato?: string | null
          email?: string | null
          email_responsavel?: string | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          logradouro?: string | null
          natureza_juridica?: string | null
          nome_fantasia?: string
          nome_responsavel?: string
          numero?: string | null
          observacoes?: string | null
          razao_social?: string
          site?: string | null
          status?: string
          telefone_celular?: string | null
          telefone_fixo?: string | null
          telefone_responsavel?: string | null
          uf?: string | null
          ultima_atualizacao?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          atualizado_em: string
          avatar_url: string | null
          cargo: string | null
          criado_em: string
          email: string
          id: string
          nome: string | null
          organizacao: string | null
        }
        Insert: {
          atualizado_em?: string
          avatar_url?: string | null
          cargo?: string | null
          criado_em?: string
          email: string
          id: string
          nome?: string | null
          organizacao?: string | null
        }
        Update: {
          atualizado_em?: string
          avatar_url?: string | null
          cargo?: string | null
          criado_em?: string
          email?: string
          id?: string
          nome?: string | null
          organizacao?: string | null
        }
        Relationships: []
      }
      reunioes: {
        Row: {
          acordo_id: string | null
          atualizado_em: string
          criado_em: string
          data: string
          descricao: string | null
          duracao: number
          id: string
          link_reuniao: string | null
          participantes: Json
          status: string
          titulo: string
          usuario_id: string
        }
        Insert: {
          acordo_id?: string | null
          atualizado_em?: string
          criado_em?: string
          data: string
          descricao?: string | null
          duracao?: number
          id?: string
          link_reuniao?: string | null
          participantes?: Json
          status?: string
          titulo: string
          usuario_id: string
        }
        Update: {
          acordo_id?: string | null
          atualizado_em?: string
          criado_em?: string
          data?: string
          descricao?: string | null
          duracao?: number
          id?: string
          link_reuniao?: string | null
          participantes?: Json
          status?: string
          titulo?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reunioes_acordo_id_fkey"
            columns: ["acordo_id"]
            isOneToOne: false
            referencedRelation: "acordos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reunioes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
