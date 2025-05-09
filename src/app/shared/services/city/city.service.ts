import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { City } from '../../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl: string = 'http://localhost:8081/api/v1/city';

  constructor(private http: HttpClient) { }


  getData(page: number, size: number, departmentId: number): Observable<Page<City>> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('departmentId', departmentId)
    return this.http.get<Page<City>>(this.apiUrl, { params });
  }


}
