import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ScheduleListComponent } from './schedule-list.component';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { Schedule } from 'src/app/shared/models/schedule';
import { Page } from 'src/app/shared/models/page';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl } from '@angular/forms';

describe('ScheduleListComponent', () => {
  let component: ScheduleListComponent;
  let fixture: ComponentFixture<ScheduleListComponent>;
  let scheduleServiceMock: jest.Mocked<ScheduleService>;


  const mockPage: Page<Schedule> = {
    content: [{ scheduleId: 1, propertyId: 123, startDate: "2025-06-19T10:45:00", endDate: "2025-06-19T12:46:00" }],
    pageNumber: 3,
    pageSize: 0,
    totalPages: 2,
    totalElements: 6
  };


  beforeEach(async () => {

    scheduleServiceMock = {
      getData: jest.fn().mockReturnValue(of(mockPage))
    } as unknown as jest.Mocked<ScheduleService>;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ScheduleListComponent],
      providers: [
        { provide: ScheduleService, useValue: scheduleServiceMock }
      ]
    });
    fixture = TestBed.createComponent(ScheduleListComponent);
    component = fixture.componentInstance;

    // Simular los FormControls
    component.date = new FormControl('2025-06-19');
    component.startHour = new FormControl('10:45:00');
    component.endHour = new FormControl('12:00:00');

    // Simular valores requeridos
    component.orderAsc = true;
    component.location = 'Bogotá';

    // Espía en el método que se debe llamar
    jest.spyOn(component, 'getSchedules');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Sholud initialize and call getSchedules in ngOnInit', () => {
    const spy = jest.spyOn(component, 'getSchedules');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(component.orderAsc, component.location, component.startDate, component.endDate);
  });

  it('should to change the page and call getSchedules', () => {
    const spy = jest.spyOn(component, 'getSchedules');
    let newPage = 2;
    component.onPageChanged(newPage);
    expect(spy).toHaveBeenCalledWith(component.orderAsc, component.location, component.startDate, component.endDate);
    expect(component.page).toBe(newPage);
  });

  it('should set startDate and endDate and call getSchedules with correct values', () => {
    component.sendData();

    expect(component.startDate).toBe('2025-06-19T10:45:00');
    expect(component.endDate).toBe('2025-06-19T12:00:00');
    expect(component.getSchedules).toHaveBeenCalledWith(
      true,
      'Bogotá',
      '2025-06-19T10:45:00',
      '2025-06-19T12:00:00'
    );
  });

  it('should reset the page to 0, set search and call getSchedules when searchValue changes', fakeAsync(() => {
    component.getSchedules = jest.fn();

    component.ngOnInit();
    component.page = 5;

    component.searchValue.setValue('test');
    tick(300); // simula debounceTime

    expect(component.page).toBe(0);
    expect(component.location).toBe('test')
    expect(component.getSchedules).toHaveBeenCalledWith(component.orderAsc, component.location, component.startDate, component.endDate);
  }));

  it('should set location to empty string if search value is null', fakeAsync(() => {
    component.searchValue.setValue(null);
    tick(300);
    expect(component.location).toBe('');
  }));

  it('should set orderasc to the value if not null', fakeAsync(() => {
    component.orderChange.setValue(true);
    tick(300);
    expect(component.orderAsc).toBe(true);
  }));

  it('You should change isOpen to true if it is false.', () => {
    component.isOpen = false;
    component.onChangeOpen();
    expect(component.isOpen).toBe(true)
  });

  it('You should change isOpen to false if it is true.', () => {
    component.isOpen = true;
    component.onChangeOpen();
    expect(component.isOpen).toBe(false)
  });


});
