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

  getProperty(propertyId: string) {
    return this.http.get<Property>(`http://localhost:8081/api/v1/property/${propertyId}`)
  }

  getProperties(
  pageNumber: number,
  pageSize: number,
  ascendingOrder: boolean,
  locationFilter: string,
  categoryFilter: string | null,
  minRooms: number | null,
  minBathrooms: number | null,
  minPrice: number | null,
  maxPrice: number | null,
  userId?: number | undefined
): Observable<Page<Property>> {
  let params = new HttpParams()
    .set('pageNumber', pageNumber)
    .set('pageSize', pageSize)
    .set('ascendingOrder', ascendingOrder)
    .set('locationFilter', locationFilter)

     if(userId !== undefined) {
      params = params.set('userId', userId)
    }

    if(categoryFilter !== null) {
      params = params.set('categoryFilter', categoryFilter)
    }

  if (minRooms !== null) {
    params = params.set('minRooms', minRooms);
  }
  if (minBathrooms !== null) {
    params = params.set('minBathrooms', minBathrooms);
  }
  if (minPrice !== null) {
    params = params.set('minPrice', minPrice);
  }
  if (maxPrice !== null) {
    params = params.set('maxPrice', maxPrice);
  }

  return this.http.get<Page<Property>>(this.apiUrl, { params });
}

}
