import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let mockAuthService: jest.Mocked<AuthService>;
  let mockNotificationService: jest.Mocked<NotificationService>;

  const mockLoginForm = {
    email: 'andrea@gmail.com',
    password: '1234'
  };

  const mockLoginFormEmpty = {
    email: '',
    password: ''
  };

  beforeEach(async () => {

    mockAuthService = {
      login: jest.fn().mockReturnValue(of({}))
    } as unknown as jest.Mocked<AuthService>;

    mockNotificationService = {
      success: jest.fn(),
      error: jest.fn()
    } as unknown as jest.Mocked<NotificationService>;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call the service if the form is valid', () => {
    component.loginForm.patchValue(mockLoginForm);

    component.sendData();

    expect(mockAuthService.login).toHaveBeenCalledWith(mockLoginForm);
    expect(mockNotificationService.success).toHaveBeenCalledWith('Bienvenido.');
  });

  it('Should call the service if the form is valid', () => {
    component.loginForm.patchValue(mockLoginFormEmpty);

    component.sendData();

    expect(mockAuthService.login).not.toHaveBeenCalled();
    expect(mockNotificationService.success).not.toHaveBeenCalled();
  });

  it('Should handle errors from the login service', () => {
      mockAuthService.login.mockReturnValueOnce(
        throwError(() => ({ error: { message: 'Error del backend' } }))
      );

      component.loginForm.patchValue(mockLoginForm);

      component.sendData();

      expect(mockNotificationService.error).toHaveBeenCalledWith('Error del backend');
    });

});
