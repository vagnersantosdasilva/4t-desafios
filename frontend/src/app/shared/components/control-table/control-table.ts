import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOption } from '../../models/table.model';

@Component({
  selector: 'app-control-table',
  standalone: false,
  templateUrl: './control-table.html',
  styleUrl: './control-table.scss',
})
export class ControlTable {

  @Input() buttonControlLabel: string | undefined = undefined;

  @Input() primarySelectOptions: SelectOption[] | undefined
  @Input() primarySelectLabel: string = '';

  @Input() secondSelectOptions: SelectOption[] | undefined
  @Input() secondSelectLabel: string = '';

  @Output() buttonControlActionClicked = new EventEmitter<void>();

  @Output() secondSelectChanged = new EventEmitter<string | number>();

  @Output() primarySelectChanged = new EventEmitter<string | number>();



  public buttonControlAction(): void {
    console.log('Button control action clicked');
    this.buttonControlActionClicked.emit();
  }

  public primarySelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    const selectedId = selectElement.options[selectElement.selectedIndex].id;

    console.log('primeiro select alterado:', {
      value: selectedValue,
      id: selectedId
    });
    this.primarySelectChanged.emit(selectedValue);
  }

  public secondSelectChange(event:Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    const selectedId = selectElement.options[selectElement.selectedIndex].id;

    console.log('Segundo select alterado:', {
      value: selectedValue,
      id: selectedId
    });
    this.secondSelectChanged.emit(selectedValue);
  }
}
