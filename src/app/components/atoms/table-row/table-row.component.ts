import { Component, Input } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'tr[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent {

    faTrash = faTrash;
    faPen = faPen;

  @Input() category!: Category;

}
