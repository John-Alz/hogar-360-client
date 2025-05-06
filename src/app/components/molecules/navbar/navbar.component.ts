import { Component } from '@angular/core';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
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

}
