import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { TableColumn, TableDataRow } from '../../shared/models/table.model';
import { PlanosService } from '../../services/planos/planos';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-planos-page',
  standalone: false,
  templateUrl: './planos-page.html',
  styleUrl: './planos-page.scss',
})

export class PlanosPage implements OnInit {

  public planosTable: { headers: TableColumn[]; data: TableDataRow[] } = { headers: [], data: [] };
  public dialogVisible: boolean = false;
  private planosService = inject(PlanosService);
  private router = inject(Router);
  private planoSelected: TableDataRow | null = null;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.planosTable.headers = [
      { header: 'ID', field: 'id' },
      { header: 'Nome', field: 'nome' },
      { header: 'Código ANS', field: 'codigo_registro_ans' },
    ];
    this.planosTable.data = [];
    this.planoSelected = null;
    this.loadPlanos();
  }

  public editPlano(row: TableDataRow): void {
    this.router.navigate(['/planos/editar', row['id']]);
  }

  public removePlano(row: TableDataRow): void {
    this.planoSelected = row;
    this.dialogVisible = true;
  }

  public newPlano(): void {
    this.router.navigate(['/planos/novo']);
  }

  public confirmRemovePlano(): void {
    if (this.planoSelected != null) {
      this.planosService.deletePlano(this.planoSelected['id'] as number)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadPlanos();
        },
        error: (err) => {
          alert('Erro ao remover o plano: ' + err);
        }
      });
    };

    this.dialogVisible = false;
  }

  public cancelRemovePlano(): void {
    this.planoSelected = null;
    this.dialogVisible = false;
  }

  private loadPlanos(): void {
    this.planosService.getPlanos()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(
      {
        next: (planos) => {
          this.planosTable.data = planos.map((plano) => ({
            id: plano.id,
            nome: plano.nome,
            codigo_registro_ans: plano.codigo_registro_ans,
          }));
        },
        error: (err) => {
          alert('Erro ao carregar os planos: ' + err);
        }
      }
    );
  }

}
