import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { CategoryFormComponent } from './category-form.component';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';
import { of, throwError } from 'rxjs';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let mockToastr: any;
  let mockCategoryService: any;

  beforeEach(async () => {

    mockToastr = { warning: jest.fn(), success: jest.fn(), error: jest.fn() };
    mockCategoryService = { postData: jest.fn().mockReturnValue(of({ message: 'ok' })) }

    await TestBed.configureTestingModule({
      imports: [AtomsModule, MoleculesModule, HttpClientTestingModule, ToastrModule.forRoot(), ReactiveFormsModule],
      declarations: [CategoryFormComponent],
      providers: [
        { provide: ToastrService, useValue: mockToastr },
        { provide: CategoryService, useValue: mockCategoryService },
      ]
    });
    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('You should call the service if the form is valid', () => {
    component.categoryForm.controls['name'].setValue('Casas de lujo.');
    component.categoryForm.controls['description'].setValue('Casa de lujo equipadad con utima tecnologia.');

    component.sendData();

    expect(mockToastr.success).toHaveBeenCalledWith('Categoria creada.')
    expect(mockCategoryService.postData).toHaveBeenCalled();

  });

  it('should handle service errors when creating a category', () => {
    mockCategoryService.postData.mockReturnValue(throwError(() => ({ error: 'error inesperado.' })));

    component.categoryForm.controls['name'].setValue('Casas de lujo.');
    component.categoryForm.controls['description'].setValue('Casa de lujo equipadad con utima tecnologia.');

    component.sendData();

    expect(mockToastr.error).toHaveBeenCalledWith('No se pudo crear la categoria.');

  });


  it('Should display errors if an empty form is submitted.', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.categoryForm, 'markAllAsTouched');
    component.categoryForm.controls['name'].setValue('');
    component.categoryForm.controls['description'].setValue('');
    component.sendData();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(mockCategoryService.postData).not.toHaveBeenCalled();
  });


});
