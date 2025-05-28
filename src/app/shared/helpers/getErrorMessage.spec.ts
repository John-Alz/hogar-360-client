import { getErrorMessage } from './error-message';

describe('getErrorMessage', () => {

  it('debe retornar null si no hay errores', () => {
    expect(getErrorMessage(null)).toBeNull();
    expect(getErrorMessage(undefined)).toBeNull();
  });

  it('debe retornar mensaje para required', () => {
    expect(getErrorMessage({ required: true })).toBe('Este campo es obligatorio.');
  });

  it('debe retornar mensaje para maxlength', () => {
    expect(getErrorMessage({ maxlength: { requiredLength: 10 } })).toBe('Máximo de caracteres 10 excedido.');
  });

  it('debe retornar mensaje para solo números', () => {
    expect(getErrorMessage({
      pattern: {
        requiredPattern: '/^[0-9]+$/'
      }
    })).toBe('Solo se permiten números.');
  });

  it('debe retornar mensaje para números con o sin +', () => {
    expect(getErrorMessage({
      pattern: {
        requiredPattern: '/^\\+?[0-9]{1,13}$/'
      }
    })).toBe('Solo se permiten números, con o sin + al inicio.');
  });

  it('debe retornar mensaje para correo electrónico inválido (pattern)', () => {
    expect(getErrorMessage({
      pattern: {
        requiredPattern: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/'
      }
    })).toBe('Correo electrónico inválido.');
  });

  it('debe retornar mensaje para correo electrónico inválido (email)', () => {
    expect(getErrorMessage({ email: true })).toBe('Correo electrónico inválido.');
  });

  it('debe retornar "Formato inválido" si pattern no es reconocido', () => {
    expect(getErrorMessage({
      pattern: {
        requiredPattern: '/otro-patron/'
      }
    })).toBe('Formato inválido.');
  });

  it('debe retornar "Campo inválido" si el error no es reconocido', () => {
    expect(getErrorMessage({ customError: true })).toBe('Campo inválido.');
  });

});
