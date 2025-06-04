import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, map, Observable } from 'rxjs';
import { Location } from 'src/app/shared/models/location';
import { Page } from 'src/app/shared/models/page';
import { LocationService } from 'src/app/shared/services/location/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  searchIcon = faSearch;

  info: { headers: object[], data: Location[] } = {
    headers: [
      {
        key: 'id',
        header: 'ID'
      },
      {
        key: 'ciudad',
        header: 'Ciudad'
      },
      {
        key: 'barrio',
        header: 'Barrio'
      },
    ],
    data: [] as Location[]
  }

  private locationService = inject(LocationService)

  pageResponseLocations!: Observable<Page<Location>>;

  page = 0;
  size = 10;
  search = '';
  orderAsc = true;
  totalPages = 1;
  pages: number[] = [];

  searchValue = new FormControl('');
  order = new FormControl('true');

  loading: boolean = true;

  ngOnInit(): void {
    this.getLocations(this.search, this.orderAsc);
    this.searchValue.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchText: string | null) => {
        this.page = 0;
        this.search = searchText ?? '';
        this.getLocations(this.search, this.orderAsc);
      })
    this.order.valueChanges.subscribe((orderChange: string | null) => {
      this.page = 0;
      this.orderAsc = (orderChange === 'true');
      this.getLocations(this.search, this.orderAsc);
    })
  }

  onPageChanged(newPage: number): void {
    this.page = newPage;
    this.getLocations(this.search, this.orderAsc);
  }

  getLocations(searchText: string, orderPara: boolean): void {
    this.pageResponseLocations = this.locationService.getLocations(this.page, this.size, searchText, orderPara).pipe(map((data) => {
      this.totalPages = data.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      this.info.data = data.content;
      console.log(data);
      return data;
    }))
  }


}
