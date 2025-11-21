import { Component, inject, OnInit } from '@angular/core';
import { TableColumn, TableDataRow } from '../../shared/models/table.model';
import { PlanosService } from '../../services/planos/planos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planos-page',
  standalone: false,
  templateUrl: './planos-page.html',
  styleUrl: './planos-page.scss',
})

export class PlanosPage implements OnInit {

  public planosTable: { headers: TableColumn[]; data: TableDataRow[] } = { headers: [], data: [] }  ;
  private planosService = inject(PlanosService);
  private router = inject(Router);

  ngOnInit(): void {
     this.planosTable.headers = [
      { header: 'ID', field: 'id' },
      { header: 'Nome', field: 'nome'},
      { header: 'Código ANS', field: 'codigo_registro_ans' },
    ];
    this.planosTable.data = [];
    this.planosService.getPlanos().subscribe((planos) => {
      this.planosTable.data = planos.map((plano) => ({
        id: plano.id,
        nome: plano.nome,
        codigo_registro_ans: plano.codigo_registro_ans,
      }));
    });
  }

  public editPlano(row: TableDataRow): void {
    this.router.navigate(['/planos/editar', row['id']]);
  }

  public removePlano(row: TableDataRow): void {
    console.log('Remove plan:', row['id']);
  }

  public newPlano(): void {
    this.router.navigate(['/planos/novo']);
  }

}
