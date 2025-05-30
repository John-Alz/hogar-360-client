import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core'

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() icon: any;
  @Input() size: SizeProp = 'lg';
  @Input() class: string = '';

}
