import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { Property, PropertyResponse } from 'src/app/shared/models/property';
import { PropertyService } from 'src/app/shared/services/property/property.service';

@Component({
  selector: 'app-porperty-list',
  templateUrl: './porperty-list.component.html',
  styleUrls: ['./porperty-list.component.scss']
})
export class PorpertyListComponent implements OnInit {
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
      {
        key: 'description',
        header: 'Descripcion'
      },
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

  pageResponseProperties!: Observable<Page<PropertyResponse>>;

    pageNumber = 0;
    pageSize = 10;
    ascendingOrder = true;
    locationFilter = '';
    categoryFilter = '';
    minRooms = 2;
    minBathrooms = 2;
    minPrice = 300000000;
    maxPrice = 500000000;
    totalPages = 1;
    pages: number[] = [];


    ngOnInit(): void {
      this.getProperties();
    }


    getProperties(): void {
      this.pageResponseProperties = this.propertyService.getProperties(this.pageNumber, this.pageSize, this.ascendingOrder, this.locationFilter, this.categoryFilter, this.minRooms, this.minBathrooms, this.minPrice, this.maxPrice).pipe(map((data) => {
        this.totalPages = data.totalPages;
        this.info.data = data.content
        let array = data.content
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          console.log(element)
        }

        return data;
      }))
    }

}
