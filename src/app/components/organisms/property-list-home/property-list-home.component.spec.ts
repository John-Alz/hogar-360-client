import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyListHomeComponent } from './property-list-home.component';

describe('PropertyListHomeComponent', () => {
  let component: PropertyListHomeComponent;
  let fixture: ComponentFixture<PropertyListHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyListHomeComponent]
    });
    fixture = TestBed.createComponent(PropertyListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
