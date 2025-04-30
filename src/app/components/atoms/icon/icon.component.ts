import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() icon: any;
  @Input() class: string = '';
  iconClass: string = '';

  ngOnInit(): void {
    this.iconClass = this.class;
  }
}
