import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../../models/location';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl: string = 'http://localhost:8081/api/v1/location';

  constructor(private http: HttpClient) { }

  postLocation(data: Location): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, data);
  }

  getLocations(page: number, size: number, search: string, orderAsc: boolean) {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('search', search)
      .set('orderAsc', orderAsc)

    return this.http.get<Page<Location>>(this.apiUrl, { params });

  }
}
