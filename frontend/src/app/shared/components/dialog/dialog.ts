import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: false,
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog {
  @Input() message: string = 'Tem certeza que deseja continuar?';
  @Input() primaryButtonLabel: string = 'Confirmar';
  @Input() secondaryButtonLabel: string = 'Cancelar';
  @Input() dialogTitle: string = 'Confirmação';
  @Input() visible: boolean = false;


  @Output() primaryButtonCliked = new EventEmitter<void>();
  @Output() secondaryButtonClicked = new EventEmitter<void>();

  public onPrimaryButtonClick(): void {
    this.primaryButtonCliked.emit();
  }

  public onSecondaryButtonClick(): void {
    this.secondaryButtonClicked.emit();
  }
}
