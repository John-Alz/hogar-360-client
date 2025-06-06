import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faCircleXmark, faList } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, map, Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Page } from 'src/app/shared/models/page';
import { Property } from 'src/app/shared/models/property';
import { CategoryService } from 'src/app/shared/services/category.service';
import { PropertyService } from 'src/app/shared/services/property/property.service';

@Component({
  selector: 'app-property-list-home',
  templateUrl: './property-list-home.component.html',
  styleUrls: ['./property-list-home.component.scss']
})
export class PropertyListHomeComponent implements OnInit {

  filtersIcon = faList;
  closeIcon = faCircleXmark;

  isOpenFilters = false;
  loading: boolean = true;

  openFilters(): void {
    this.isOpenFilters = true;
  }

  closeFilters(): void {
    this.isOpenFilters = false;
  }

  pageResponseProperties!: Observable<Page<Property>>;
  pageResponseCategories!: Observable<Page<Category>>;
  private propertyService = inject(PropertyService);
  private categoryService = inject(CategoryService);

  pageNumber = 0;
  pageSize = 6;
  ascendingOrder = true;
  locationFilter = '';
  categoryFilter = '';
  minRooms: number | null = null;
  minBathrooms: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  totalPages = 1;
  pages: number[] = [];


  searchLocation = new FormControl<string>('', {nonNullable: true});
  categoryId = new FormControl('');
  countRooms = new FormControl(0);
  countBaths = new FormControl(0);
  priceMinRange = new FormControl<number | null>(null);
  priceMaxRange = new FormControl<number | null>(null)
  dateDay = new FormControl('');
  startHour= new FormControl('');
  endHour = new FormControl('');


  ngOnInit(): void {
    this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice);
    this.getCategories();
    this.categoryId.valueChanges.subscribe((categoryChange: string | null) => {
      this.pageNumber = 0;
      console.log(categoryChange);
      this.categoryFilter = categoryChange ?? '';
      this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice)
    })
  }

   onPageChanged(newPage: number): void {
    this.pageNumber = newPage;
    this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice);
  }

  getCategories(): void {
    this.pageResponseCategories = this.categoryService.getData(this.pageNumber, this.pageSize).pipe(map((data) => {
      this.totalPages = data.totalPages;
      console.log(data);

      return data;
    }));
  }


  getProperties(order: boolean, category: string, location: string, rooms: number | null, baths: number | null, minPrice: number | null, maxPrice: number | null): void {
    this.pageResponseProperties = this.propertyService.getProperties(
      this.pageNumber,
      this.pageSize,
      order,
      location,
      category,
      this.minRooms !== 0 ? this.minRooms : null,
      this.minBathrooms !== 0 ? this.minBathrooms : null,
      this.minPrice !== 0 ? this.minPrice : null,
      this.maxPrice !== 0 ? this.maxPrice : null
    ).pipe(
      map((data) => {
        this.totalPages = data.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
        console.log(data);
        return data;
      }))
  }


  sendData(): void {
    console.log(this.searchLocation.value);
    const valueLocation: string = this.searchLocation.value;
    this.locationFilter = valueLocation;
    console.log(this.locationFilter);
    this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice)
  }

  sendDataFilters(): void {
    this.minRooms = this.countRooms.value;
    this.minBathrooms = this.countBaths.value;
    this.minPrice = this.priceMinRange.value;
    this.maxPrice = this.priceMaxRange.value;
    this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice)
  }

  // cleanFilters(): void{
  //   this.minRooms = this.countRooms.value;
  //   this.minBathrooms = this.countBaths.value;
  //   this.minPrice = this.priceMinRange.value;
  //   this.maxPrice = this.priceMaxRange.value;
  //   this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice)
  // }

}

