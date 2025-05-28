import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCalendar, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  faTrash = faTrash;
  faCalendar = faCalendar;
  isOpen = false;
  @Input() info!: any;
  @Output() greet = new EventEmitter<boolean>();
  @Output() greetTwo = new EventEmitter<number>();

  getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);

}

  sendFlag(): void {
    let def = true
    this.greet.emit(def)
  }


  sendPropertyId(id: number): void {
    this.greetTwo.emit(id)
  }



}
