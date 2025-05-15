import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LocationListComponent } from './location-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocationService } from 'src/app/shared/services/location/location.service';
import { Page } from 'src/app/shared/models/page';
import { Location } from 'src/app/shared/models/location';
import { of } from 'rxjs';

describe('LocationListComponent', () => {
  let component: LocationListComponent;
  let fixture: ComponentFixture<LocationListComponent>;
  let locationServiceMock: jest.Mocked<LocationService>;

  const mockPage: Page<Location> = {
    content: [{ id: 1, cityId: 1, barrio: 'Test barrio' }],
    pageNumber: 3,
    pageSize: 0,
    totalPages: 2,
    totalElements: 6
  };

  beforeEach(async () => {

    locationServiceMock = {
      getLocations: jest.fn().mockReturnValue(of(mockPage))
    } as any;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LocationListComponent],
      providers: [
        { provide: LocationService, useValue: locationServiceMock }
      ]
    });
    fixture = TestBed.createComponent(LocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Sholud initialize and call getLocations in ngOnInit', () => {
    const spy = jest.spyOn(component, 'getLocations');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(component.search, component.orderAsc);
  });

  it('should to change the page and call get Locations', () => {
    const spy = jest.spyOn(component, 'getLocations');
    let newPage = 2;
    component.onPageChanged(newPage);
    expect(spy).toHaveBeenCalledWith(component.search, component.orderAsc);
    expect(component.page).toBe(newPage);
  });

it('should reset the page to 0, set search and call getLocations when searchValue changes', fakeAsync(() => {
  component.getLocations = jest.fn();

  component.ngOnInit();
  component.page = 5; // valor previo para confirmar que lo reinicia

  component.searchValue.setValue('test');
  tick(300); // simula debounceTime

  expect(component.page).toBe(0);
  expect(component.search).toBe('test');
  expect(component.getLocations).toHaveBeenCalledWith('test', component.orderAsc);
}));

it('should reset the page to 0, set orderAsc and call getLocations when order changes', () => {
  component.getLocations = jest.fn();

  component.ngOnInit();
  component.page = 5; // valor previo para confirmar que lo reinicia

  component.order.setValue('false'); // esto debería hacer orderAsc = false

  expect(component.page).toBe(0);
  expect(component.orderAsc).toBe(false);
  expect(component.getLocations).toHaveBeenCalledWith(component.search, false);
});



});
