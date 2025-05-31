import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PropertyListHomeComponent } from './property-list-home.component';
import { PropertyService } from 'src/app/shared/services/property/property.service';
import { Property } from 'src/app/shared/models/property';
import { Page } from 'src/app/shared/models/page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

describe('PropertyListHomeComponent', () => {
  let component: PropertyListHomeComponent;
  let fixture: ComponentFixture<PropertyListHomeComponent>;
  let propertyServiceMock: jest.Mocked<PropertyService>;
  let categoryServiceMock: jest.Mocked<CategoryService>;


  const mockPage: Page<Property> = {
    content: [{ id: 1, name: 'nombre property', description: 'description property', direction: 'direction property', categoryId: 1, roomCount: 2, bathroomCount: 3, price: 145000000, locationId: 1, activePublicationDate: new Date('2025-05-20'), userId: 12 }],
    pageNumber: 3,
    pageSize: 0,
    totalPages: 2,
    totalElements: 6
  };


  beforeEach(async () => {

    propertyServiceMock = {
      getProperties: jest.fn().mockReturnValue(of(mockPage))
    } as unknown as jest.Mocked<PropertyService>;

    categoryServiceMock = {
      getData: jest.fn().mockReturnValue(of({}))
    } as unknown as jest.Mocked<CategoryService>;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PropertyListHomeComponent],
      providers: [
        { provide: PropertyService, useValue: propertyServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
      ]
    });
    fixture = TestBed.createComponent(PropertyListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Sholud initialize and call getProperties in ngOnInit', () => {
    const spy = jest.spyOn(component, 'getProperties');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(component.ascendingOrder, component.categoryFilter, component.locationFilter, component.minRooms, component.minBathrooms, component.minPrice, component.maxPrice);
  });

  it('Sholud initialize and call getCategories in ngOnInit', () => {
    expect(categoryServiceMock.getData).toHaveBeenCalled();
  });

  it('should update filters and call getProperties when sendData is called', () => {
    component.countRooms.setValue(2);
    component.countBaths.setValue(1);
    component.priceMinRange.setValue(100);
    component.priceMaxRange.setValue(500);
    component.sendDataFilters();

    expect(propertyServiceMock.getProperties).toHaveBeenCalled();
    expect(component.minRooms).toBe(2)
    expect(component.minBathrooms).toBe(1)
    expect(component.minPrice).toBe(100)
    expect(component.maxPrice).toBe(500)
  });

it('should reset the page to 0, set category and call getProperties when categoty changes', () => {
    component.getProperties = jest.fn();

    component.ngOnInit();
    component.pageNumber = 5;

    component.categoryId.setValue('test');

    expect(component.pageNumber).toBe(0);
    expect(component.categoryFilter).toBe('test')
    expect(component.getProperties).toHaveBeenCalledWith(component.ascendingOrder, 'test', component.locationFilter, component.minRooms, component.minBathrooms, component.minPrice, component.maxPrice);
  });

  it('should set locationFilter to empty string if search value is null', fakeAsync(() => {
    component.searchLocation.setValue('');
    tick(300);
    expect(component.locationFilter).toBe('');
  }));

  it('should apply filters and call getProperties', () => {
    const spy = jest.spyOn(component, 'getProperties');
    component.countRooms.setValue(2);
    component.countBaths.setValue(1);
    component.priceMinRange.setValue(500000);
    component.priceMaxRange.setValue(1000000);

    component.sendDataFilters();

    expect(component.minRooms).toBe(2);
    expect(component.minBathrooms).toBe(1);
    expect(component.minPrice).toBe(500000);
    expect(component.maxPrice).toBe(1000000);
    expect(spy).toHaveBeenCalled();
  });

  it('should apply filters and call getProperties', () => {
    const spy = jest.spyOn(component, 'getProperties');
    component.countRooms.setValue(2);
    component.countBaths.setValue(1);
    component.priceMinRange.setValue(500000);
    component.priceMaxRange.setValue(1000000);

    component.sendDataFilters();

    expect(component.minRooms).toBe(2);
    expect(component.minBathrooms).toBe(1);
    expect(component.minPrice).toBe(500000);
    expect(component.maxPrice).toBe(1000000);
    expect(spy).toHaveBeenCalled();
  });

  it('should open and close filters correctly', () => {
    component.openFilters();
    expect(component.isOpenFilters).toBe(true);

    component.closeFilters();
    expect(component.isOpenFilters).toBe(false);
  });

  it('should update locationFilter and call getProperties with current filters when sendData is called', () => {
  component.searchLocation.setValue('Bogotá');
  component.ascendingOrder = true;
  component.categoryFilter = 'Casa';
  component.minRooms = 2;
  component.minBathrooms = 1;
  component.minPrice = 100;
  component.maxPrice = 500;

  const getPropertiesSpy = jest.spyOn(component, 'getProperties');

  component.sendData();

  expect(component.locationFilter).toBe('Bogotá');
  expect(getPropertiesSpy).toHaveBeenCalledWith(
    true,
    'Casa',
    'Bogotá',
    2,
    1,
    100,
    500
  );
  });

});
