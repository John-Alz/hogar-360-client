import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { getErrorMessage } from 'src/app/shared/helpers/error-message';

jest.mock('src/app/shared/helpers/error-message');

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getError()', () => {
    it('should return null if the control is null', () => {
      expect(component.getError(null)).toBeNull();
    });

    it('should return null if the control has no errors', () => {
      const control = new FormControl('valor válido');
      control.markAsTouched();
      expect(component.getError(control)).toBeNull();
    });

    it('should return null if the control is not touched', () => {
      const control = new FormControl('', [Validators.required]);
      control.setErrors({ required: true });
      expect(component.getError(control)).toBeNull();
    });

    it('should return error message if the control is touched and has errors', () => {
      const control = new FormControl('', [Validators.required]);
      control.setErrors({ required: true });
      control.markAsTouched();

      (getErrorMessage as jest.Mock).mockReturnValue('Campo requerido');

      const error = component.getError(control);

      expect(getErrorMessage).toHaveBeenCalledWith(control.errors);
      expect(error).toBe('Campo requerido');
    });
  });
});
