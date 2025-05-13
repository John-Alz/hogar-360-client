import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorpertyFormComponent } from './porperty-form.component';

describe('PorpertyFormComponent', () => {
  let component: PorpertyFormComponent;
  let fixture: ComponentFixture<PorpertyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorpertyFormComponent]
    });
    fixture = TestBed.createComponent(PorpertyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
