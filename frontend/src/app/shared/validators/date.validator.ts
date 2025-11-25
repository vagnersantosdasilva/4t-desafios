import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const inputDate = new Date(control.value);
  const today = new Date();


  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  if (isNaN(inputDate.getTime())) {
    return { invalidDate: true }; // Data inválida
  }

  if (inputDate > today) {
    return { futureDate: true }; // Data futura
  }

  return null;

}
