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

    mockToastr = {warning: jest.fn(), success: jest.fn(), error: jest.fn()};
    mockCategoryService = {postData: jest.fn().mockReturnValue(of({message: 'ok'}))}

    await TestBed.configureTestingModule({
      imports: [AtomsModule, MoleculesModule, HttpClientTestingModule, ToastrModule.forRoot(), ReactiveFormsModule],
      declarations: [CategoryFormComponent],
      providers: [
        {provide: ToastrService, useValue: mockToastr},
        {provide: CategoryService, useValue: mockCategoryService},
      ]
    });
    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('debería llamar al servicio si el formulario es válido', () => {
    component.categoryForm.controls['name'].setValue('Casas de lujo.');
    component.categoryForm.controls['description'].setValue('Casa de lujo equipadad con utima tecnologia.');

    component.sendData();

    expect(mockToastr.success).toHaveBeenCalledWith('Categoria creada.')
    expect(mockCategoryService.postData).toHaveBeenCalled();

  });

  it('debería manejar errores del servicio al crear una categoría', () => {
    mockCategoryService.postData.mockReturnValue(throwError(() => ({error: 'error inesperado.'})));

    component.categoryForm.controls['name'].setValue('Casas de lujo.');
    component.categoryForm.controls['description'].setValue('Casa de lujo equipadad con utima tecnologia.');

    component.sendData();

    expect(mockToastr.error).toHaveBeenCalledWith('No se pudo crear la categoria.');

  });

  it('Debería mostrar un error si el nombre de la categoría está vacío', () => {
    component.categoryForm.controls['name'].setValue('');
    component.categoryForm.controls['name'].markAsTouched();

    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.categoryForm__errros--item');
    expect(errorElement.textContent).toContain('El nombre es obligatorio.');

  });

  it('Debería mostrar un error si el nombre de la categoría supera los 50 caracteres', () => {
    component.categoryForm.controls['name'].setValue('a'.repeat(51));
    component.categoryForm.controls['name'].markAsTouched();

    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.categoryForm__errros--item');
    expect(errorElement.textContent).toContain('El nombre no puede tener mas de 50 caracteres.');

  });


  it('Debería mostrar un error si la descripcion de la categoría está vacío', () => {
    component.categoryForm.controls['description'].setValue('');
    component.categoryForm.controls['description'].markAsTouched();

    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.categoryForm__errros--item');
    expect(errorElement.textContent).toContain('La descripcion es obligatoria.');

  });

  it('Debería mostrar un error si la descripcion de la categoría supera los 90 caracteres', () => {
    component.categoryForm.controls['description'].setValue('a'.repeat(91));
    component.categoryForm.controls['description'].markAsTouched();

    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.categoryForm__errros--item');
    expect(errorElement.textContent).toContain('la descripcion no puede tener mas de 90 caracteres.');

  });


});
