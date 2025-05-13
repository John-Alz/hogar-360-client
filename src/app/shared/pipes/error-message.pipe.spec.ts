import { ErrorMessagePipe } from './error-message.pipe';

describe('ErrorMessagePipe', () => {
  let pipe: ErrorMessagePipe;

  beforeEach(() => {
    pipe = new ErrorMessagePipe();
  });

  it('should return null if no errors', () => {
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform(undefined)).toBeNull();
  });

  it('should return required message', () => {
    const errors = { required: true };
    expect(pipe.transform(errors)).toBe('Este campo es obligatorio.');
  });

  it('should return maxlength message', () => {
    const errors = { maxlength: { requiredLength: 10 } };
    expect(pipe.transform(errors)).toBe('Máximo de caracteres 10 excedido.');
  });

  it('should return pattern message for numbers only', () => {
    const errors = { pattern: { requiredPattern: '/^[0-9]+$/' } };
    expect(pipe.transform(errors)).toBe('Solo se permiten números.');
  });

  it('should return pattern message for phone number format', () => {
    const errors = { pattern: { requiredPattern: '/^\\+?[0-9]{1,13}$/' } };
    expect(pipe.transform(errors)).toBe('Solo se permiten números, con o sin + al inicio.');
  });

  it('should return pattern message for email format', () => {
    const errors = { pattern: { requiredPattern: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/' } };
    expect(pipe.transform(errors)).toBe('Correo electrónico inválido.');
  });

  it('should return default pattern message for unknown pattern', () => {
    const errors = { pattern: { requiredPattern: '/some/unknown/pattern/' } };
    expect(pipe.transform(errors)).toBe('Formato inválido.');
  });

  it('should return email validator message', () => {
    const errors = { email: true };
    expect(pipe.transform(errors)).toBe('Correo electrónico inválido.');
  });

  it('should return default error message', () => {
    const errors = { unknown: true };
    expect(pipe.transform(errors)).toBe('Campo inválido.');
  });
});
