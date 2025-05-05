import { Component } from '@angular/core';
import { faTag, faHome, faUsers, faGear, faGauge, faT } from '@fortawesome/free-solid-svg-icons'


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

  collapse = false;

  toggleCollapse(): void {
    this.collapse = !this.collapse;
  }

  links = [
    {
      id: 1,
      icon: faGauge,
      label: 'Dashboard',
      link: '/dashboard'
    },
    {
      id: 2,
      icon: faTag,
      label: 'Categorías',
      link: '/categories'
    },
    {
      id: 3,
      icon: faHome,
      label: 'Propiedades',
      link: '/properties'
    },
    {
      id: 4,
      icon: faUsers,
      label: 'Usuarios',
      link: '/users'
    },
    {
      id: 5,
      icon: faGear,
      label: 'Configuración',
      link: '/configuration'
    },
  ]

}
