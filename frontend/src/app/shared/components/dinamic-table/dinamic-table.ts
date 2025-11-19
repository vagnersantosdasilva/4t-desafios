import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn, TableDataRow } from '../../models/table.model';

@Component({
  selector: 'app-dinamic-table',
  standalone: false,
  templateUrl: './dinamic-table.html',
  styleUrl: './dinamic-table.scss',
})
export class DinamicTable {
  @Input() tableHeaders: TableColumn[] = [];
  @Input() tableData: TableDataRow[] = [];

  @Output() editClicked = new EventEmitter<TableDataRow>();
  @Output() removeClicked = new EventEmitter<TableDataRow>();
  @Output() newRowClicked = new EventEmitter<void>();

  public rowClick(row: TableDataRow | undefined): void {
    if (row) {
      console.log('Row clicked:', row);
      //this.rowClicked.emit(row);
    }

  }

  public rowEdit(row:TableDataRow):void {
    this.editClicked.emit(row);
  }

  public rowRemove(row:TableDataRow):void {
    this.removeClicked.emit(row);
  }

  public newRow():void{
    this.newRowClicked.emit();
  }
}
