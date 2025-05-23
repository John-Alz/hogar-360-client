import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { Property } from 'src/app/shared/models/property';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PropertyService } from 'src/app/shared/services/property/property.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit{

  private propertyService = inject(PropertyService);
  private authService = inject(AuthService);
    pageResponseProperties!: Observable<Page<Property>>;
    propertieByUser!: object[];

  @Input() propertyId!: number | undefined;
  incio = new FormControl('');
  final = new FormControl('');

  ngOnInit(): void {
    // this.getProperties();
  }


  sendData(): void {
    console.log('id propiedad: ' + this.propertyId);
    console.log('incio: ' + this.incio.value);
    console.log('final: ' + this.final.value);

  }


  // getProperties(): void {
  //   this.pageResponseProperties = this.propertyService.getProperties(0, 50, true, '', '', null, null, null, null).pipe(map((data) => {
  //     let userId = this.authService.getUserInfo()?.id;
  //     let newContent = data.content.filter((item) => item.userId == userId)
  //     console.log(data);
  //     console.log(newContent);

  //     this.propertieByUser = newContent;

  //     return data;
  //   }))
  // }

}
