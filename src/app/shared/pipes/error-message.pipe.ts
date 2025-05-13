import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {
  transform(errors: any): string | null {
    if (!errors) return null;

    if (errors['required']) {
      return 'Este campo es obligatorio.';
    }

    if (errors['maxlength']) {
      const maxLength = errors['maxlength'].requiredLength;
      return `Máximo de caracteres ${maxLength} excedido.`;
    }

    if (errors['pattern']) {
      const pattern = errors['pattern']['requiredPattern'];
      switch (pattern) {
        case '/^[0-9]+$/':
          return 'Solo se permiten números.';
        case '/^\\+?[0-9]{1,13}$/':
          return 'Solo se permiten números, con o sin + al inicio.';
        case '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/':
          return 'Correo electrónico inválido.';
        default:
          return 'Formato inválido.';
      }
    }

    if (errors['email']) {
      return 'Correo electrónico inválido.';
    }

    return 'Campo inválido.';
  }
}
