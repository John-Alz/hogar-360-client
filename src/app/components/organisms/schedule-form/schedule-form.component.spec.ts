import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFormComponent } from './schedule-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { of, throwError } from 'rxjs';

describe('ScheduleFormComponent', () => {
  let component: ScheduleFormComponent;
  let fixture: ComponentFixture<ScheduleFormComponent>;
  let mockScheduleService: jest.Mocked<ScheduleService>;
  let mockNotificationService: jest.Mocked<NotificationService>;

  const mockValidScheduleForm = {
    startDate: "2025-05-29T10:32",
    endDate: "2025-05-29T20:33",
  }

  const mockInvalidScheduleForm = {
    startDate: "",
    endDate: "",
  }


  beforeEach( async () => {

    mockScheduleService = {
      postData: jest.fn().mockReturnValue(of({}))
    } as unknown as jest.Mocked<ScheduleService>

    mockNotificationService = {
      success: jest.fn(),
      error: jest.fn()
    } as unknown as jest.Mocked<NotificationService>


    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ScheduleFormComponent],
      providers: [
        {provide: NotificationService, useValue: mockNotificationService},
        {provide: ScheduleService, useValue: mockScheduleService}
      ]
    });
    fixture = TestBed.createComponent(ScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call the service if the form is valid', () => {
    component.scheduleForm.patchValue(mockValidScheduleForm)

    component.sendData();

    expect(mockScheduleService.postData).toHaveBeenCalledWith(mockValidScheduleForm);
    expect(mockNotificationService.success).toHaveBeenCalledWith('Horario creado.');
  });

  it('Should not call the service if the form is valid', () => {
    component.scheduleForm.patchValue(mockInvalidScheduleForm)

    component.sendData();

    expect(mockScheduleService.postData).not.toHaveBeenCalled();
    expect(mockNotificationService.success).not.toHaveBeenCalled();
  });

   it('should display the backend message if it exists', () => {

    const backendError = {
      error: {
        message: 'Error del servidor'
      }
    };

      mockScheduleService.postData.mockReturnValueOnce(
        throwError(() => backendError)
      );

      component.scheduleForm.patchValue(mockValidScheduleForm);

      component.sendData();

      expect(mockNotificationService.error).toHaveBeenCalledWith('Error del servidor');
    });

    it('should display the default message if there is no message from the backend', () => {

    const backendError = {
      error: {}
    };

      mockScheduleService.postData.mockReturnValueOnce(
        throwError(() => backendError)
      );

      component.scheduleForm.patchValue(mockValidScheduleForm);

      component.sendData();

      expect(mockNotificationService.error).toHaveBeenCalledWith('No se pudo crear la propiedad.');
    });

});
