import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorpertyListComponent } from './porperty-list.component';

describe('PorpertyListComponent', () => {
  let component: PorpertyListComponent;
  let fixture: ComponentFixture<PorpertyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorpertyListComponent]
    });
    fixture = TestBed.createComponent(PorpertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
