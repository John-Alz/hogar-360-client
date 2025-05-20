import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { getErrorMessage } from 'src/app/shared/helpers/error-message';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent {
  @Input() text!: string;
  @Input() placeholder!: string;
  @Input() value!: string;
  @Input() control!: FormControl<string | null>;


  count = 0;

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.count = value?.length || 0;
    });
  }

  getError(control: AbstractControl | null): string | null {
        if (!control || !control.errors || !control.touched) return null;
        return getErrorMessage(control.errors)
    }

}
