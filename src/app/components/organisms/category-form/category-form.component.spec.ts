import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

import { CategoryFormComponent } from './category-form.component';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AtomsModule, MoleculesModule, HttpClientTestingModule, ToastrModule.forRoot(), ReactiveFormsModule],
      declarations: [CategoryFormComponent]
    });
    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería funcionar Jest', () => {
    expect(1 + 1).toBe(2);
  });

});
