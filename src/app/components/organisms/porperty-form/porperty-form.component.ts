import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Location } from 'src/app/shared/models/location';
import { Page } from 'src/app/shared/models/page';
import { Property } from 'src/app/shared/models/property';
import { CategoryService } from 'src/app/shared/services/category.service';
import { LocationService } from 'src/app/shared/services/location/location.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { PropertyService } from 'src/app/shared/services/property/property.service';

@Component({
  selector: 'app-porperty-form',
  templateUrl: './porperty-form.component.html',
  styleUrls: ['./porperty-form.component.scss']
})
export class PorpertyFormComponent implements OnInit {

  pageResponseCategories!: Observable<Page<Category>>;
  pageResponseLocation!: Observable<Page<Location>>;


  page = 0;
  size = 50;
  search = '';
  orderAsc = true;
  totalPages = 1;
  pages: number[] = [];

  name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  description = new FormControl('', [Validators.required, Validators.maxLength(90)]);
  direction = new FormControl('', [Validators.required]);
  categoryId = new FormControl('', [Validators.required]);
  roomCount = new FormControl('', [Validators.required]);
  bathroomCount = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  locationId = new FormControl('', [Validators.required]);
  activePublicationDate = new FormControl('', [Validators.required]);

  propertyForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private propertyService: PropertyService, private categoryService: CategoryService, private locationService: LocationService, private notifyService: NotificationService) {
    this.propertyForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      direction: this.direction,
      categoryId: this.categoryId,
      roomCount: this.roomCount,
      bathroomCount: this.bathroomCount,
      price: this.price,
      locationId: this.locationId,
      activePublicationDate: this.activePublicationDate,
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getLocations();
  }

  getLocations(): void {
    this.pageResponseLocation = this.locationService.getLocations(this.page, this.size, this.search, this.orderAsc).pipe(map((data) => {
      this.totalPages = data.totalPages;
      return data;
    }));
  }

  getCategories(): void {
    this.pageResponseCategories = this.categoryService.getData(this.page, this.size).pipe(map((data) => {
      this.totalPages = data.totalPages;
      return data;
    }));
  }

  sendData(): void {

    if (!this.propertyForm.valid) {
      this.propertyForm.markAllAsTouched();
      return;
    }

    const payload: Property = {
      name: this.propertyForm.value.name,
      description: this.propertyForm.value.description,
      direction: this.propertyForm.value.direction,
      categoryId: this.propertyForm.value.categoryId,
      roomCount: this.propertyForm.value.roomCount,
      bathroomCount: this.propertyForm.value.bathroomCount,
      price: this.propertyForm.value.price,
      locationId: this.propertyForm.value.locationId,
      activePublicationDate: this.propertyForm.value.activePublicationDate,
    }

    console.log(payload);

    this.propertyService.postProperty(payload).subscribe({
      next: (response) => {
        this.notifyService.success("Propiedad creada.")
        this.propertyForm.reset();
      },
      error: (e) => {
        const backendMessage = e.error?.message || "No se pudo crear la propiedad.";
        this.notifyService.error(backendMessage);
      }
    });


  }


}
