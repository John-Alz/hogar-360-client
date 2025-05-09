import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Location } from 'src/app/shared/models/location';
import { Page } from 'src/app/shared/models/page';
import { LocationService } from 'src/app/shared/services/location/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  info: {headers: string[], data: Location[]} = {
      headers: ["ID", "Ciudad", "Barrio"],
      data: []
    }

  private locationService = inject(LocationService)

  pageResponseLocations!: Observable<Page<Location>>;

  page = 0;
  size = 2;
  searchBy = 'city';
  search = 'bogota';
  orderAsc = true;
  totalPages = 1;
  pages: number[] = [];

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.pageResponseLocations = this.locationService.getLocations(this.page, this.size, this.searchBy, this.search, this.orderAsc).pipe(map((data) => {
      this.totalPages = data.totalPages;
      this.info.data = data.content;
      console.log(data);

      return data;
    }))
  }


}
