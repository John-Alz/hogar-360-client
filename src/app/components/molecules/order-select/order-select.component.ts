import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-select',
  templateUrl: './order-select.component.html',
  styleUrls: ['./order-select.component.scss']
})
export class OrderSelectComponent {

  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() optionLabelOne: string = "A-Z";
  @Input() optionLabelTwo: string = "Z-A";

}
