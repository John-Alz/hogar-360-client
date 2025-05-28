import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { Property } from 'src/app/shared/models/property';
import { Schedule } from 'src/app/shared/models/schedule';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { PropertyService } from 'src/app/shared/services/property/property.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent {

  private propertyService = inject(PropertyService);
  private scheduleService = inject(ScheduleService);
  private authService = inject(AuthService);
  private notifyService = inject(NotificationService);
    pageResponseProperties!: Observable<Page<Property>>;
    propertieByUser!: object[];

  @Input() propertyId!: number | undefined;
  userId = this.authService.getUserInfo()?.id;
  start = new FormControl('');
  end = new FormControl('');


  sendData(): void {


    const payload: Schedule = {
      propertyId: this.propertyId,
      startDate: this.start.value,
      endDate: this.end.value,
    }

    console.log(payload);

    this.scheduleService.postData(payload).subscribe({
      next: (response) => {
        console.log(response);

        this.notifyService.success("Propiedad creada.")
      },
      error: (e) => {
        const backendMessage = e.error?.message || "No se pudo crear la propiedad.";
        this.notifyService.error(backendMessage);
      }
    });


  }


}
