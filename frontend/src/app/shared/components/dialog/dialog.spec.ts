import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog } from './dialog';

describe('Dialog', () => {
  let component: Dialog;
  let fixture: ComponentFixture<Dialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Dialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should show dialog when visible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const dialogElement = nativeElement.querySelector('.modal-backdrop');

    expect(dialogElement).toBeTruthy();
  });

  it('should not show dialog when visible is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const dialogElement = nativeElement.querySelector('.modal-backdrop');

    expect(dialogElement).toBeFalsy();
  });

  it('should emit primaryButtonCliked event when primary button is clicked', () => {
    spyOn(component.primaryButtonCliked, 'emit');

    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const primaryButton = nativeElement.querySelector('.btn-primary') as HTMLButtonElement;

    primaryButton.click();

    expect(component.primaryButtonCliked.emit).toHaveBeenCalled();
  });

  it('should emit secondaryButtonClicked event when secondary button is clicked', () => {
    spyOn(component.secondaryButtonClicked, 'emit');

    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const secondaryButton = nativeElement.querySelector('.btn-secondary') as HTMLButtonElement;

    secondaryButton.click();

    expect(component.secondaryButtonClicked.emit).toHaveBeenCalled();
  });

  it('should display correct message and button labels', () => {
    const testMessage = 'Test message';
    const primaryLabel = 'Yes';
    const secondaryLabel = 'No';
    const dialogTitle = 'Test Title';

    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('dialogTitle', dialogTitle);
    fixture.componentRef.setInput('message', testMessage);
    fixture.componentRef.setInput('primaryButtonLabel', primaryLabel);
    fixture.componentRef.setInput('secondaryButtonLabel', secondaryLabel);
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const messageElement = nativeElement.querySelector('.modal-body p');
    const primaryButton = nativeElement.querySelector('.btn-primary') as HTMLButtonElement;
    const secondaryButton = nativeElement.querySelector('.btn-secondary') as HTMLButtonElement;
    const titleElement = nativeElement.querySelector('h5');

    expect(titleElement?.textContent).toContain(dialogTitle);
    expect(messageElement?.textContent).toContain(testMessage);
    expect(primaryButton.textContent).toContain(primaryLabel);
    expect(secondaryButton.textContent).toContain(secondaryLabel);


  });

  it('should use default values when inputs are not provided', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const messageElement = nativeElement.querySelector('.modal-body p');
    const primaryButton = nativeElement.querySelector('.btn-primary') as HTMLButtonElement;
    const secondaryButton = nativeElement.querySelector('.btn-secondary') as HTMLButtonElement;
    const titleElement = nativeElement.querySelector('h5');

    expect(titleElement?.textContent).toContain('Confirmação');
    expect(messageElement?.textContent).toContain('Tem certeza que deseja continuar?');
    expect(primaryButton.textContent).toContain('Confirmar');
    expect(secondaryButton.textContent).toContain('Cancelar');
  });
});
