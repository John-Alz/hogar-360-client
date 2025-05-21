import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PorpertyListComponent } from './porperty-list.component';
import { PropertyService } from 'src/app/shared/services/property/property.service';
import { Page } from 'src/app/shared/models/page';
import { Property, PropertyResponse } from 'src/app/shared/models/property';
import { Category } from 'src/app/shared/models/category';
import { Location } from 'src/app/shared/models/location';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryService } from 'src/app/shared/services/category.service';

describe('PorpertyListComponent', () => {
  let component: PorpertyListComponent;
  let fixture: ComponentFixture<PorpertyListComponent>;
  let propertyServiceMock: jest.Mocked<PropertyService>;
  let mockCategoryService: jest.Mocked<CategoryService>;


    const mockPage: Page<Property> = {
      content: [{ id: 1, name: 'nombre property', description: 'description property', direction: 'direction property', categoryId: 1, roomCount: 2, bathroomCount: 3, price: 145000000, locationId: 1, activePublicationDate: new Date('2025-05-20')}],
      pageNumber: 3,
      pageSize: 0,
      totalPages: 2,
      totalElements: 6
    };

  beforeEach( async () => {

    propertyServiceMock = {
          getProperties: jest.fn().mockReturnValue(of(mockPage))
        } as any;

      mockCategoryService = {
            getData: jest.fn().mockReturnValue(of({}))
          } as unknown as jest.Mocked<CategoryService>

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PorpertyListComponent],
      providers: [
              { provide: PropertyService, useValue: propertyServiceMock },
              { provide: CategoryService, useValue: mockCategoryService },
            ]
    });
    fixture = TestBed.createComponent(PorpertyListComponent);
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

  it('should to change the page and call getProperties', () => {
    const spy = jest.spyOn(component, 'getProperties');
    let newPage = 2;
    component.onPageChanged(newPage);
    expect(spy).toHaveBeenCalledWith(component.ascendingOrder, component.categoryFilter, component.locationFilter, component.minRooms, component.minBathrooms, component.minPrice, component.maxPrice);
    expect(component.pageNumber).toBe(newPage);
  });

   it('Sholud initialize and call getCategories in ngOnInit', () => {
    expect(mockCategoryService.getData).toHaveBeenCalled();
  });

  it('should update filters and call getProperties when sendData is called', () => {
    component.countRooms.setValue(2);
    component.countBaths.setValue(1);
    component.priceMinRange.setValue(100);
    component.priceMaxRange.setValue(500);
    component.sendData();

    expect(propertyServiceMock.getProperties).toHaveBeenCalled();
    expect(component.minRooms).toBe(2)
    expect(component.minBathrooms).toBe(1)
    expect(component.minPrice).toBe(100)
    expect(component.maxPrice).toBe(500)
  });

  it('should reset the page to 0, set search and call getProperties when searchValue changes', fakeAsync(() => {
    component.getProperties = jest.fn();

    component.ngOnInit();
    component.pageNumber = 5; // valor previo para confirmar que lo reinicia

    component.searchValue.setValue('test');
    tick(300); // simula debounceTime

    expect(component.pageNumber).toBe(0);
    expect(component.locationFilter).toBe('test')
    expect(component.getProperties).toHaveBeenCalledWith(component.ascendingOrder, component.categoryFilter, 'test', component.minRooms, component.minBathrooms, component.minPrice, component.maxPrice);
  }));

  it('should reset the page to 0, set category and call getProperties when categoty changes', () => {
    component.getProperties = jest.fn();

    component.ngOnInit();
    component.pageNumber = 5; // valor previo para confirmar que lo reinicia

    component.searchCategory.setValue('test');

    expect(component.pageNumber).toBe(0);
    expect(component.categoryFilter).toBe('test')
    expect(component.getProperties).toHaveBeenCalledWith(component.ascendingOrder, 'test', component.locationFilter, component.minRooms, component.minBathrooms, component.minPrice, component.maxPrice);
  });

  it('should reset the page to 0, set order and call getProperties when order changes', () => {
    component.getProperties = jest.fn();

    component.ngOnInit();
    component.pageNumber = 5; // valor previo para confirmar que lo reinicia

    component.orderChange.setValue(true);

    expect(component.pageNumber).toBe(0);
    expect(component.ascendingOrder).toBe(true)
    expect(component.getProperties).toHaveBeenCalledWith(true, component.categoryFilter, component.locationFilter, component.minRooms, component.minBathrooms, component.minPrice, component.maxPrice);
  });

  it('should set locationFilter to the search value if not null', fakeAsync(() => {
  component.searchValue.setValue('medellín');
  tick(300);
  expect(component.locationFilter).toBe('medellín');
}));

it('should set locationFilter to empty string if search value is null', fakeAsync(() => {
  component.searchValue.setValue(null);
  tick(300);
  expect(component.locationFilter).toBe('');
}));

  it('should set categoryFilter to the search value if not null', fakeAsync(() => {
  component.searchCategory.setValue('casa');
  tick(300);
  expect(component.categoryFilter).toBe('casa');
}));

it('should set categoryFilter to empty string if search value is null', fakeAsync(() => {
  component.searchCategory.setValue(null);
  tick(300);
  expect(component.categoryFilter).toBe('');
}));

  it('should set categoryFilter to the search value if not null', fakeAsync(() => {
  component.orderChange.setValue(true);
  tick(300);
  expect(component.ascendingOrder).toBe(true);
}));

it('should set order to empty string if order value is null', fakeAsync(() => {
  component.orderChange.setValue(null);
  tick(300);
  expect(component.ascendingOrder).toBe(true);
}));

});
