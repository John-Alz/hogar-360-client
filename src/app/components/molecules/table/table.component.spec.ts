import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: ''
})
class MockIconComponent {
  @Input() icon: any;
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent, MockIconComponent]
    });

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('debería renderizar los datos correctamente', () => {
    component.info = {
      headers: [
        { header: 'Nombre', key: 'name' },
        { header: 'Edad', key: 'age' }
      ],
      data: [
        { name: 'Pedro', age: 40 }
      ]
    };

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const cells = compiled.querySelectorAll('.table__cell');

    expect(cells.length).toBe(3);
    expect(cells[0].textContent).toContain('Pedro');
    expect(cells[1].textContent).toContain('40');
  });
});
