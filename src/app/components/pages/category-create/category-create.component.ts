import { Component } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent {

  constructor(private categoryService: CategoryService) {}

  sendData() {
    const payload = {
      name: "Categoria desde el front",
      description: "Categoria desde el front description",
    }

    this.categoryService.postData(payload).subscribe({
      next: (response) => {
        console.log(`La respuesta de api es: ${response}`);
      },
      error: (e) => {
        console.log(`El ERROR de api es: ${e}`);
      }
    })

  }



}
