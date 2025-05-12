import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { City } from 'src/app/shared/models/city';
import { CityService } from 'src/app/shared/services/city/city.service';
import { Location } from 'src/app/shared/models/location';
import { LocationService } from 'src/app/shared/services/location/location.service';
import { DepartmentService } from 'src/app/shared/services/department/department.service';
import { Department } from 'src/app/shared/models/department';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  locationForm: FormGroup;

  constructor(private departmentService: DepartmentService, private cityService: CityService, private locationService: LocationService, private formBuilder: FormBuilder, private notifyService: NotificationService){
    this.locationForm = this.formBuilder.group({
      barrio: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
    })
  }

  get locationBarrio(): FormControl {
    return this.locationForm.get('barrio') as FormControl;
  }

  get locationDepartment(): FormControl {
    return this.locationForm.get('department') as FormControl;
  }

  get locationCity(): FormControl {
    return this.locationForm.get('city') as FormControl;
  }

  page = 0;
  size = 10;
  totalPages = 1;
  pageResponse!: Observable<Page<City>>;
  pageResponseDepartment!: Observable<Page<Department>>;

  ngOnInit(): void {
    this.getDepartments();
    this.locationForm.get('department')?.valueChanges.subscribe((departmentId: number) => {
      if(departmentId) {
        this.getCities(departmentId);
      }
    });

  }


  getCities(depart: number): void {
    this.pageResponse = this.cityService.getData(this.page, this.size, depart).pipe(map((data) => {
      this.totalPages = data.totalPages;
      return data;
    }));
  }

  getDepartments(): void {
    this.pageResponseDepartment = this.departmentService.getData(this.page, this.size).pipe(map((data) => {
      this.totalPages = data.totalPages;
      return data;
    }));
  }

  sendData(): void {

    if(!this.locationForm.valid) {
      this.locationForm.markAllAsTouched();
      return;
    }

    const payload: Location = {
      cityId: this.locationForm.value.city,
      barrio: this.locationForm.value.barrio?.trim(),
    }


    this.locationService.postLocation(payload).subscribe({
      next: (response) => {
        this.notifyService.success("Ubicacion creada.")
        this.locationForm.reset();
      },
      error: (e) => {
        const backendMessage = e.error?.message ||"No se pudo crear la categoria.";
        this.notifyService.error(backendMessage)
      }
    });

  }

}
