import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOption, TableColumn, TableDataRow } from '../../models/table.model';

@Component({
  selector: 'app-dinamic-table',
  standalone: false,
  templateUrl: './dinamic-table.html',
  styleUrl: './dinamic-table.scss',
})
export class DinamicTable {
  @Input() tableHeaders: TableColumn[] = [];
  @Input() tableData: TableDataRow[] = [];
  @Input() selectPrimaryControlOptions:SelectOption[] | undefined = undefined;
  @Input() selectSecondaryControlOptions:SelectOption[] | undefined = undefined;
  @Input() buttonActionLabel:string = 'Adicionar';
  @Input() primarySelectLabel: string ='';
  @Input() secondarySelectLabel: string ='';
  @Input() messageEmptyTable: string = 'Não há dados disponíveis para esta visualização.';

  @Output() editClicked = new EventEmitter<TableDataRow>();
  @Output() removeClicked = new EventEmitter<TableDataRow>();
  @Output() selectPrimaryChanged = new EventEmitter<string | number>();
  @Output() selectSecondaryChanged = new EventEmitter<string | number>();
  @Output() buttonActionClicked = new EventEmitter<void>();


  public rowEdit(row:TableDataRow):void {
    this.editClicked.emit(row);
  }

  public rowRemove(row:TableDataRow):void {
    this.removeClicked.emit(row);
  }

  public primarySelectChange(option: string | number): void {
    this.selectPrimaryChanged.emit(option);
  }

  public secondarySelectChange(option: string | number): void {
    this.selectSecondaryChanged.emit(option);
  }

  public buttonAction(): void {
    this.buttonActionClicked.emit();
  }
}
