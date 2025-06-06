import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TextareaComponent } from './textarea.component';
import { getErrorMessage } from 'src/app/shared/helpers/error-message';

jest.mock('src/app/shared/helpers/error-message');

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;

    // Assign a FormControl to avoid template or logic errors
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
      const control = new FormControl('valid text');
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

      (getErrorMessage as jest.Mock).mockReturnValue('Field is required');

      const error = component.getError(control);

      expect(getErrorMessage).toHaveBeenCalledWith(control.errors);
      expect(error).toBe('Field is required');
    });
  });

  describe('count', () => {
    it('should update the count when the control value changes', () => {
      component.control.setValue('hello');
      expect(component.count).toBe(5);

      component.control.setValue('hello world');
      expect(component.count).toBe(11);
    });

    it('should handle null or empty values', () => {
      component.control.setValue(null);
      expect(component.count).toBe(0);

      component.control.setValue('');
      expect(component.count).toBe(0);
    });
  });
});
