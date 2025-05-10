import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { ToastrService } from 'ngx-toastr';

describe('NotificationService', () => {
  let service: NotificationService;
  let toastrServiceMock: jest.Mocked<ToastrService>;


  beforeEach(() => {
    toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn(),
      clear: jest.fn(),
      remove: jest.fn(),
      show: jest.fn()
    } as unknown as jest.Mocked<ToastrService>;

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería llamar toastr.success al ejecutar success()', () => {
    service.success('mensaje de éxito');
    expect(toastrServiceMock.success).toHaveBeenCalledWith('mensaje de éxito');
  });

  it('debería llamar toastr.error al ejecutar error()', () => {
    service.error('mensaje de error');
    expect(toastrServiceMock.error).toHaveBeenCalledWith('mensaje de error');
  });
});
