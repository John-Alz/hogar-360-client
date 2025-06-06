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

  imageUrls: string[] = [
  '../../../../assets/images/img_2.png',
  '../../../../assets/images/img_card.png',
  '../../../../assets/images/imgCard3.png',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

selectedImage: string;

constructor() {
  this.selectedImage = this.getRandomImage();
}

getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
    return this.imageUrls[randomIndex];
  }

}
