import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { City } from '../../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl: string = 'http://localhost:8081/api/v1/city?page=0&size=40';

  constructor(private http: HttpClient) { }


  getData(page: number, size: number): Observable<Page<City>> {
    const params = {
      page: page.toString(),
      size: size.toString()
    }
    return this.http.get<Page<City>>(this.apiUrl, { params });
  }


}
