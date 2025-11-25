import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  //const cpf = control.value.replace(/\D/g, '');
  const cpf = control.value

  if (!/^\d+$/.test(control.value.replace(/\D/g, ''))) {
    return { cpfInvalido: true };
  }

  if (cpf.length !== 11) {
    return { cpfInvalido: true };
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return { cpfInvalido: true };
  }

  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let resto = soma % 11;
  let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
    return { cpfInvalido: true };
  }

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  resto = soma % 11;
  let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

  if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
    return { cpfInvalido: true };
  }

  return null;
}
