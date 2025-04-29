import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {


  constructor(private categoryService: CategoryService, private toastr: ToastrService) {}


  name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  description = new FormControl('', [Validators.required, Validators.maxLength(90)]);

  sendData() {
    const payload = {
      name: this.name.value,
      description: this.description.value,
    }

    this.categoryService.postData(payload).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success(response.message)
      },
      error: (e) => {
        console.log(e.error.message);
        // this.toastr.error(e.error.message)
      }
    })

  }

}
