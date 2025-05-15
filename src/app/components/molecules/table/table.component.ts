import { Component, Input } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  faTrash = faTrash;
  @Input() info!: any;

  getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}



//  getValueByPath2(obj: any, path: string): any {
//   let elements = path.split('.');
//   for (const element in obj) {
//     console.log(obj[element]);

//   }
//   console.log(elements);

// }


}
