import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Page } from 'src/app/shared/models/page';
import { Category } from 'src/app/shared/models/category';
import { of } from 'rxjs';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let categoryServiceMock: jest.Mocked<CategoryService>;

  const mockPage: Page<Category> = {
    content: [{ id: 1, name: 'Test Category', description: 'Test description' }],
    pageNumber: 3,
    pageSize: 0,
    totalPages: 2,
    totalElements: 6
  };

  beforeEach( async () => {

    categoryServiceMock = {
      getData: jest.fn().mockReturnValue(of(mockPage))
    } as any;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ],
      declarations: [CategoryListComponent],
      providers: [
        {provide: CategoryService, useValue: categoryServiceMock}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should initialize and call getCategories in ngOnInit', () => {
    const spy = jest.spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call getCategories and update totalPages and pages', () => {
    component.getCategories();
    component.pageResponse.subscribe((res) => {
      expect(res.totalPages).toBe(3);
      expect(component.totalPages).toBe(3);
      expect(component.pages).toEqual([0,1]);
    })
  });

  it('Should page and call getCategories', () => {
    const spy = jest.spyOn(component, 'getCategories');
    let newPage = 2;
    component.onPageChanged(newPage);
    expect(spy).toHaveBeenCalled();
    expect(component.page).toBe(newPage);
  });

});
