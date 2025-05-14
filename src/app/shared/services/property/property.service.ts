import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

private apiUrl: string = 'http://localhost:8081/api/v1/property';

  constructor(private http: HttpClient) { }

  postProperty(data: Property): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, data);
  }
}
