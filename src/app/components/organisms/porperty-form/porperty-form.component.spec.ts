import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorpertyFormComponent } from './porperty-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PropertyService } from 'src/app/shared/services/property/property.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { of, throwError } from 'rxjs';
import { LocationService } from 'src/app/shared/services/location/location.service';
import { CategoryService } from 'src/app/shared/services/category.service';

describe('PorpertyFormComponent', () => {
  let component: PorpertyFormComponent;
  let fixture: ComponentFixture<PorpertyFormComponent>;
  let mockPropertyService: any;
  let mockLocationService: jest.Mocked<LocationService>;
  let mockCategoryService: jest.Mocked<CategoryService>;
  let mockNotificationService: any;

  const mockValidPropertyForm = {
  name: 'test property',
  description: 'test description',
  direction: 'Test direction',
  categoryId: 1,
  roomCount: 2,
  bathroomCount: 2,
  price: 150000000,
  locationId: 2,
  activePublicationDate: new Date('2025-05-20')
};

const mockEmptyPropertyForm = {
  name: '',
  description: '',
  direction: '',
  categoryId: null,
  roomCount: null,
  bathroomCount: null,
  price: null,
  locationId: null,
  activePublicationDate: null
};


    const fakeResponse = {
    content: [],
    pageNumber: 0,
    pageSize: 10,
    totalPages: 5,
    totalElements: 20
  };

  beforeEach(async () => {

    mockPropertyService = {
      postProperty: jest.fn().mockReturnValue(of({}))
    };

     mockCategoryService = {
      getData: jest.fn().mockReturnValue(of({}))
    } as unknown as jest.Mocked<CategoryService>

     mockLocationService = {
      getLocations: jest.fn().mockReturnValue(of({}))
    } as unknown as jest.Mocked<LocationService>

    mockNotificationService = {
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      declarations: [PorpertyFormComponent],
      providers: [
        { provide: PropertyService, useValue: mockPropertyService },
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: LocationService, useValue: mockLocationService },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });
    fixture = TestBed.createComponent(PorpertyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call the service if the form is valid', () => {
    component.propertyForm.patchValue(mockValidPropertyForm)

    component.sendData();

    expect(mockPropertyService.postProperty).toHaveBeenCalledWith(mockValidPropertyForm);
    expect(mockNotificationService.success).toHaveBeenCalledWith('Propiedad creada.');
  });

  it('Should call the service if the form is valid', () => {
    component.propertyForm.patchValue(mockEmptyPropertyForm);

    component.sendData();

    expect(mockPropertyService.postProperty).not.toHaveBeenCalled();
    expect(mockNotificationService.success).not.toHaveBeenCalled();
  });

  it('Should handle errors from the postProperty service', () => {
    mockPropertyService.postProperty.mockReturnValueOnce(
      throwError(() => ({ error: { message: 'Error del backend' } }))
    );

    component.propertyForm.patchValue(mockValidPropertyForm);

    component.sendData();

    expect(mockNotificationService.error).toHaveBeenCalledWith('Error del backend');
  });

  it('should call getCategories and getLocations on initialization', () => {

    const spy = jest.spyOn(component, 'getCategories');
    const spy2 = jest.spyOn(component, 'getLocations');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should call categoryService.getData and assign pageResponse and totalPages', (done) => {


  mockCategoryService.getData.mockReturnValue(of(fakeResponse));


  component.getCategories();

  component.pageResponseCategories.subscribe((res) => {
    expect(mockCategoryService.getData).toHaveBeenCalledWith(component.page, component.size);
    expect(component.totalPages).toBe(fakeResponse.totalPages);
    expect(res).toEqual(fakeResponse);
    done();
  });
  });

  it('should call locationService.getLocations and assign pageResponse and totalPages', (done) => {
  mockLocationService.getLocations.mockReturnValue(of(fakeResponse));

  component.getLocations();

  component.pageResponseLocation.subscribe((res) => {
    expect(mockLocationService.getLocations).toHaveBeenCalledWith(
      component.page,
      component.size,
      component.search,
      component.orderAsc
    );
    expect(component.totalPages).toBe(fakeResponse.totalPages);
    expect(res).toEqual(fakeResponse);
    done();
  });
});



});
