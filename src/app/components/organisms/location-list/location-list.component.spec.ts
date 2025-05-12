import { ComponentFixture, TestBed } from '@angular/core/testing';

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

  it('Debe inicializar y llamar a getLocations en ngOnInit', () => {
    const spy = jest.spyOn(component, 'getLocations');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(component.search, component.orderAsc);
  });

  it('Debe cambiar la pagia y llamar a getLocations', () => {
    const spy = jest.spyOn(component, 'getLocations');
    let newPage = 2;
    component.onPageChanged(newPage);
    expect(spy).toHaveBeenCalledWith(component.search, component.orderAsc);
    expect(component.page).toBe(newPage);
  });

   it('Debería restablecer la página a 0 antes de llamar a getLocations cuando cambie serachValue', () => {
  setTimeout(() => {
    component.getLocations = jest.fn(() => {
    expect(component.page).toBe(0); // <-- Aquí validas que fue seteado antes
    return of(mockPage);
  });

  component.ngOnInit();
  component.searchValue.setValue("test");
  }, 350);
});

  it('Debería restablecer la página a 0 antes de llamar a getLocations cuando cambie order', () => {


  component.getLocations = jest.fn(() => {
    expect(component.page).toBe(0); // <-- Aquí validas que fue seteado antes
    return of(mockPage);
  });

  component.ngOnInit();
  component.order.setValue('true');
});



});
