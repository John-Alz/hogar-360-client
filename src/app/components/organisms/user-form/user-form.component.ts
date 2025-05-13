import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { roles } from './roles';
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/shared/models/user';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  identityNumber = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]);
  phoneNumber = new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]{1,13}$/), Validators.maxLength(13)]);
  birthDate = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]);
  password = new FormControl('', [Validators.required]);
  roleId = new FormControl('', [Validators.required]);

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private notifyService: NotificationService) {
    this.userForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      identityNumber: this.identityNumber,
      phoneNumber: this.phoneNumber,
      birthDate: this.birthDate,
      email: this.email,
      password: this.password,
      roleId: this.roleId,
    });
  }

  dataRoles = roles;

  sendData(): void {

    if(!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }


    const payload: User = {
      firstName: this.userForm.value.firstName?.trim(),
      lastName: this.userForm.value.lastName?.trim(),
      identityNumber: this.userForm.value.identityNumber,
      phoneNumber: this.userForm.value.phoneNumber,
      birthDate: this.userForm.value.birthDate,
      email: this.userForm.value.email?.trim(),
      password: this.userForm.value.password?.trim(),
      roleId: parseInt(this.userForm.value.roleId),
    }

    console.log(payload);


    this.userService.postUser(payload).subscribe({
      next: (response) => {
        this.notifyService.success("Ubicacion creada.")
        this.userForm.reset();
      },
      error: (e) => {
        const backendMessage = e.error?.message ||"No se pudo crear la categoria.";
        this.notifyService.error(backendMessage)
      }
    });

  }


}

