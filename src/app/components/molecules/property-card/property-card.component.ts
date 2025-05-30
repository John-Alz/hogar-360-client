import { Component, Input, OnInit } from '@angular/core';
import { faBath, faBed } from '@fortawesome/free-solid-svg-icons';
import { Property, PropertyResponse } from 'src/app/shared/models/property';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent {

  bedIcon = faBed;
  bathIcon = faBath;

  @Input()
  property!: any;

}
