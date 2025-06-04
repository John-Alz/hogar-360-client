import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailComponent } from './property-detail.component';
import { PropertyService } from 'src/app/shared/services/property/property.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { of, scheduled, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { VisitsService } from 'src/app/shared/services/visits/visits.service';

describe('PropertyDetailComponent', () => {
  let component: PropertyDetailComponent;
  let fixture: ComponentFixture<PropertyDetailComponent>;
  let propertyServiceMock: jest.Mocked<PropertyService>;
  let mockScheduleService: jest.Mocked<ScheduleService>;
  let mockNotificationService: jest.Mocked<NotificationService>;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockVisitsService: jest.Mocked<VisitsService>;
  let mockActivatedRoute: any;


  beforeEach(async () => {

    mockScheduleService = {
  getData: jest.fn().mockReturnValue(of({
    content: [], // puede estar vacío o con datos
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    pageSize: 10
  }))
} as unknown as jest.Mocked<ScheduleService>;


    propertyServiceMock = {
  getProperty: jest.fn().mockReturnValue(of({ id: 123, name: 'Propiedad Test' }))
} as unknown as jest.Mocked<PropertyService>;

    mockNotificationService = {
      success: jest.fn(),
      error: jest.fn()
    } as unknown as jest.Mocked<NotificationService>

    mockAuthService = {
      isLoggedIn: jest.fn()
    } as unknown as jest.Mocked<AuthService>

    mockVisitsService = {
      postData: jest.fn()
    } as unknown as jest.Mocked<VisitsService>

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('123')
        }
      }
    };


    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PropertyDetailComponent],
      providers: [
        { provide: PropertyService, useValue: propertyServiceMock },
        { provide: ScheduleService, useValue: mockScheduleService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    });

    TestBed.overrideProvider(VisitsService, { useValue: mockVisitsService });
    TestBed.overrideProvider(AuthService, { useValue: mockAuthService });
    TestBed.overrideProvider(NotificationService, { useValue: mockNotificationService });

    fixture = TestBed.createComponent(PropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a postData y mostrar éxito si el usuario está logueado', () => {
  mockAuthService.isLoggedIn.mockReturnValue(true);

  const mockValidVisitForm = { scheduleId: 123 };
  component.visitForm.patchValue(mockValidVisitForm);

  mockVisitsService.postData.mockReturnValue(of({ scheduleId: 1 }));

  component.sendData();

  expect(mockVisitsService.postData).toHaveBeenCalledWith(mockValidVisitForm);
  expect(mockNotificationService.success).toHaveBeenCalledWith('Visita agendada.');
});


  //  it('debería llamar a postData y mostrar éxito si el usuario está logueado', () => {
  //   mockAuthService.isLoggedIn.mockReturnValue(true);

  //   component.visitForm.setValue({ scheduleId: 123 });
  //   component.sendData();

  //   expect(mockVisitsService.postData).toHaveBeenCalledWith({ scheduleId: 123 });
  //   expect(mockNotificationService.success).toHaveBeenCalledWith('Visita agendada.');
  // });

  it('debería manejar errores del backend y mostrar el mensaje', () => {
    mockAuthService.isLoggedIn.mockReturnValue(true);
    const backendError = { error: { message: 'Error al crear la visita' } };
    mockVisitsService.postData.mockReturnValue(throwError(() => backendError));

    component.visitForm.setValue({ scheduleId: 123 });
    component.sendData();

    expect(mockNotificationService.error).toHaveBeenCalledWith('Error al crear la visita');
  });

  it('debería mostrar mensaje genérico si no hay mensaje del backend', () => {
    mockAuthService.isLoggedIn.mockReturnValue(true);
    const genericError = { error: {} };
    mockVisitsService.postData.mockReturnValue(throwError(() => genericError));

    component.visitForm.setValue({ scheduleId: 123 });
    component.sendData();

    expect(mockNotificationService.error).toHaveBeenCalledWith('No se pudo crear la categoria.');
  });

  it('debería obtener el ID de la ruta, llamar a getProperty y asignar propertyData', () => {
    component.ngOnInit();

    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(propertyServiceMock.getProperty).toHaveBeenCalledWith('123');
    expect(component.propertyData).toEqual({ id: 123, name: 'Propiedad Test' });

    expect(mockScheduleService.getData).toHaveBeenCalledWith(
      component.page,
      component.size,
      component.orderAsc,
      component.location,
      component.startDate,
      component.endDate,
      component.propertyIdFilter
    );
  });


});
