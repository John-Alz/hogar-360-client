import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationFormComponent } from './location-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { CityService } from 'src/app/shared/services/city/city.service';
import { DepartmentService } from 'src/app/shared/services/department/department.service';
import { LocationService } from 'src/app/shared/services/location/location.service';
import { of, throwError } from 'rxjs';

describe('LocationFormComponent', () => {

  let component: LocationFormComponent;
  let fixture: ComponentFixture<LocationFormComponent>;
  let mockCityService: any;
  let mockDepartmentService: any;
  let mockLocationService: any;
  let mockNotificationService: any;

  beforeEach(async () => {

    mockCityService = {
      getData: jest.fn().mockReturnValue(of({ content: [], totalPages: 1 }))
    };

    mockDepartmentService = {
      getData: jest.fn().mockReturnValue(of({ content: [], totalPages: 1 }))
    };

    mockLocationService = {
      postLocation: jest.fn().mockReturnValue(of({ message: 'ok' }))
    };

    mockNotificationService = {
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, ToastrModule.forRoot()],
      declarations: [LocationFormComponent],
      providers: [
        { provide: CityService, useValue: mockCityService },
        { provide: DepartmentService, useValue: mockDepartmentService },
        { provide: LocationService, useValue: mockLocationService },
        { provide: NotificationService, useValue: mockNotificationService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service if the form is valid', () => {
    component.locationForm.controls['barrio'].setValue('Barrio de test.');
    component.locationForm.controls['department'].setValue(1);
    component.locationForm.controls['city'].setValue(2);

    component.sendData();

    expect(mockLocationService.postLocation).toHaveBeenCalledWith({
      cityId: 2,
      barrio: 'Barrio de test.'
    });
    expect(mockNotificationService.success).toHaveBeenCalledWith('Ubicacion creada.');
  });

  it('Should not call the service if the form is invalid.', () => {
    component.locationForm.controls['barrio'].setValue('');
    component.locationForm.controls['department'].setValue('');
    component.locationForm.controls['city'].setValue('');

    component.sendData();

    expect(mockLocationService.postLocation).not.toHaveBeenCalled();
    expect(mockNotificationService.success).not.toHaveBeenCalled();
  });

  it('should call getCities when department changes in ngOnInit', () => {
    const spy = jest.spyOn(component, 'getCities');
    fixture.detectChanges();

    component.locationForm.controls['department'].setValue(5);

    expect(spy).toHaveBeenCalledWith(5);
  });

  it('should handle errors from the postLocation service', () => {
    mockLocationService.postLocation.mockReturnValueOnce(
      throwError(() => ({ error: { message: 'Error del backend' } }))
    );

    component.locationForm.controls['barrio'].setValue('Barrio error');
    component.locationForm.controls['department'].setValue(1);
    component.locationForm.controls['city'].setValue(2);

    component.sendData();

    expect(mockNotificationService.error).toHaveBeenCalledWith('Error del backend');
  });

    // it('should display the backend message if it exists', () => {

    // const backendError = {
    //   error: {
    //     message: 'Error del servidor'
    //   }
    // };

    //   mockLocationService.postLocation.mockReturnValueOnce(
    //     throwError(() => backendError)
    //   );

    //   component.locationForm.patchValue(mockLocationFormValid);

    //   component.sendData();

    //   expect(mockNotificationService.error).toHaveBeenCalledWith('Error del servidor');
    // });

    // it('should display the default message if there is no message from the backend', () => {

    // const backendError = {
    //   error: {}
    // };

    //   mockLocationService.postLocation.mockReturnValueOnce(
    //     throwError(() => backendError)
    //   );

    //   component.locationForm.patchValue(mockLocationFormValid);

    //   component.sendData();

    //   expect(mockNotificationService.error).toHaveBeenCalledWith('No se pudo crear la ubicacion..');
    // });

  it('should call cityService.getData and assign pageResponse and totalPages', (done) => {
  const fakeResponse = {
    content: [],
    pageNumber: 0,
    pageSize: 10,
    totalPages: 5,
    totalElements: 20
  };

  mockCityService.getData.mockReturnValue(of(fakeResponse));

  const departId = 1;

  component.getCities(departId);

  component.pageResponse.subscribe((res) => {
    expect(mockCityService.getData).toHaveBeenCalledWith(component.page, component.size, departId);
    expect(component.totalPages).toBe(fakeResponse.totalPages);
    expect(res).toEqual(fakeResponse);
    done();
  });
});


});
