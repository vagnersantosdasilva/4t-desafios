import { Component } from '@angular/core';
import { TableColumn, TableDataRow } from '../../shared/models/table.model';

@Component({
  selector: 'app-beneficiarios-page',
  standalone: false,
  templateUrl: './beneficiarios-page.html',
  styleUrl: './beneficiarios-page.scss',
})
export class BeneficiariosPage {

  public beneficiarios: { headers: TableColumn[]; data: TableDataRow[] };
  constructor() {
    // Definição dos cabeçalhos

    const tableHeaders: TableColumn[] = [
      { header: 'ID', field: 'id', width: '50px' },
      { header: 'Nome Completo', field: 'nome_completo', isSortable: true },
      { header: 'CPF', field: 'cpf' },
      { header: 'Data Nasc.', field: 'data_nascimento', pipe: 'date', format: 'dd/MM/yyyy' },
      { header: 'Status', field: 'status' },
      { header: 'Plano ID', field: 'plano_id' },
      { header: 'Data Cadastro', field: 'data_cadastro', pipe: 'date', format: 'dd/MM/yyyy HH:mm' }
    ];

    const mappedData: TableDataRow[] = [
      {
        "id": 1,
        "nome_completo": "João Pereira",
        "cpf": "11144477735",
        "data_nascimento": "1988-01-10",
        "status": "ATIVO",
        "plano_id": 2,
        "data_cadastro": "2025-01-10T10:30:00Z"
      },
      {
        "id": 2,
        "nome_completo": "Ana Souza",
        "cpf": "98765432100",
        "data_nascimento": "1995-09-03",
        "status": "ATIVO",
        "plano_id": 1,
        "data_cadastro": "2025-02-15T11:00:00Z"
      },
      {
        "id": 3,
        "nome_completo": "Maria Santos",
        "cpf": "10987654321",
        "data_nascimento": "1992-07-22",
        "status": "INATIVO",
        "plano_id": 3,
        "data_cadastro": "2025-03-20T12:45:00Z"
      }
    ]

    this.beneficiarios = {
      headers: tableHeaders,
      data: mappedData
    };
  }

  public editBeneficiario(row: TableDataRow): void {
    console.log('Edit beneficiary:', row);
  }

  public removeBeneficiario(row: TableDataRow): void {
    console.log('Remove beneficiary:', row);
  }

  public newBeneficiario(): void {
    console.log('Add new beneficiary');
  }
}
