import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faCircleChevronDown, faCircleChevronUp, faFilter } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, map, Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Page } from 'src/app/shared/models/page';
import { Property, PropertyResponse } from 'src/app/shared/models/property';
import { CategoryService } from 'src/app/shared/services/category.service';
import { PropertyService } from 'src/app/shared/services/property/property.service';
import { ToggleService } from 'src/app/shared/services/toggle/toggle.service';

@Component({
  selector: 'app-porperty-list',
  templateUrl: './porperty-list.component.html',
  styleUrls: ['./porperty-list.component.scss']
})
export class PorpertyListComponent implements OnInit {



  filtersIocn = faFilter;

  info: { headers: object[], data: PropertyResponse[] } = {
    headers: [
      {
        key: 'id',
        header: 'ID'
      },
      {
        key: 'name',
        header: 'Nombre'
      },
      // {
      //   key: 'description',
      //   header: 'Descripcion'
      // },
      {
        key: 'category.name',
        header: 'Categoria'
      },
      {
        key: 'direction',
        header: 'Direccion'
      },
      {
        key: 'roomCount',
        header: 'Habitaciones'
      },
      {
        key: 'bathroomCount',
        header: 'Banios'
      },
      {
        key: 'price',
        header: 'Precio'
      },
      {
        key: 'location.ciudad',
        header: 'Ubicacion'
      },
      {
        key: 'status',
        header: 'Status'
      },
    ],
    data: [] as PropertyResponse[]
  }

  private propertyService = inject(PropertyService);
  private categoryService = inject(CategoryService);
  public toggleService = inject(ToggleService);

  pageResponseProperties!: Observable<Page<PropertyResponse>>;
  pageResponseCategories!: Observable<Page<Category>>;

  pageNumber = 0;
  pageSize = 100;
  ascendingOrder = true;
  locationFilter = '';
  categoryFilter = '';
  minRooms: number | null = null;
  minBathrooms: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  totalPages = 1;
  pages: number[] = [];

  searhcValue = new FormControl('');
  searchCategory = new FormControl('');
  priceRange = new FormControl('');

  collapse$ = this.toggleService.toggleState$;

  countRooms = new FormControl(0);
  countBaths = new FormControl(0);
  priceMinRange = new FormControl(null);
  priceMaxRange = new FormControl(null);


  ngOnInit(): void {
    this.getProperties(this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice);
    this.getCategories();
     this.searhcValue.valueChanges
          .pipe(debounceTime(300))
          .subscribe((searchText: string | null) => {
            this.pageNumber = 0;
            this.locationFilter = searchText ?? '';
            this.getProperties(this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms,  this.minPrice, this.maxPrice);
            console.log(searchText);

          })
    this.searchCategory.valueChanges.subscribe((categoryChange: string | null) => {
      this.pageNumber = 0;
      console.log(categoryChange);
      this.categoryFilter = categoryChange ?? '';
      this.getProperties(this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice)
    })

  }

  getCategories(): void {
    this.pageResponseCategories = this.categoryService.getData(this.pageNumber, this.pageSize).pipe(map((data) => {
      this.totalPages = data.totalPages;
      return data;
    }));
  }

  getProperties(category: string, location: string, rooms: number | null, baths: number | null, minPrice: number | null, maxPrice: number | null): void {
    this.pageResponseProperties = this.propertyService.getProperties(
      this.pageNumber,
      this.pageSize,
      this.ascendingOrder,
      location,
      category,
      this.minRooms !== 0 ? this.minRooms : null,
      this.minBathrooms !== 0 ? this.minBathrooms : null,
      this.minPrice !== 0 ? this.minPrice : null,
      this.maxPrice !== 0 ? this.maxPrice : null
    ).pipe(
      map((data) => {
        this.totalPages = data.totalPages;
        this.info.data = data.content
        return data;
      }))
  }

  sendData(): void {
    console.log('rooms: ' + this.countRooms.value);
    console.log('baths: ' + this.countRooms.value);
    console.log('Price Min: ' + this.priceMinRange.value);
    console.log('Price max: ' + this.priceMaxRange.value);
     this.minRooms = this.countRooms.value;
    this.minBathrooms = this.countBaths.value;
    this.minPrice = this.priceMinRange.value;
    this.maxPrice = this.priceMaxRange.value;
    this.getProperties(this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice)

  }

}
