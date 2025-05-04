import { Component } from '@angular/core';
import { faTag, faHome, faUsers, faGear, faGauge } from '@fortawesome/free-solid-svg-icons'


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
}
