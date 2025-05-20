import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CounterComponent]
    });
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(5);
    component.tag = 'habitaciones'
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should increment the control value by 1', () => {
    component.increment()
    expect(component.control.value).toBe(6);
  });

  it('should decrement the control value by 1', () => {
    component.decrement()
    expect(component.control.value).toBe(4);
  });

    it('should have defined FontAwesome icons', () => {
    expect(component.arrowUp).toBeDefined();
    expect(component.arrowDown).toBeDefined();
  });


});
