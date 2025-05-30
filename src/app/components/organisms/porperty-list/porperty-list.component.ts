import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faCalendar, faCircleChevronDown, faCircleChevronUp, faCircleXmark, faFilter, faTrash } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, map, Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Page } from 'src/app/shared/models/page';
import { Property, PropertyResponse } from 'src/app/shared/models/property';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
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
  calendarIcon = faCalendar;
  trashIcon = faTrash;
  closeIcon = faCircleXmark;

  info: { headers: object[], data: Property[], isProperty: boolean } = {
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
        header: 'Baños'
      },
      {
        key: 'price',
        header: 'Precio',
        isCurrency: true
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
    data: [] as Property[],
    isProperty: true
  }

  private propertyService = inject(PropertyService);
  private categoryService = inject(CategoryService);
  private authService = inject(AuthService);
  public toggleService = inject(ToggleService);

  pageResponseProperties!: Observable<Page<Property>>;
  pageResponseCategories!: Observable<Page<Category>>;
  userIdToken = this.authService.getUserInfo()?.id;

  pageNumber = 0;
  pageSize = 5;
  ascendingOrder = true;
  locationFilter = '';
  categoryFilter = '';
  userId = this.userIdToken;
  minRooms: number | null = null;
  minBathrooms: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  totalPages = 1;
  pages: number[] = [];

  searchValue = new FormControl<string | null>('');
  searchCategory = new FormControl('');
  priceRange = new FormControl('');
  orderChange = new FormControl(true);
  countRooms = new FormControl(0);
  countBaths = new FormControl(0);
  priceMinRange = new FormControl<number | null>(null);
  priceMaxRange = new FormControl<number | null>(null)

  collapse$ = this.toggleService.toggleState$;

  propertyId!: number;

  onGreetTwo(id: number): void {
    // this.isOpenModal = message;
    this.propertyId = id;
    // console.log(this.isOpenModal);
    console.log(this.propertyId);
  }

  //

  @Input() title: string = 'Modal Title';
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  onGreet(message: boolean): void {
    this.isOpen = message;
    console.log(this.isOpen);
  }

  handleCloseModal(): void {
    this.isOpen = false;
  }


  //



  ngOnInit(): void {
    this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice);
    this.getCategories();
    this.searchValue.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchText: string | null) => {
        this.pageNumber = 0;
        this.locationFilter = searchText ?? '';
        this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice);
      })
    this.searchCategory.valueChanges.subscribe((categoryChange: string | null) => {
      this.pageNumber = 0;
      console.log(categoryChange);
      this.categoryFilter = categoryChange ?? '';
      this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice)
    })
    this.orderChange.valueChanges.subscribe((orderChangesSelect: boolean | null) => {
      this.pageNumber = 0;
      this.ascendingOrder = orderChangesSelect ?? true;
      this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice);
    })

  }

  onPageChanged(newPage: number): void {
    this.pageNumber = newPage;
    this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice);
  }

  getCategories(): void {
    this.pageResponseCategories = this.categoryService.getData(this.pageNumber, this.pageSize).pipe(map((data) => {
      this.totalPages = data.totalPages;
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
      this.maxPrice !== 0 ? this.maxPrice : null,
      this.userId,
    ).pipe(
      map((data) => {
        this.totalPages = data.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
        this.info.data = data.content;
        return data;
      }))
  }

  sendData(): void {
    this.minRooms = this.countRooms.value;
    this.minBathrooms = this.countBaths.value;
    this.minPrice = this.priceMinRange.value;
    this.maxPrice = this.priceMaxRange.value;
    this.getProperties(this.ascendingOrder, this.categoryFilter, this.locationFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice)

  }

}
