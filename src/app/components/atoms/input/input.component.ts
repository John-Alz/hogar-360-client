import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getErrorMessage } from 'src/app/shared/helpers/error-message';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() type: string = "text";
  @Input() placeholder!: string;
  @Input() value!: string;
  @Input() control!: FormControl;
  @Input() class!: string;
  @Input() errorMessage!: string;


  getError(control: AbstractControl | null): string | null {
      if (!control || !control.errors || !control.touched) return null;
      return getErrorMessage(control.errors)
  }

}
