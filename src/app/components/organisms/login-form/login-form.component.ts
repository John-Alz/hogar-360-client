import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { REGEX_PATTERN } from 'src/app/shared/constants/constants';
import { Login } from 'src/app/shared/models/login';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

    email = new FormControl('', [Validators.required, Validators.pattern(REGEX_PATTERN.EMAIL)]);
    password = new FormControl('', [Validators.required]);

    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private notifyService: NotificationService, private router: Router) {
      this.loginForm = this.formBuilder.group({
        email: this.email,
        password: this.password
      });
    }

    sendData(): void {
      if(!this.loginForm.valid) {
        this.loginForm.markAllAsTouched;
        return;
      }

      const payload: Login = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      console.log(payload);

      this.authService.login(payload).subscribe({
        next: (res) => {
          console.log(res.token);
          this.router.navigate(['/'])
          localStorage.setItem('token', res.token)
          this.notifyService.success('Bienvenido.',)
          this.loginForm.reset();
        },
        error: (e) => {
        const backendMessage = e.error?.message ||"No se pudo iniciar sesion.";
        this.notifyService.error(backendMessage)
        }
      })
    }


}
