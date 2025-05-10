import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSelectComponent } from './order-select.component';

describe('OrderSelectComponent', () => {
  let component: OrderSelectComponent;
  let fixture: ComponentFixture<OrderSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSelectComponent]
    });
    fixture = TestBed.createComponent(OrderSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
