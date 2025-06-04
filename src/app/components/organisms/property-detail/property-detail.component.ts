import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faBath, faBed, faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { map, Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { Property } from 'src/app/shared/models/property';
import { Schedule } from 'src/app/shared/models/schedule';
import { Visit } from 'src/app/shared/models/visit';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { PropertyService } from 'src/app/shared/services/property/property.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { VisitsService } from 'src/app/shared/services/visits/visits.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  bedIcon = faBed;
  bathIcon = faBath;
  locationIcon = faLocationDot;
  loading: boolean = true;

  scheduleSelectedId = new FormControl('')

  propertyData!: any;

  page = 0;
  size = 5;
  orderAsc = true;
  location = '';
  startDate = '';
  endDate = '';
  totalPages = 1;
  pages: number[] = [];

  pageResponse!: Observable<Page<Schedule>>;

  visitForm: FormGroup<{
    scheduleId: FormControl<number>;
  }>;

  constructor(private activeRoute: ActivatedRoute, private propertyService: PropertyService, private scheduleService: ScheduleService, private visitService: VisitsService, private formBuilder: FormBuilder, private notifyService: NotificationService, private authService: AuthService) {
    this.visitForm = formBuilder.group({
      scheduleId: this.formBuilder.control(0, { nonNullable: true }),
    })
  }

  ngOnInit(): void {
    this.getSchedules(this.orderAsc, this.location, this.startDate, this.endDate)
    let propertyId = this.activeRoute.snapshot.paramMap.get("id");
    console.log(propertyId);
    propertyId && this.propertyService.getProperty(propertyId).subscribe((data) => {
      console.log(data);
      this.propertyData = data;
      console.log(this.propertyData);
    })
  }

  getSchedules(order: boolean, location: string, startDate: string, endDate: string): void {
    this.pageResponse = this.scheduleService.getData(this.page, this.size, order, location, startDate, endDate).pipe(map((data) => {
      console.log(data);
      this.totalPages = data.totalPages;
      return data
    }))
  }

  sendData(): void {

    if (!this.authService.isLoggedIn()) {
      this.notifyService.error('Debes estar logueado para poder agendar la visita');
    }

    const payload: Visit = {
      scheduleId: this.visitForm.value.scheduleId
    }

    console.log(payload);


    this.visitService.postData(payload).subscribe({
      next: (response) => {
        console.log(response);
        this.notifyService.success('Visita agendada.');
        this.visitForm.reset();
      },
      error: (e) => {
        console.log(e.error);
        const backendMessage = e.error?.message || "No se pudo crear la categoria.";
        this.notifyService.error(backendMessage)
      }
    })

  }

}
