export interface Plano {
  id: number | null;
  nome: string;
  codigo_registro_ans: string;
}

export interface Beneficiario {
  id: number | null;
  nome_completo: string;
  cpf: string;
  data_nascimento: string;
  status: 'ATIVO' | 'INATIVO';
  plano_id: number;
  data_cadastro: string;
}

export interface BeneficiarioTable {
  id: number;
  nome_completo: string;
  cpf: string;
  data_nascimento: string;
  status: 'ATIVO' | 'INATIVO';
  plano: string;
  data_cadastro: string;
}


export interface BeneficiarioExpanded extends Beneficiario{
  plano: Plano;
}


export interface BeneficiarioArgs{
  status?: 'ATIVO' | 'INATIVO';
  plano_id?: number;
}
