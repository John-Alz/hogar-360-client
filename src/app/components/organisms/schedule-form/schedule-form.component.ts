import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  scheduleForm: FormGroup<{
    startDate: FormControl<string>;
    endDate: FormControl<string>;
  }>;


  constructor(private scheduleService: ScheduleService, private authService: AuthService, private notifyService: NotificationService, private formBuilder: FormBuilder) {
    this.scheduleForm = formBuilder.group({
      startDate: this.formBuilder.control('', { nonNullable: true, validators: [Validators.required] }),
      endDate: this.formBuilder.control('', { nonNullable: true, validators: [Validators.required] }),
    })
  }

  pageResponseProperties!: Observable<Page<Property>>;
  propertieByUser!: object[];

  @Input() propertyId!: number | undefined;
  userId = this.authService.getUserInfo()?.id;

  sendData(): void {

    if (!this.scheduleForm.valid) {
      this.scheduleForm.markAllAsTouched();
      return;
    }

    const { startDate, endDate } = this.scheduleForm.value;

    const payload: Schedule = {
      propertyId: this.propertyId,
      startDate: startDate,
      endDate: endDate,
    }

    console.log(payload);

    this.scheduleService.postData(payload).subscribe({
      next: (response) => {
        console.log(response);
        this.notifyService.success("Horario creado.")
        this.scheduleForm.reset()
      },
      error: (e) => {
        const backendMessage = e.error?.message || "No se pudo crear la propiedad.";
        this.notifyService.error(backendMessage);
      }
    });


  }


}
