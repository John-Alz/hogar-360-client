import { Component, Input } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() formControlName!: string;
}
