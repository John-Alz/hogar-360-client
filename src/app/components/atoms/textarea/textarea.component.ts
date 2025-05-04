import { Component, forwardRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

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

}
