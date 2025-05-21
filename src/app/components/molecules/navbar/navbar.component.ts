import { Component, inject } from '@angular/core';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ToggleService } from 'src/app/shared/services/toggle/toggle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  faBars = faBars;
  faXmark= faXmark;
  data$ = this.toggleService.toggleState$;

  constructor(public toggleService: ToggleService) {}

  public authService = inject(AuthService);
    role = this.authService.getUserInfo()?.role;
}
