import { Component, inject, OnInit } from '@angular/core';
import { faTrash, faPen, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Page } from 'src/app/shared/models/page';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  faTrash = faTrash;
  faPen = faPen;
  prev = faChevronLeft;
  next = faChevronRight;

  info: { headers: object[], data: Category[] } = {
    headers: [
      {
        key: 'id',
        header: 'ID'
      },
      {
        key: 'name',
        header: 'Nombre'
      },
      {
        key: 'description',
        header: 'Descripcion'
      },
    ],
    data: [] as Category[]
  }

  pageResponse!: Observable<Page<Category>>;

  page = 0;
  size = 2;
  totalPages = 1;
  pages: number[] = [];

  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.getCategories();
  }

  onPageChanged(newPage: number): void {
    this.page = newPage;
    this.getCategories();
  }


  getCategories(): void {
    this.pageResponse = this.categoryService.getData(this.page, this.size).pipe(map((data) => {
      this.totalPages = data.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      this.info.data = data.content;
      return data;
    }));
  }




}
