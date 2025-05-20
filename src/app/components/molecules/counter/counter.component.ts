import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faCircleChevronDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  @Input() tag!: string;
  @Input() control!: FormControl;

  arrowUp = faCircleChevronUp;
  arrowDown = faCircleChevronDown;

  count: number = 0;

  increment() {
    this.control.setValue(this.control.value + 1)
  }

  decrement() {
    this.control.setValue(this.control.value - 1)
  }



}
