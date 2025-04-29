import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() text!: string;
  @Input() placeholder!: string;
  @Input() formControl!: FormControl;

  count = 0;

  ngOnInit() {
    this.formControl.valueChanges.subscribe(value => {
      this.count = value?.length || 0;
    });
  }

}
