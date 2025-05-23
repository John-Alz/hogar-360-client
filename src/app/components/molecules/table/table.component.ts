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

  getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);

}

  sendMessage(): void {
    let def = this.isOpen = !this.isOpen
    this.greet.emit(def)
  }


//  getValueByPath2(obj: any, path: string): any {
//   let elements = path.split('.');
//   for (const element in obj) {
//     console.log(obj[element]);

//   }
//   console.log(elements);

// }


}
