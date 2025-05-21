import { Component } from '@angular/core';
import { faTag, faHome, faUsers, faGear, faGauge, faT } from '@fortawesome/free-solid-svg-icons'
import { ToggleService } from 'src/app/shared/services/toggle/toggle.service';
import { navData } from './nav-data'
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  faTag = faTag;
  faHome = faHome;
  faUsers = faUsers;
  faGear = faGear;
  faGauge = faGauge;

  data = navData

  collapse$ = this.toggleService.toggleState$;

  role: any;

  constructor(public toggleService: ToggleService, private authService: AuthService){
    this.role = authService.getUserInfo()?.role;
  }


}
