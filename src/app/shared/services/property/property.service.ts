import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property, PropertyResponse } from '../../models/property';
import { Page } from '../../models/page';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

private apiUrl: string = 'http://localhost:8081/api/v1/property';

  constructor(private http: HttpClient) { }

  postProperty(data: Property): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, data);
  }

  getProperties(pageNumber: number, pageSize: number, ascendingOrder: boolean, locationFilter: string, categoryFilter: string, minRooms: number, minBathrooms: number, minPrice: number, maxPrice: number) {
      const params = new HttpParams()
        .set('pageNumber', pageNumber)
        .set('pageSize', pageSize)
        .set('ascendingOrder', ascendingOrder)
        .set('locationFilter', locationFilter)
        .set('categoryFilter', categoryFilter)
        .set('minRooms', minRooms)
        .set('minBathrooms', minBathrooms)
        .set('minPrice', minPrice)
        .set('maxPrice', maxPrice)


      return this.http.get<Page<PropertyResponse>>(this.apiUrl, { params });

    }
}
