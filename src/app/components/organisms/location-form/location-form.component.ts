import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { cities } from './cities-data';
import { map, Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { City } from 'src/app/shared/models/city';
import { CityService } from 'src/app/shared/services/city/city.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  barrio = new FormControl('')
  ciudad = new FormControl('')

  data = cities;

  page = 0;
  size = 2;
  totalPages = 1;
  pageResponse!: Observable<Page<City>>;

  private cityService = inject(CityService)

  ngOnInit(): void {
    this.getCities();
  }


  getCities(): void {
    this.pageResponse = this.cityService.getData(this.page, this.size).pipe(map((data) => {
      this.totalPages = data.totalPages;
      return data;
    }));
  }

}
