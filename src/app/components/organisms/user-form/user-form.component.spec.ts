import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/shared/services/user/user.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let mockUserService: any;
  let mockNotificationService: any;

  beforeEach(async () => {

    mockUserService = {
      postUser: jest.fn().mockReturnValue(of({}))
    };

    mockNotificationService = {
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserFormComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar al servicio si el formulario es válido', () => {
    component.userForm.controls['firstName'].setValue('John');
    component.userForm.controls['lastName'].setValue('Angel');
    component.userForm.controls['identityNumber'].setValue(22664344);
    component.userForm.controls['phoneNumber'].setValue(12236234);
    component.userForm.controls['birthDate'].setValue('2000-07-25');
    component.userForm.controls['email'].setValue('john@gmail.com');
    component.userForm.controls['password'].setValue('password');
    component.userForm.controls['roleId'].setValue(13);

    component.sendData();

    expect(mockUserService.postUser).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Angel',
      identityNumber: 22664344,
      phoneNumber: 12236234,
      birthDate: '2000-07-25',
      email: 'john@gmail.com',
      password: 'password',
      roleId: 13
    });
    expect(mockNotificationService.success).toHaveBeenCalledWith('Ubicacion creada.');
  });


  it('No debería llamar al servicio si el formulario es invalido', () => {
    component.userForm.controls['firstName'].setValue('');
    component.userForm.controls['lastName'].setValue('');
    component.userForm.controls['identityNumber'].setValue('');
    component.userForm.controls['phoneNumber'].setValue('');
    component.userForm.controls['birthDate'].setValue('');
    component.userForm.controls['email'].setValue('');
    component.userForm.controls['password'].setValue('');
    component.userForm.controls['roleId'].setValue('');

    component.sendData();

    expect(mockUserService.postUser).not.toHaveBeenCalled()
    expect(mockNotificationService.success).not.toHaveBeenCalled();
  });

  it('debería manejar errores del servicio postLocation', () => {
    mockUserService.postUser.mockReturnValueOnce(
      throwError(() => ({ error: { message: 'Error del backend' } }))
    );

    component.userForm.controls['firstName'].setValue('John');
    component.userForm.controls['lastName'].setValue('Angel');
    component.userForm.controls['identityNumber'].setValue(22664344);
    component.userForm.controls['phoneNumber'].setValue(12236234);
    component.userForm.controls['birthDate'].setValue('2000-07-25');
    component.userForm.controls['email'].setValue('john@gmail.com');
    component.userForm.controls['password'].setValue('password');
    component.userForm.controls['roleId'].setValue(13);

    component.sendData();

    expect(mockNotificationService.error).toHaveBeenCalledWith('Error del backend');
  });


});
