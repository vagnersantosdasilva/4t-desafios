import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { SelectOption, TableColumn, TableDataRow } from '../../../shared/models/table.model';
import { BeneficiariosService } from '../../../services/beneficiarios/beneficiarios';
import { PlanosService } from '../../../services/planos/planos';
import { BeneficiarioArgs } from '../../../model/api.model';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-beneficiarios-page',
  standalone: false,
  templateUrl: './beneficiarios-page.html',
  styleUrl: './beneficiarios-page.scss',
})
export class BeneficiariosPage implements OnInit {

  public beneficiarios: { headers: TableColumn[]; data: TableDataRow[] };
  public planosSelectOptions: SelectOption[] = [];
  public statusSelectOptions: SelectOption[] = [
    { id: 1, value: 'TODOS', label: 'Todos' },
    { id: 2, value: 'ATIVO', label: 'Ativo' },
    { id: 3, value: 'INATIVO', label: 'Inativo' },
  ];
  public dialogVisible: boolean = false;

  private beneficiarioSelected: TableDataRow | null = null;
  private beneficiariosService = inject(BeneficiariosService);
  private planosService = inject(PlanosService);
  private router = inject(Router);
  private beneficiariosArgs: BeneficiarioArgs = {}

  private destroyRef = inject(DestroyRef);
  private toastService = inject(ToastService);

  constructor() {
    this.beneficiarios = { headers: [], data: [] };
  }

  ngOnInit(): void {

    this.beneficiarios.headers = [
      { header: 'ID', field: 'id', isSortable: true },
      { header: 'Nome Completo', field: 'nome_completo', isSortable: true },
      { header: 'CPF', field: 'cpf' },
      { header: 'Data Nasc.', field: 'data_nascimento', pipe: 'date', format: 'dd/MM/yyyy' },
      { header: 'Status', field: 'status' },
      { header: 'Plano', field: 'plano', isSortable: true },
      { header: 'Data Cadastro', field: 'data_cadastro', pipe: 'date', format: 'dd/MM/yyyy HH:mm' }
    ];
    this.beneficiarios.data = [];
    this.loadBeneficiarios();

    this.planosService.getPlanos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (planos) => {
          this.planosSelectOptions = planos.map((plano) => ({
            id: plano.id,
            value: plano.id,
            label: plano.nome
          } as SelectOption));
        },
        error: (error) => {
          this.toastService.error('Erro ao carregar planos: ' + error.message);
        }
      });
  }

  public editBeneficiario(row: TableDataRow): void {
    console.log('Edit beneficiary:', row);
    this.router.navigate(['/beneficiarios/editar', row['id']]);
  }

  public removeBeneficiario(row: TableDataRow): void {
    console.log('Remove beneficiary:', row['id']);
    this.dialogVisible = true;
    this.beneficiarioSelected = row;
  }

  public newBeneficiario(): void {
    console.log('Add new beneficiary');
    this.router.navigate(['/beneficiarios/novo']);
  }

  public filterPlano(option: number | string): void {

    const isFilterEmpty = option === 0 || option === '' || option === null || option === undefined;

    if (isFilterEmpty) {
      delete this.beneficiariosArgs.plano_id;
    }
    else {
      this.beneficiariosArgs.plano_id = Number(option);
    }
    this.loadBeneficiarios();
  }

  public filterStatus(option: number | string): void {
    console.log('Filter by status:', option);
    if (option === 'TODOS' || option.toString().length === 0) {
      delete this.beneficiariosArgs.status;
    } else {
      this.beneficiariosArgs.status = option as 'ATIVO' | 'INATIVO';
    }
    this.loadBeneficiarios();
  }

  private loadBeneficiarios(): void {

    this.beneficiariosService.getBeneficiarios(this.beneficiariosArgs)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (beneficiarios) => {
          this.beneficiarios.data = beneficiarios.map(beneficiario => ({
            id: beneficiario.id,
            nome_completo: beneficiario.nome_completo,
            cpf: beneficiario.cpf,
            data_nascimento: beneficiario.data_nascimento,
            status: beneficiario.status,
            plano: beneficiario.plano.nome,
            data_cadastro: beneficiario.data_cadastro
          }));

        },
        error: (error) => {
          this.toastService.error('Erro ao carregar beneficiários: ' + error);
        }
      });
  }

  public confirmRemoveBeneficiario(): void {
    // Lógica para confirmar a remoção do beneficiário
    if (this.beneficiarioSelected != null) {
      this.beneficiariosService.deleteBeneficiario(this.beneficiarioSelected['id'] as number).subscribe({
        next: () => {
          this.loadBeneficiarios();
          this.toastService.success('Beneficiário removido com sucesso.');
        },
        error: () => {
          this.toastService.error('Erro ao remover o beneficiário. Tente mais tarde.');
        }
      });
    };

    this.dialogVisible = false;
  }

  public cancelRemoveBeneficiario(): void {
    // Lógica para cancelar a remoção do beneficiário
    this.dialogVisible = false;
  }
}
