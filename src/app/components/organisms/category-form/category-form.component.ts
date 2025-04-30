import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]]
    })
  }

  get categoryName(): FormControl {
    return this.categoryForm.get('name') as FormControl;
  }

  get categoryDescription(): FormControl {
    return this.categoryForm.get('description') as FormControl;
  }

  sendData(): void {

    if(this.categoryName.hasError("required") || this.categoryDescription.hasError("required")) {
      this.toastr.warning("Debes llenar todos  los campos requeridos.")
      return;
    }

    const payload: Category = {
      name: this.categoryForm.value.name?.trim() || '',
      description: this.categoryForm.value.description?.trim() || ''
    }

    this.categoryService.postData(payload).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success('Categoria creada.');
        this.categoryForm.reset();
      },
      error: (e) => {
        console.log(e.error);
        this.toastr.error("No se pudo crear la categoria.")
      }
    })



  }

}
