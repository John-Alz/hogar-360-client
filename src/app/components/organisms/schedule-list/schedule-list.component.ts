import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, map, Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { Schedule } from 'src/app/shared/models/schedule';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  loading: boolean = true;

  info: { headers: object[], data: Schedule[] } = {
    headers: [
      {
        key: 'scheduleId',
        header: 'ID'
      },
      {
        key: 'propertyId',
        header: 'Propiedad'
      },
      {
        key: 'startDate',
        header: 'Fecha de incio'
      },
      {
        key: 'endDate',
        header: 'Fecha de fin'
      },
    ],
    data: [] as Schedule[]
  }

  pageResponse!: Observable<Page<Schedule>>;

  private authService = inject(AuthService)

  vendorIdAuth = this.authService.getUserInfo()?.id;

  page = 0;
  size = 5;
  orderAsc = true;
  location = '';
  startDate = '';
  endDate = '';
  propertyId = '';
  vendorId = this.vendorIdAuth;
  totalPages = 1;
  pages: number[] = [];

  isOpen = false;

  private scheduleService = inject(ScheduleService);

  filtersIocn = faFilter;

  searchValue = new FormControl('');
  orderChange = new FormControl(true);
  dateComplete = new FormControl('');
  date = new FormControl('', [Validators.required]);
  startHour = new FormControl('', [Validators.required]);
  endHour = new FormControl('', [Validators.required]);

  dateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
     this.dateForm = this.formBuilder.group({
        date: this.date,
        startHour: this.startHour,
        endHour: this.endHour,
      });
  }

  onPageChanged(newPage: number): void {
    this.page = newPage;
    this.getSchedules(this.orderAsc, this.location, this.startDate, this.endDate, this.propertyId);
  }

  onChangeOpen(): void {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {
    this.getSchedules(this.orderAsc, this.location, this.startDate, this.endDate, this.propertyId);
    console.log(this.propertyId);
    this.searchValue.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchText: string | null) => {
        this.page = 0;
        this.location = searchText ?? '';
        this.getSchedules(this.orderAsc, this.location, this.startDate, this.endDate, this.propertyId);
      })
    this.orderChange.valueChanges.subscribe((orderSelected: boolean | null) => {
      console.log(orderSelected);
      this.page = 0;
      this.orderAsc = orderSelected ?? true;
      this.getSchedules(this.orderAsc, this.location, this.startDate, this.endDate, this.propertyId);
    })
  }

  getSchedules(order: boolean, location: string, startDate: string, endDate: string, propertyId: string): void {
    console.log(propertyId);

    this.pageResponse = this.scheduleService.getData(this.page, this.size, order, location, startDate, endDate, propertyId, this.vendorId).pipe(map((data) => {
      console.log(data);
      this.totalPages = data.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      this.info.data = data.content;
      return data
    }))
  }

  sendData(): void {

    const startDateFormat = this.date.value + 'T' + this.startHour.value;
    const endDateFormat = this.date.value + 'T' + this.endHour.value;
    console.log(startDateFormat);
    console.log(endDateFormat);
    this.startDate = startDateFormat;
    this.endDate = endDateFormat;
    this.getSchedules(this.orderAsc, this.location, this.startDate, this.endDate, this.propertyId)
  }

}
