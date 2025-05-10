import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.getFunction = jest.fn();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('Debería ir a la página siguiente si es posible', () => {
  component.totalPages = 3;
  component.page = 0;
  const emitSpy = jest.spyOn(component.pageChange, 'emit');

  component.nextPage();

  expect(emitSpy).toHaveBeenCalledWith(1);
  expect(component.getFunction).toHaveBeenCalled();
});

it('No debería pasar a la página siguiente si ya está en la última', () => {
  component.totalPages = 2;
  component.page = 1;
  const emitSpy = jest.spyOn(component.pageChange, 'emit');

  component.nextPage();

  expect(emitSpy).not.toHaveBeenCalled();
  expect(component.getFunction).not.toHaveBeenCalled();
});

it('Debería ir a la página anterior si es posible', () => {
  component.page = 1;
  const emitSpy = jest.spyOn(component.pageChange, 'emit');

  component.prevPage();

  expect(emitSpy).toHaveBeenCalledWith(0);
  expect(component.getFunction).toHaveBeenCalled();
});

it('Debería ir a la página seleccionada usando goPage()', () => {
  const emitSpy = jest.spyOn(component.pageChange, 'emit');

  component.goPage(2);

  expect(emitSpy).toHaveBeenCalledWith(2);
  expect(component.getFunction).toHaveBeenCalled();
});

});
