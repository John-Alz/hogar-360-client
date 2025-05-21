import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

export function authGuard(expectRole: string | null): CanActivateFn {

return () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getUserInfo()?.role;
  const isLogged = authService.isLoggedIn();


  if (isLogged === false) {
    return true;
  }

  if (role === expectRole) {
    return true;
  }

  router.navigate(['/404'])

  return false;
}


};
