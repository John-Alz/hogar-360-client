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

  it('Debe inicializar y llamar a getCategories en ngOnInit', () => {
    const spy = jest.spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('Debería llamar a getCategories y actualizar totalPages y pages', () => {
    component.getCategories();
    component.pageResponse.subscribe((res) => {
      expect(res.totalPages).toBe(3);
      expect(component.totalPages).toBe(3);
      expect(component.pages).toEqual([0,1]);
    })
  });

  it('Debería ir a la página siguiente si es posible', () => {
    component.totalPages = 3;
    component.page =  0;
    const spy = jest.spyOn(component, 'getCategories');
    component.nextPage();
    expect(component.page).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('No debería pasar a la página siguiente si ya está en la última', () => {
    component.totalPages = 2;
    component.page = 1;
    const spy = jest.spyOn(component, 'getCategories');
    component.nextPage();
    expect(component.page).toBe(1)
    expect(spy).not.toHaveBeenCalled();
  });

  it('Debería ir a la página anterior si es posible', () => {
    component.page = 1;
    const spy = jest.spyOn(component, 'getCategories');
    component.prevPage();
    expect(component.page).toBe(0);
    expect(spy).toHaveBeenCalled();
  });

  it('Debería ir a la página seleccionada usando goPage()', () => {
    const spy = jest.spyOn(component, "getCategories");
    component.goPage(2);
    expect(component.page).toBe(2);
    expect(spy).toHaveBeenCalled();
  });






});
