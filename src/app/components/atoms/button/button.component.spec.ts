import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir el evento buttonClick al hacer click', () => {
    jest.spyOn(component.buttonClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });


});
